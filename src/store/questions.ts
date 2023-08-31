import { create } from "zustand"
import type { Questions } from "../types"
import confetti from "canvas-confetti";
import { persist } from "zustand/middleware";

interface State {
    questions: Questions
    currentQuestion: number
    requestQuestion: (limit: number) => Promise<void>
    selectAnswer: (questionId: number, answerId: number) => void
    getNextQuestion: () => void
    getPreviousQuestion: () => void
    reset: () => void
}

export const useQuestionStore = create<State>()(persist((set, get) => {
    return {
        questions: [],
        currentQuestion: 0,

        requestQuestion: async (limit: number) => {
            const res = await fetch("http://localhost:5173/data.json")
            const json: Questions = await res.json()
            const questions = json.sort(() => Math.random() - 0.5).slice(0, limit)

            set({ questions })
        },
        selectAnswer: (questionId, answerId) => {
            const { questions } = get()
            const newQuestions = structuredClone(questions)
            const questionIndex = newQuestions.findIndex(q => q.id === questionId)
            const questionInfo = newQuestions[questionIndex]
            const isCorrectUserAnswer = questionInfo.correctAnswerIndex == answerId
            if (isCorrectUserAnswer) confetti()

            newQuestions[questionIndex] = {
                ...questionInfo,
                isCorrectUserAnswer,
                userSelectedAnswer: answerId
            }
            set({ questions: newQuestions })
        },
        getNextQuestion: () => {
            const { currentQuestion, questions } = get()
            const nextQuestion = currentQuestion + 1

            if (nextQuestion < questions.length) set({ currentQuestion: nextQuestion })
        },
        getPreviousQuestion: () => {
            const { currentQuestion } = get()
            const previousQuestion = currentQuestion - 1

            if (0 <= previousQuestion) set({ currentQuestion: previousQuestion })
        },
        reset: () => {
            set({ currentQuestion: 0, questions: [] })
        },
    }
}, {
    name: "question"
}))