export interface Question {
    id: number
    question: string
    answers: string[]
    correctAnswer: string
    code: string
    correctAnswerIndex: number
    userSelectedAnswer?: number
    isCorrectUserAnswer?: boolean
}

export type Questions = Question[]