import { Component } from '@angular/core';
import { McQuery } from '../interfaces/mc-query';
import { Qlpic101Service } from '../services/qlpic101.service';
import { Statistics } from '../interfaces/statistics';
import { StatsService } from '../services/stats.service';

@Component({
  selector: 'llceae-check-stats',
  templateUrl: './check-stats.component.html',
  styleUrls: ['./check-stats.component.css']
})
export class CheckStatsComponent {
  ql101msall: McQuery[] = []
  qfound: McQuery[] = []

  qanzahl: number = -1;
  qchkfalse: number = -1;
  qanwered: boolean = false;
  // stats: Statistics

  statistic: Statistics;

  constructor(
    private ql101mc: Qlpic101Service,
    private stats: StatsService
    ) {
    this.ql101msall = this.ql101mc.getallMc()
    // this.stats.calcStats()
    this.statistic = this.stats.calcStatsMc()
  }


}
