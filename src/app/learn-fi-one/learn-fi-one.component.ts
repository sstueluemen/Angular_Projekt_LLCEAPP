import { Component } from '@angular/core';
import { Qlpic101Service } from '../services/qlpic101.service';
import { FiQuery } from '../interfaces/fi-query';

@Component({
  selector: 'llceae-learn-fi-one',
  templateUrl: './learn-fi-one.component.html',
  styleUrls: ['./learn-fi-one.component.css']
})
export class LearnFiOneComponent {
  ql101fiall: FiQuery[] = []

  showanswers = false
  queryNrAnswersShow = -1

  query: FiQuery;
  currentQnr = -1

  constructor(
    private ql101fi: Qlpic101Service
  ) {
    this.ql101fiall = this.ql101fi.getallFi()

    this.currentQnr = 0
    this.query = this.ql101fiall[this.currentQnr]
  }

  firstQuery() {
      this.currentQnr = 0
      this.query = this.ql101fiall[this.currentQnr]
  }

  prevQuery() {
    if (0 < this.currentQnr) {
      this.currentQnr--
      this.query = this.ql101fiall[this.currentQnr]
    }
  }

  nextQuery() {
    if (this.currentQnr < this.ql101fiall.length - 1) {
      this.currentQnr++
      this.query = this.ql101fiall[this.currentQnr]
      console.log(this.currentQnr, this.query)
    }
  }

  lastQuery() {
    this.currentQnr = this.ql101fiall.length - 1
    this.query = this.ql101fiall[this.currentQnr]
}


  toggleAnswers(qid: number): void {
    if (this.queryNrAnswersShow != qid) {
      this.queryNrAnswersShow = qid;
      this.showanswers = true
    } else {
      this.showanswers = !this.showanswers
    }
  }




}
