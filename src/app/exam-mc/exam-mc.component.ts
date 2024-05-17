import { Component } from '@angular/core';
import { McQuery } from '../interfaces/mc-query';
import { Statistics } from '../interfaces/statistics';
import { Qlpic101Service } from '../services/qlpic101.service';
import { StatsService } from '../services/stats.service';

@Component({
  selector: 'llceae-exam-mc',
  templateUrl: './exam-mc.component.html',
  styleUrls: ['./exam-mc.component.css']
})
export class ExamMcComponent {
  ql101mcall: McQuery[] = []

  showanswers = false
  queryNrAnswersShow = -1

  query: McQuery;
  currentQnr = -1

  statistic: Statistics;
  gotolearnmode: boolean

  // maxexamwrong in %
  maxexamwrong = 20
  // examwrong number of wrong questions
  examwrong: number

  examresult = false
  showResultQuestions = false

  constructor(
    private ql101Mc: Qlpic101Service,
    private stats: StatsService
  ) {
    this.ql101mcall = this.ql101Mc.getallMc()
    this.ql101Mc.initGivenAnswers()

    this.statistic = this.stats.calcStatsMc()

    this.currentQnr = 0
    this.query = this.ql101mcall[this.currentQnr]
    this.gotolearnmode = false
    this.examwrong = 0
  }


  resetStats() {
    this.statistic = this.stats.resetStatsMc()
    this.firstQuery()
    this.gotolearnmode = false
    this.examwrong = 0
  }

  resetAnswers() {
    // reset 'givenanswer's of all questions
    this.ql101mcall.map(q => q.qanswers.map(a => a.givenans = false))
    this.resetStats()
    this.firstQuery()
    this.examwrong = 0
  }

  refreshStats() {
    this.statistic = this.stats.calcStatsMc()
  }

  firstQuery() {
    this.currentQnr = 0
    this.query = this.ql101mcall[this.currentQnr]
    this.showanswers = false
    this.refreshStats()
  }

  prevQuery() {
    if (0 < this.currentQnr) {
      this.currentQnr--
      this.query = this.ql101mcall[this.currentQnr]
    }
    this.showanswers = false
    this.refreshStats()
  }

  nextQuery() {
    // ------------------------------------------------------
    // check if current question answered and correct -> next
    //   else update examwrong counter
    // answered?
    if (this.checkQueryMcAnswered()) {
      this.gotolearnmode = false
      if (!this.checkQueryMcAnsweredCorrect()) {
        // answered and false -> PopUp and prev question
        // examwrong + 1 (max 7)
        this.examwrong++
        // reset answers of current query - not in exam mode
        // this.query.qanswers.map(a => a.givenans = false)
        // back one query or to first query
        // this.prevQuery()
        this.refreshStats()
        console.log('Learn wrong: ', this.examwrong)
        console.log(this.examwrong,this.ql101mcall.length,this.maxexamwrong)
        if ((100 * (this.examwrong / this.ql101mcall.length)) > this.maxexamwrong) {
          // x% wrong, this is bad :( - popup and go to learn mode
          this.gotolearnmode = true
        }
        // this.setNextQuestion()
      } else { // answered and true
        // to next question
        // this.setNextQuestion()
        // }
      }
    } else {
      // not answered -> next question
    }
    this.setNextQuestion()
    // console.log('curr q: ', this.currentQnr)
  }

  setNextQuestion() {
    if (this.currentQnr < this.ql101mcall.length - 1) {
      this.currentQnr++
      this.query = this.ql101mcall[this.currentQnr]
      console.log(this.currentQnr, this.query)
    }
    this.showanswers = false
    this.refreshStats()
  }

  lastQuery() {
    this.currentQnr = this.ql101mcall.length - 1
    this.query = this.ql101mcall[this.currentQnr]
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
  examEnd() {
    this.refreshStats()
    this.examresult = true
    this.showanswers = true
  }
}
