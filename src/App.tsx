import Home from "./pages/Home";
import QuestionView from "./pages/QuestionView";
import AskQuestion from "./pages/AskQuestion";
import EditQuestion from "./pages/EditQuestion";
import DeleteQuestion from "./pages/DeleteQuestion";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import NotFound from "./pages/NotFound";

import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { blue, orange, red } from "@mui/material/colors";

const theme = createTheme({
    palette: {
        primary: blue,
        secondary: orange,
        warning: red,
    },
});

const App: React.FC = () => {
    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/question" element={<Home />} />
                        <Route path="/question/:id" element={<QuestionView />} />
                        <Route path="/question/new" element={<AskQuestion />} />
                        <Route path="/question/:id/edit" element={<EditQuestion />} />
                        <Route path="/question/:id/delete" element={<DeleteQuestion />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/signup" element={<SignupPage />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </div>
    );
};

export default App;
