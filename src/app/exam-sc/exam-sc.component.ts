import { Component } from '@angular/core';
import { ScQuery } from '../interfaces/sc-query';
import { Statistics } from '../interfaces/statistics';
import { Qlpic101Service } from '../services/qlpic101.service';
import { StatsService } from '../services/stats.service';

@Component({
  selector: 'llceae-exam-sc',
  templateUrl: './exam-sc.component.html',
  styleUrls: ['./exam-sc.component.css']
})
export class ExamScComponent {
  ql101Scall: ScQuery[] = []

  showanswers = false
  queryNrAnswersShow = -1

  query: ScQuery;
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
    private ql101Sc: Qlpic101Service,
    private stats: StatsService
  ) {
    this.ql101Scall = this.ql101Sc.getallSc()
    this.ql101Sc.initGivenAnswers()

    this.statistic = this.stats.calcStatsSc()

    this.currentQnr = 0
    this.query = this.ql101Scall[this.currentQnr]
    this.gotolearnmode = false
    this.examwrong = 0
  }


  resetStats() {
    this.statistic = this.stats.resetStatsSc()
    this.firstQuery()
    this.gotolearnmode = false
    this.examwrong = 0
  }

  resetAnswers() {
    // reset 'givenanswer's of all questions
    this.ql101Scall.map(q => q.qanswers.map(a => a.givenans = false))
    this.resetStats()
    this.firstQuery()
    this.examwrong = 0
  }

  refreshStats() {
    this.statistic = this.stats.calcStatsSc()
  }

  firstQuery() {
    this.currentQnr = 0
    this.query = this.ql101Scall[this.currentQnr]
    this.showanswers = false
    this.refreshStats()
  }

  prevQuery() {
    if (0 < this.currentQnr) {
      this.currentQnr--
      this.query = this.ql101Scall[this.currentQnr]
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
        console.log(this.examwrong,this.ql101Scall.length,this.maxexamwrong)
        if ((100 * (this.examwrong / this.ql101Scall.length)) > this.maxexamwrong) {
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
    if (this.currentQnr < this.ql101Scall.length - 1) {
      this.currentQnr++
      this.query = this.ql101Scall[this.currentQnr]
      console.log(this.currentQnr, this.query)
    }
    this.showanswers = false
    this.refreshStats()
  }

  lastQuery() {
    this.currentQnr = this.ql101Scall.length - 1
    this.query = this.ql101Scall[this.currentQnr]
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

  changeGivenAnswer(ansind: number) {
    // first reset all radios
    this.query.qanswers.map(ans => ans.givenans = false)
    // second set new radio
    this.query.qanswers[ansind].givenans = !this.query.qanswers[ansind].givenans
    this.refreshStats()
  }

  examEnd() {
    this.refreshStats()
    this.examresult = true
    this.showanswers = true
  }
}
