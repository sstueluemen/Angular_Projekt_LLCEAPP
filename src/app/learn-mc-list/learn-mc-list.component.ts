import { Component } from '@angular/core';
import { Qlpic101Service } from '../services/qlpic101.service';
import { McQuery } from '../interfaces/mc-query';

@Component({
  selector: 'llceae-learn-mc-list',
  templateUrl: './learn-mc-list.component.html',
  styleUrls: ['./learn-mc-list.component.css']
})
export class LearnMcListComponent {
  ql101msall: McQuery[] = []
  showanswers = false
  queryNrAnswersShow = -1

  constructor(
    private ql101mc: Qlpic101Service
  ) {
    this.ql101msall = this.ql101mc.getallMc()
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

