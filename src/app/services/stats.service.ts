import { Injectable } from '@angular/core';
import { McQuery } from '../interfaces/mc-query';
import { Qlpic101Service } from './qlpic101.service';
import { Statistics } from '../interfaces/statistics';
import { ScQuery } from '../interfaces/sc-query';
import { FiQuery } from '../interfaces/fi-query';
import { LceQuery } from '../interfaces/lcequery';

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  ql101all: LceQuery[] = []
  ql101mcall: McQuery[] = []
  ql101scall: ScQuery[] = []
  ql101fiall: FiQuery[] = []

  qfound: LceQuery[] = []
  answered: LceQuery[] = []
  wronganswered: LceQuery[] = []

  qanzahl: number = -1;
  qchkfalse: number = -1;
  qanwered: boolean = false;

  stats: Statistics;

  constructor(
    private ql101mc: Qlpic101Service,
  ) {
    this.ql101all = this.ql101mc.getallAll()
    this.ql101mcall = this.ql101mc.getallMc()
    this.ql101scall = this.ql101mc.getallSc()
    this.ql101fiall = this.ql101mc.getallFi()

    this.stats = {
      qmaxnumber: 0,
      qanswered: 0,
      qwrong: 0,
      qcorrect: 0,
      qnotanswered: 0
    }
  }

  shuffleAll() {
    console.log('in shuffle')
  }

  nullStats() {
    this.stats.qmaxnumber = 0;
    this.stats.qanswered = 0;
    this.stats.qwrong = 0;
    this.stats.qcorrect = 0;
    this.stats.qnotanswered = 0;
  }

  resetStatsAll() {
    this.nullStats()
    return this.calcStatsAll();
  }

  resetStatsMc() {
    this.nullStats()
    return this.calcStatsMc();
  }

  resetStatsSc() {
    this.nullStats()
    return this.calcStatsSc();
  }

  resetStatsFi() {
    this.nullStats()
    return this.calcStatsFi();
  }

  calcStatsAll() {
    // numbers of questions
    this.stats.qmaxnumber = this.ql101all.length
    // console.log('Anzahl Fragen: ', this.stats.qmaxnumber)
    // answered?
    let mcs =
      this.ql101all.filter(q => q.qtyp === 'mc').
        filter(q => q.qanswers.findIndex(a => a.givenans === true) > -1).length

    let scs =
      this.ql101all.filter(q => q.qtyp === 'sc')
        .filter(q => q.qanswers.findIndex(a => a.givenans === true) > -1).length

    let fis =
      this.ql101all.filter(q => q.qtyp === 'fi').filter(q => q.qgiventxt != '').length

    this.stats.qanswered = mcs + scs + fis
    console.log(mcs, scs, fis)

    // // not answered
    this.stats.qnotanswered = this.stats.qmaxnumber - mcs - scs - fis

    // // correct answered
    // mcs not correct
    let notcorrectmcs = this.ql101all.filter(q => q.qtyp === 'mc')
      .filter(q => q.qanswers.findIndex(a => a.correct != a.givenans) > -1).length
    console.log('mcs n c:', notcorrectmcs)
    // scs not correct
    let notcorrectscs = this.ql101all.filter(q => q.qtyp === 'sc')
      .filter(q => q.qanswers.findIndex(a => a.correct != a.givenans) > -1).length
    console.log('scs n c:', notcorrectscs)
    // fis not correct
    let notcorrectfis = this.ql101all.filter(q => q.qtyp === 'fi')
      .filter(q => q.qanswers.findIndex(a => a.txt.find(t => t === q.qgiventxt))).length
    console.log('fis n c:', notcorrectfis)

    this.stats.qcorrect = this.stats.qmaxnumber - notcorrectmcs - notcorrectscs - notcorrectfis
    // // wrong answered
    this.stats.qwrong = this.stats.qnotanswered - (notcorrectmcs + notcorrectscs + notcorrectfis)

    return this.stats;
  }

  calcStatsMc() {
    // numbers of questions
    this.stats.qmaxnumber = this.ql101mcall.length
    // console.log('Anzahl Fragen: ', this.stats.qmaxnumber)
    // answered?
    if (this.ql101mcall.findIndex(q => q.qanswers.findIndex(a => a.givenans === true))
      > 0) {
      this.stats.qanswered = this.ql101mcall.filter(q => q.qanswers.findIndex(
        a => a.givenans === true) != -1).length
    }
    // not answered
    this.stats.qnotanswered = this.stats.qmaxnumber - this.stats.qanswered;
    // correct answered
    // 1. finde beantwortete fragen
    this.answered = this.ql101mcall.filter(q => q.qanswers.findIndex(a => a.givenans === true) > -1)
    // 2. finde fragen mit nicht 'correct != givenans' => falsch beantwortet sind
    this.wronganswered = this.answered.filter(
      q => q.qanswers.findIndex(
        a => a.correct != a.givenans) > -1)
    this.stats.qcorrect = this.answered.length - this.wronganswered.length
    // wrong answered
    this.stats.qwrong = this.wronganswered.length

    return this.stats;
  }

  calcStatsSc() {
    // numbers of questions
    this.stats.qmaxnumber = this.ql101scall.length
    // console.log('Anzahl Fragen: ', this.stats.qmaxnumber)
    // answered?
    if (this.ql101scall.findIndex(q => q.qanswers.findIndex(a => a.givenans === true))
      > 0) {
      this.stats.qanswered = this.ql101scall.filter(q => q.qanswers.findIndex(
        a => a.givenans === true) != -1).length
    }
    // not answered
    this.stats.qnotanswered = this.stats.qmaxnumber - this.stats.qanswered;

    // correct answered
    // 1. finde beantwortete fragen
    this.answered = this.ql101scall.filter(q => q.qanswers.findIndex(a => a.givenans === true) > -1)
    // 2. finde fragen mit nicht 'correct != givenans' => falsch beantwortet sind
    this.wronganswered = this.answered.filter(
      q => q.qanswers.findIndex(
        a => a.correct != a.givenans) > -1)
    this.stats.qcorrect = this.answered.length - this.wronganswered.length
    // wrong answered
    this.stats.qwrong = this.wronganswered.length
    return this.stats;
  }

  calcStatsFi() {
    // nullStats(){
    //   this.stats.qmaxnumber = 0;
    //   this.stats.qanswered = 0;
    //   this.stats.qwrong = 0;
    //   this.stats.qcorrect = 0;
    //   this.stats.qnotanswered = 0;
    // }
    // numbers of questions
    this.stats.qmaxnumber = this.ql101fiall.length
    // console.log('Anzahl Fragen: ', this.stats.qmaxnumber)
    // answered?
    // if (this.ql101fiall.findIndex(q => q.qgiventxt != '')) {
    this.stats.qanswered = this.ql101fiall.filter(q => q.qgiventxt != '').length
    // }
    // not answered
    this.stats.qnotanswered = this.stats.qmaxnumber - this.stats.qanswered;
    // correct answered
    this.stats.qcorrect = this.ql101fiall.filter(
      q => q.qanswers.find(
        a => a.txt.find(t => t === q.qgiventxt))).length
    // this.stats.qcorrect = this.answered.length - this.wronganswered.length
    // wrong answered
    this.stats.qwrong = this.stats.qanswered - this.stats.qcorrect
    return this.stats;
  }
}
