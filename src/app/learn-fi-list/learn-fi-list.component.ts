import { Component } from '@angular/core';
import { FiQuery } from '../interfaces/fi-query';
import { Qlpic101Service } from '../services/qlpic101.service';

@Component({
  selector: 'llceae-learn-fi-list',
  templateUrl: './learn-fi-list.component.html',
  styleUrls: ['./learn-fi-list.component.css']
})
export class LearnFiListComponent {
  ql101fiall: FiQuery[] = []
  showanswers = false
  queryNrAnswersShow = -1

  constructor(
    private ql101fi: Qlpic101Service
  ) {
    this.ql101fiall = this.ql101fi.getallFi()
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
