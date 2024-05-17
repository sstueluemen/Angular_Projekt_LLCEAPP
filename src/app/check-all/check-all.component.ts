import { Component } from '@angular/core';
import { Statistics } from '../interfaces/statistics';
import { Qlpic101Service } from '../services/qlpic101.service';
import { StatsService } from '../services/stats.service';
import { LceQuery } from '../interfaces/lcequery';

@Component({
  selector: 'llceae-check-all',
  templateUrl: './check-all.component.html',
  styleUrls: ['./check-all.component.css']
})
export class CheckAllComponent {
  ql101all: LceQuery[] = []

  showanswers = false
  queryNrAnswersShow = -1

  query: LceQuery;
  currentQnr = -1
  correctInput: boolean = false;

  statistic: Statistics;
  gotolearnmode: boolean
  learnwrong: number
  maxlearnwrong = 3

  constructor(
    private ql101srvc: Qlpic101Service,
    private stats: StatsService
  ) {
    this.ql101all = this.ql101srvc.getallAll()
    this.ql101srvc.initGivenAnswers()

    this.statistic = this.stats.calcStatsAll()

    this.currentQnr = 0
    this.query = this.ql101all[this.currentQnr]
    this.gotolearnmode = false
    this.learnwrong = 0
  }

  shuffleAll() {
    console.log('in shuffle')
  }


  resetStats() {
    this.statistic = this.stats.resetStatsAll()
    this.firstQuery()
    this.gotolearnmode = false
    this.learnwrong = 0
  }

  resetAnswers() {
    
    this.ql101all.map(q => q.qanswers.map(a => a.givenans = false))
    this.resetStats()
    this.firstQuery()
    this.learnwrong = 0
  }

  refreshStats() {
    this.statistic = this.stats.calcStatsAll()
  }

  firstQuery() {
    this.currentQnr = 0
    this.query = this.ql101all[this.currentQnr]
    this.showanswers = false
    this.refreshStats()
  }

  prevQuery() {
    if (0 < this.currentQnr) {
      this.currentQnr--
      this.query = this.ql101all[this.currentQnr]
    }
    this.showanswers = false
    this.refreshStats()
  }

  nextQuery() {
    // check if current question answered and correct -> next
    //   else update learnwrong counter
    if (this.query.qtyp === 'mc') {
      if (this.checkQueryMcAnswered()) {
        this.gotolearnmode = false
        if (!this.checkQueryMcAnsweredCorrect()) {
          // answered and false -> PopUp and prev question
          // learnwrong + 1 (max 7)
          this.learnwrong++
          // reset answers of current query
          this.query.qanswers.map(a => a.givenans = false)
          // this.query.qgiventxt = ''
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
        }
      } else {
        // not answered -> next question
        this.setNextQuestion()
      }
      // console.log('curr q: ', this.currentQnr)
    } else if (this.query.qtyp === 'sc') {
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
    } else if (this.query.qtyp === 'fi') {
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
    this.refreshStats()

  }

  setNextQuestion() {
    if (this.currentQnr < this.ql101all.length - 1) {
      this.currentQnr++
      this.query = this.ql101all[this.currentQnr]
      console.log(this.currentQnr, this.query)
    }
    this.showanswers = false
    this.refreshStats()
  }

  lastQuery() {
    this.currentQnr = this.ql101all.length - 1
    this.query = this.ql101all[this.currentQnr]
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

  toggleGivenAnswer(ansind: number) {
    this.query.qanswers[ansind].givenans = !this.query.qanswers[ansind].givenans
    this.refreshStats()
  }

  changeGivenAnswer(ansind: number) {
    // first reset all radios
    this.query.qanswers.map(ans => ans.givenans = false)
    // second set new radio
    this.query.qanswers[ansind].givenans = !this.query.qanswers[ansind].givenans
    this.refreshStats()
  }

  checkQueryMcAnswered() {
    // answered? (is one answer given 'true')
    if (this.query.qanswers.find(a => a.givenans === true)) {
      console.log('answered')
      return true
    } else {
      // not answered
      console.log('not answered')
      return false
    }
  }

  checkQueryMcAnsweredCorrect() {
    // correct answered? (are all givenans equal correct)
    if (this.query.qanswers.find(a => a.givenans != a.correct)) {
      // answered false
      console.log('answered false')
      return false
    } else {
      console.log('answered true')
      return true
    }
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
