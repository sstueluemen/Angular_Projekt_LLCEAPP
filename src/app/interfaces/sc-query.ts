export interface ScQuery {
  qid: number,
  qtyp: string,
  qtxt: string[],
  qanswers: ScAnswers[],
  qcorrect: string,
  qinfo: string[]
}
interface ScAnswers {
  txt: string[],
  correct: boolean,
  givenans?: boolean
}
