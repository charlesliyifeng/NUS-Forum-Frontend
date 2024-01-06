import Home from "./pages/Home";
import PageLayout from "./pages/PageLayout";
import QuestionList from "./pages/question/QuestionList";
import AnswerList from "./pages/answer/AnswerList";
import AskQuestion from "./pages/question/AskQuestion";
import EditQuestion from "./pages/question/EditQuestion";
import DeleteQuestion from "./pages/question/DeleteQuestion";
import EditAnswer from "./pages/answer/EditAnswer";
import DeleteAnswer from "./pages/answer/DeleteAnswer";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import AccessDenied from "./pages/AccessDenied";
import UserIdContext from "./contexts/UserIdContext";
import { getSession } from "./lib/api/session";

import React, { useEffect, useState } from "react";
import "./App.css";
import { Route, Navigate, createBrowserRouter, RouterProvider, createRoutesFromElements } from "react-router-dom";
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

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/">
                <Route index element={<Home />} />
                <Route path="signin" element={<SignIn />} />
                <Route path="signup" element={<SignUp />} />
                <Route path="404" element={<NotFound />} />
                <Route path="access_denied" element={<AccessDenied />} />
                <Route path="question" element={<PageLayout />}>
                    <Route index element={<QuestionList isHome={false} />} />
                    <Route path="new" element={<AskQuestion />} />
                    <Route path=":id">
                        <Route index element={<AnswerList />} />
                        <Route path="edit" element={<EditQuestion />} />
                        <Route path="delete" element={<DeleteQuestion />} />
                    </Route>
                </Route>
                <Route path="answer" element={<PageLayout />}>
                    <Route path=":id">
                        <Route path="edit" element={<EditAnswer />} />
                        <Route path="delete" element={<DeleteAnswer />} />
                        <Route path="*" element={<Navigate replace to="/404" />} />
                    </Route>
                </Route>
                <Route path="*" element={<Navigate replace to="/404" />} />
            </Route>,
        ),
    );

    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <UserIdContext.Provider value={{ userID: userID, setUserID: setUserID }}>
                    <RouterProvider router={router} />
                </UserIdContext.Provider>
            </ThemeProvider>
        </div>
    );
};

export default App;
