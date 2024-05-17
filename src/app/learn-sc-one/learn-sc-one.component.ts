import { Component } from '@angular/core';
import { ScQuery } from '../interfaces/sc-query';
import { Qlpic101Service } from '../services/qlpic101.service';

@Component({
  selector: 'llceae-learn-sc-one',
  templateUrl: './learn-sc-one.component.html',
  styleUrls: ['./learn-sc-one.component.css']
})
export class LearnScOneComponent {
  ql101scall: ScQuery[] = []

  showanswers = false
  queryNrAnswersShow = -1

  query: ScQuery;
  currentQnr = -1

  constructor(
    private ql101sc: Qlpic101Service
  ) {
    this.ql101scall = this.ql101sc.getallSc()

    this.currentQnr = 0
    this.query = this.ql101scall[this.currentQnr]
  }

  firstQuery() {
      this.currentQnr = 0
      this.query = this.ql101scall[this.currentQnr]
  }

  prevQuery() {
    if (0 < this.currentQnr) {
      this.currentQnr--
      this.query = this.ql101scall[this.currentQnr]
    }
  }

  nextQuery() {
    if (this.currentQnr < this.ql101scall.length - 1) {
      this.currentQnr++
      this.query = this.ql101scall[this.currentQnr]
      console.log(this.currentQnr, this.query)
    }
  }

  lastQuery() {
    this.currentQnr = this.ql101scall.length - 1
    this.query = this.ql101scall[this.currentQnr]
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
