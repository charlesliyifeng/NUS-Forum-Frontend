import Home from "./pages/Home";
import QuestionView from "./pages/question/QuestionView";
import AskQuestion from "./pages/question/AskQuestion";
import EditQuestion from "./pages/question/EditQuestion";
import DeleteQuestion from "./pages/question/DeleteQuestion";
import EditAnswer from "./pages/answer/EditAnswer";
import DeleteAnswer from "./pages/answer/DeleteAnswer";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import NotFound from "./pages/NotFound";
import AccessDenied from "./pages/AccessDenied";
import UserIdContext from "./contexts/UserIdContext";
import { getSession } from "./lib/api/session";

import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
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
    // userID: -1 = not signed in
    const [userID, setUserID] = useState(-1);

    useEffect(() => {
        // get userID from session token
        fetchUserID();
    }, []);

    const fetchUserID = async () => {
        try {
            const response = await getSession();
            setUserID(response.data.userId);
            // eslint-disable-next-line
        } catch (error: any) {
            if (error.message === "missing token") {
                console.log("token not found");
            } else {
                console.error(error);
            }
        }
    };

    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <UserIdContext.Provider value={{ userID: userID, setUserID: setUserID }}>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/question" element={<Home />} />
                            <Route path="/question/:id" element={<QuestionView />} />
                            <Route path="/question/new" element={<AskQuestion />} />
                            <Route path="/question/:id/edit" element={<EditQuestion />} />
                            <Route path="/question/:id/delete" element={<DeleteQuestion />} />
                            <Route path="/answer/:id/edit" element={<EditAnswer />} />
                            <Route path="/answer/:id/delete" element={<DeleteAnswer />} />
                            <Route path="/answer/:id/edit" element={<EditAnswer />} />
                            <Route path="/answer/:id/delete" element={<DeleteAnswer />} />
                            <Route path="/signin" element={<SigninPage />} />
                            <Route path="/signup" element={<SignupPage />} />
                            <Route path="/404" element={<NotFound />} />
                            <Route path="/access_denied" element={<AccessDenied />} />
                            <Route path="*" element={<Navigate replace to="/404" />} />
                        </Routes>
                    </UserIdContext.Provider>
                </BrowserRouter>
            </ThemeProvider>
        </div>
    );
};

export default App;
