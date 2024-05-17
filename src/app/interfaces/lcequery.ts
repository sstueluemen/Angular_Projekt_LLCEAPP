export interface LceQuery {
  qid: number,
  qtyp: string,
  qtxt: string[],
  qanswers: LceAnswers[],
  qcorrect?: string,
  qgiventxt?: string,
  qinfo?: string[]
}
interface LceAnswers {
  txt: string[],
  correct?: boolean,
  givenans?: boolean
}

