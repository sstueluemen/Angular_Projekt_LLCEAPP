import { Component } from '@angular/core';
import { FiQuery } from '../interfaces/fi-query';
import { Statistics } from '../interfaces/statistics';
import { Qlpic101Service } from '../services/qlpic101.service';
import { StatsService } from '../services/stats.service';

@Component({
  selector: 'llceae-check-fi',
  templateUrl: './check-fi.component.html',
  styleUrls: ['./check-fi.component.css']
})
export class CheckFiComponent {
  ql101fiall: FiQuery[] = []

  showanswers = false
  queryNrAnswersShow = -1

  query: FiQuery;
  currentQnr = -1

  statistic: Statistics;
  correctInput: boolean = false;
  gotolearnmode: boolean
  learnwrong: number
  maxlearnwrong = 3

  constructor(
    private ql101Fi: Qlpic101Service,
    private stats: StatsService
  ) {
    this.ql101fiall = this.ql101Fi.getallFi()
    this.ql101Fi.initGivenAnswers()

    this.currentQnr = 0
    this.query = this.ql101fiall[this.currentQnr]

    this.statistic = this.stats.resetStatsFi()
    this.gotolearnmode = false
    this.learnwrong = 0
  }


  keyinput(myinput: string) {
    this.correctInput = false
    this.query.qgiventxt = myinput
    // check if correct
    if (this.query.qanswers.find(
      a => a.txt.find(t => t === this.query.qgiventxt))) {
      this.correctInput = true
    }
    console.log(this.correctInput, this.query.qgiventxt)
    this.refreshStats()
  }

  resetStats() {
    this.statistic = this.stats.resetStatsFi()
    this.firstQuery()
    this.learnwrong = 0
  }

  resetAnswers() {
    // reset 'givenanswer's of all questions
    this.ql101fiall.map(q => q.qanswers.map(a => a.givenans = false))
    this.ql101fiall.map(q => q.qgiventxt = '')
    this.resetStats()
    this.firstQuery()
  }

  refreshStats() {
    this.statistic = this.stats.calcStatsFi()
  }

  firstQuery() {
    this.currentQnr = 0
    this.query = this.ql101fiall[this.currentQnr]
    this.showanswers = false
    this.refreshStats()
  }

  prevQuery() {
    if (0 < this.currentQnr) {
      this.currentQnr--
      this.query = this.ql101fiall[this.currentQnr]
    }
    this.showanswers = false
    this.refreshStats()
  }

  nextQuery() {
    // ---------------------------------------------
    // check if current question answered and correct -> next
    //   else update learnwrong counter
    // answered?
    if (this.checkQueryFiAnswered()) {
      this.gotolearnmode = false
      if (!this.checkQueryFiAnsweredCorrect()) {
        // answered and false -> PopUp and prev question
        // learnwrong + 1 (max 7)
        this.learnwrong++
        // reset answers of current query
        this.query.qgiventxt = ''
        // back one query or to first query
        this.prevQuery()
        this.refreshStats()
        console.log('Learn wrong: ', this.learnwrong)
        if (this.learnwrong >= this.maxlearnwrong) {
          // 7 wrong, this is bad :( - popup and go to learn mode
          this.gotolearnmode = true
        }
      } else { // answered and true
        // to next question
        this.setNextQuestion()
        // }
      }
    } else {
      // not answered -> next question
      this.setNextQuestion()
    }
    // console.log('curr q: ', this.currentQnr)
  }

  setNextQuestion() {
    if (this.currentQnr < this.ql101fiall.length - 1) {
      this.currentQnr++
      this.query = this.ql101fiall[this.currentQnr]
      console.log(this.currentQnr, this.query)
    }
    this.showanswers = false
    this.refreshStats()
  }

  lastQuery() {
    this.currentQnr = this.ql101fiall.length - 1
    this.query = this.ql101fiall[this.currentQnr]
    this.showanswers = false
    this.refreshStats()
  }

  toggleAnswers(qid: number): void {
    if (this.queryNrAnswersShow != qid) {
      this.queryNrAnswersShow = qid;
      this.showanswers = true
    } else {
      this.showanswers = !this.showanswers
    }
    this.refreshStats()
  }

  changeGivenAnswer(ansind: number) {
    // first reset all radios
    this.query.qanswers.map(ans => ans.givenans = false)
    // second set new radio
    this.query.qanswers[ansind].givenans = !this.query.qanswers[ansind].givenans
    this.refreshStats()
  }

  checkQueryFiAnswered() {
    // answered? (is one answer given 'true')
    if (this.query.qgiventxt != '') {
      console.log('answered')
      return true
    } else {
      // not answered
      console.log('not answered')
      return false
    }
  }

  checkQueryFiAnsweredCorrect() {
    // correct answered? qgiventxt in one of answers txt
    if (this.query.qanswers.find(q => q.txt.find(at => at === this.query.qgiventxt))) {
      console.log('answered true')
      return true
    } else {
      // answered false
      console.log('answered false')
      return false
    }
  }
}
