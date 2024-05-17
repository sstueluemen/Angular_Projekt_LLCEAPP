export interface McQuery {
    qid: number,
    qtyp: string,
    qtxt: string[],
    qanswers: McAnswers[],
    qcorrect: string,
    qinfo: string[]
}
interface McAnswers {
    txt: string[],
    correct: boolean,
    givenans?: boolean
}
