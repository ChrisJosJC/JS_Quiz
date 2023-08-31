import { Button } from "@mui/material";
import { useQuestionStore } from '../store/questions';

export default function Start() {
    const LIMIT_QUESTION = 10
    const updateQuestion = useQuestionStore(state => state.requestQuestion)

    return (
        <Button onClick={() => { updateQuestion(LIMIT_QUESTION) }} variant="contained" fullWidth sx={{
            "backgroundColor": "#f7ff11", fontWeight: "700", ":hover": {
                backgroundColor: "#f7df1e"
            }
        }}>Empezar</Button>
    )
}