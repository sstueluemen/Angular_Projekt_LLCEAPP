import { Component } from '@angular/core';
import { ScQuery } from '../interfaces/sc-query';
import { Qlpic101Service } from '../services/qlpic101.service';
import { StatsService } from '../services/stats.service';
import { Statistics } from '../interfaces/statistics';

@Component({
  selector: 'llceae-check-sc',
  templateUrl: './check-sc.component.html',
  styleUrls: ['./check-sc.component.css']
})
export class CheckScComponent {
  ql101scall: ScQuery[] = []

  showanswers = false
  queryNrAnswersShow = -1

  query: ScQuery;
  currentQnr = -1

  statistic: Statistics;
  gotolearnmode: boolean
  learnwrong: number
  maxlearnwrong = 3

  constructor(
    private ql101Sc: Qlpic101Service,
    private stats: StatsService
  ) {
    this.ql101scall = this.ql101Sc.getallSc()
    this.ql101Sc.initGivenAnswers()

    this.currentQnr = 0
    this.query = this.ql101scall[this.currentQnr]

    this.statistic = this.stats.calcStatsSc()
    this.gotolearnmode = false
    this.learnwrong = 0
  }


  resetStats() {
    this.statistic = this.stats.resetStatsSc()
    this.firstQuery()
    this.gotolearnmode = false
    this.learnwrong = 0
  }

  resetAnswers() {
    // reset 'givenanswer's of all questions
    this.ql101scall.map(q => q.qanswers.map(a => a.givenans = false))
    this.resetStats()
    this.firstQuery()
    this.learnwrong = 0
  }

  refreshStats() {
    this.statistic = this.stats.calcStatsSc()
  }

  firstQuery() {
    this.currentQnr = 0
    this.query = this.ql101scall[this.currentQnr]
    this.showanswers = false
    this.refreshStats()
  }

  prevQuery() {
    if (0 < this.currentQnr) {
      this.currentQnr--
      this.query = this.ql101scall[this.currentQnr]
    }
    this.showanswers = false
    this.refreshStats()
  }

  nextQuery() {
    // ----------------
    // check if current question answered and correct -> next
    //   else update learnwrong counter
    // answered?
    if (this.checkQueryScAnswered()) {
      this.gotolearnmode = false
      if (!this.checkQueryScAnsweredCorrect()) {
        // answered and false -> PopUp and prev question
        // learnwrong + 1 (max 7)
        this.learnwrong++
        // reset answers of current query
        this.query.qanswers.map(a => a.givenans = false)
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
    if (this.currentQnr < this.ql101scall.length - 1) {
      this.currentQnr++
      this.query = this.ql101scall[this.currentQnr]
      console.log(this.currentQnr, this.query)
    }
    this.showanswers = false
    this.refreshStats()
  }


  lastQuery() {
    this.currentQnr = this.ql101scall.length - 1
    this.query = this.ql101scall[this.currentQnr]
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

  checkQueryScAnswered() {
    // answered? (is one answer given 'true')
    if (this.query.qanswers.find(a => a.givenans === true)) {
      // console.log('answered')
      return true
    } else {
      // not answered
      // console.log('not answered')
      return false
    }
  }

  checkQueryScAnsweredCorrect() {
    // correct answered? (is givenans equal correct)
    if (this.query.qanswers.find(a => a.givenans === true && a.givenans === a.correct)) {
      // console.log('answered true')
      return true
    } else {
      // answered false
      // console.log('answered false')
      return false
    }
  }
}
