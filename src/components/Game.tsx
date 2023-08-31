import { Card, Typography, List, ListItem, ListItemButton, ListItemText, Stack, IconButton } from "@mui/material"
import { useQuestionStore } from "../store/questions"
import { type Question as QuestionType } from "../types";

import SyntaxHighlighter from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import { Footer } from "./Footer";

const getBackgroundColor = (info: QuestionType, index: number) => {
    const { userSelectedAnswer, correctAnswerIndex } = info
    if (userSelectedAnswer == null) return "transparent"
    if (index !== correctAnswerIndex && index !== userSelectedAnswer) return "transparent"
    if (index === correctAnswerIndex) return "green"
    if (index === userSelectedAnswer) return "red"
}

const Question = ({ info }: { info: QuestionType }) => {
    const selectAnswer = useQuestionStore(state => state.selectAnswer)

    const handleSelectAnswer = (answerIndex: number) => () => {
        selectAnswer(info.id, answerIndex)
    }


    return (
        <Card variant="outlined" sx={{ bgColor: "#222", textAlign: "left", padding: 2, maxWidth: "400px", marginTop: 2 }}>
            <Typography variant="h5">
                {info.question}
            </Typography>

            <SyntaxHighlighter language="javascript" style={dracula}>
                {info.code}
            </SyntaxHighlighter>

            <List sx={{ textAlign: "center", backgroundColor: "#333" }} disablePadding>
                {info.answers.map((ans, index) => (
                    <ListItem key={index} disablePadding divider sx={{ backgroundColor: getBackgroundColor(info, index) }}>
                        <ListItemButton onClick={handleSelectAnswer(index)} disabled={info.userSelectedAnswer != null}>
                            <ListItemText primary={ans} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Card>
    )
}

export const Game = () => {
    const questions = useQuestionStore(state => state.questions)
    const currentQuestion = useQuestionStore(state => state.currentQuestion)
    const goNextQuestion = useQuestionStore(state => state.getNextQuestion)
    const goPreviousQuestion = useQuestionStore(state => state.getPreviousQuestion)

    const questionInfo = questions[currentQuestion]
    return (
        <>
            <Stack direction="row" gap={2} justifyContent="center" alignItems="center">
                <IconButton onClick={() => goPreviousQuestion()} disabled={currentQuestion == 0}>
                    <ArrowBackIosNew></ArrowBackIosNew>
                </IconButton>
                {currentQuestion + 1} / {questions.length}
                <IconButton onClick={() => goNextQuestion()} disabled={currentQuestion >= questions.length - 1}>
                    <ArrowForwardIos></ArrowForwardIos>
                </IconButton>
            </Stack >
            <Question info={questionInfo} />
            <Footer />
        </>
    )
}