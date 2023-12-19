import Home from "./pages/Home";
import ThreadView from "./pages/ThreadView";
import AskQuestion from "./pages/AskQuestion";
import Thread from "./types/Thread";

import React, { useState } from "react";
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

// init currentThread state
const emptyThread: Thread = {
    id: "",
    title: "",
    body: "",
    author: "",
    timestamp: new Date(),
    votes: 0,
    accepted: false,
    answers: 0,
    views: 0,
};

const App: React.FC = () => {
    const [currentThread, setcurrentThread] = useState<Thread>(emptyThread);

    function handleThreadClick(thread: Thread) {
        setcurrentThread(thread);
    }

    function handleVoteChange(change: number) {
        const newCurrentThread = structuredClone(currentThread);
        newCurrentThread.votes += change;
        setcurrentThread(newCurrentThread);
    }

    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home handleThreadClick={handleThreadClick} />} />
                        <Route
                            path="/thread/1"
                            element={<ThreadView thread={currentThread} handleVoteChange={handleVoteChange} />}
                        />
                        <Route path="/askQuestion" element={<AskQuestion />} />
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </div>
    );
};

export default App;
