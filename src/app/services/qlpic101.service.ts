import { Injectable } from '@angular/core';

import qlpic101allJson from "../../assets/LPI-2019-1-101d-QA-all.json";
import { LceQuery } from '../interfaces/lcequery';
import qlpic101mcJson from "../../assets/LPI-2019-1-101d-QA-mc.json";
import { McQuery } from '../interfaces/mc-query';
import qlpic101scJson from "../../assets/LPI-2019-1-101d-QA-sc.json";
import { ScQuery } from '../interfaces/sc-query';
import qlpic101fiJson from "../../assets/LPI-2019-1-101d-QA-fi.json";
import { FiQuery } from '../interfaces/fi-query';


@Injectable({
  providedIn: 'root'
})
export class Qlpic101Service {
  qlpic101all: LceQuery[] = qlpic101allJson
  qlpic101mc: McQuery[] = qlpic101mcJson
  qlpic101sc: ScQuery[] = qlpic101scJson
  qlpic101fi: FiQuery[] = qlpic101fiJson

  initGivenAnswers() {
    this.qlpic101mc.map(q => q.qanswers.map(a => a.givenans = false))
    this.qlpic101sc.map(q => q.qanswers.map(a => a.givenans = false))
    this.qlpic101fi.map(q => q.qanswers.map(a => a.givenans = false))
    this.qlpic101fi.map(q => q.qgiventxt = '')
    // now for all qtyp mixed
    this.qlpic101all.map(q => q.qanswers.map(a => a.givenans = false))
    this.qlpic101all.map(q => q.qgiventxt = '')
  }

  getallAll(): LceQuery[] {
    return this.qlpic101all
  }

  getallMc(): McQuery[] {
    return this.qlpic101mc
  }

  getallSc(): ScQuery[] {
    return this.qlpic101sc
  }

  getallFi(): FiQuery[] {
    return this.qlpic101fi
  }

}
