import ReactDOM from 'react-dom/client'
import App from './App.tsx'

import { ThemeProvider, createTheme } from '@mui/material';
import './index.css'

const darkTheme = createTheme({
    palette: {
        mode: "dark"
    }
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <ThemeProvider theme={darkTheme}>
        <App />
    </ThemeProvider>
)