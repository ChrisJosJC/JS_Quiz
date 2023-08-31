import { Button } from "@mui/material"
import { useQuestionStore } from "../store/questions"

export const Footer = () => {
    const questions = useQuestionStore(state => state.questions)
    const reset = useQuestionStore(state => state.reset)

    let incorrects = 0
    let corrects = 0
    let unanswered = 0

    questions.forEach(question => {
        const { isCorrectUserAnswer } = question
        if (isCorrectUserAnswer) corrects++
        else if (isCorrectUserAnswer == null) unanswered++
        else incorrects++
    })

    return (
        <footer>
            <p>{`${incorrects} Wrongs - ${corrects} Corrects - ${unanswered} unanswred`}</p>
            <Button onClick={() => reset()} fullWidth variant="contained" sx={{
                backgroundColor: "#f23", "color": "#fff", fontWeight: "700", ":hover": {
                    "backgroundColor": "#f00"
                }
            }}>Reiniciar juego</Button>
        </footer>
    )
}