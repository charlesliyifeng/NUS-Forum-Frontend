import Home from "./pages/Home";
import ThreadView from "./pages/ThreadView";
import AskQuestion from "./pages/AskQuestion";
import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { blue, orange } from "@mui/material/colors";

const theme = createTheme({
    palette: {
        primary: blue,
        secondary: orange,
    },
});

const App: React.FC = () => {
    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/home" element={<Home />} />
                        <Route path="/thread/1" element={<ThreadView />} />
                        <Route path="/askQuestion" element={<AskQuestion />} />
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </div>
    );
};

export default App;
