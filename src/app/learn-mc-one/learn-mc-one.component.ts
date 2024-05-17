import { Component, OnInit} from '@angular/core';
import { McQuery } from '../interfaces/mc-query';
import { Qlpic101Service } from '../services/qlpic101.service';

@Component({
  selector: 'llceae-learn-mc-one',
  templateUrl: './learn-mc-one.component.html',
  styleUrls: ['./learn-mc-one.component.css']
})
export class LearnMcOneComponent {
  ql101msall: McQuery[] = []

  showanswers = false
  queryNrAnswersShow = -1

  query: McQuery;
  currentQnr = -1

  constructor(
    private ql101mc: Qlpic101Service
  ) {
    this.ql101msall = this.ql101mc.getallMc()

    this.currentQnr = 0
    this.query = this.ql101msall[this.currentQnr]
  }

  firstQuery() {
      this.currentQnr = 0
      this.query = this.ql101msall[this.currentQnr]
  }

  prevQuery() {
    if (0 < this.currentQnr) {
      this.currentQnr--
      this.query = this.ql101msall[this.currentQnr]
    }
  }

  nextQuery() {
    if (this.currentQnr < this.ql101msall.length - 1) {
      this.currentQnr++
      this.query = this.ql101msall[this.currentQnr]
      console.log(this.currentQnr, this.query)
    }
  }

  lastQuery() {
    this.currentQnr = this.ql101msall.length - 1
    this.query = this.ql101msall[this.currentQnr]
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
