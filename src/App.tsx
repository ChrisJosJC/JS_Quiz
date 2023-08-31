import './App.css';
import Start from './components/Start';
import { JSIcon } from "./components/Icons";
import { Container, Typography, Stack } from "@mui/material"
import { useQuestionStore } from './store/questions';
import { Game } from './components/Game';

function App() {
  const questions = useQuestionStore(state => state.questions)
  return (
    <main>
      <Container maxWidth="sm">
        <Stack direction="row" gap={2} alignItems="center" justifyContent="center" sx={{ mb: 5 }}>
          <JSIcon />
          <Typography variant="h4" component="h1">Javascript Quizz</Typography>
        </Stack>
        {questions.length == 0 && <Start />}
        {questions.length > 0 && <Game />}
      </Container>
    </main>
  )
}

export default App