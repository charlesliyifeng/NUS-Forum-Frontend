import Home from "./pages/Home";
import PageLayout from "./pages/PageLayout";
import QuestionPage from "./pages/question/QuestionPage";
import SearchPage from "./pages/SearchPage";
import TagsPage from "./pages/TagsPage";
import AnswerList from "./pages/answer/AnswerList";
import AskQuestion from "./pages/question/AskQuestion";
import EditQuestion from "./pages/question/EditQuestion";
import DeleteQuestion from "./pages/question/DeleteQuestion";
import CommentQuestion from "./pages/question/CommentQuestion";
import EditAnswer from "./pages/answer/EditAnswer";
import DeleteAnswer from "./pages/answer/DeleteAnswer";
import CommentAnswer from "./pages/answer/CommentAnswer";
import UserProfile from "./pages/user/UserProfile";
import EditUser from "./pages/user/EditUser";
import DeleteUser from "./pages/user/DeleteUser";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import AccessDenied from "./pages/AccessDenied";
import UserContext from "./contexts/UserContext";
import { getSession } from "./lib/api/session";
import { User, newUser } from "./types/User";
import { deserializeUser } from "./lib/serializers/UserDeserializer";

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
    const [user, setUser] = useState<User>(newUser());

    useEffect(() => {
        // get userID from session token
        fetchUserID();
    }, []);

    const fetchUserID = async () => {
        try {
            const response = await getSession();
            setUser(deserializeUser(response.data));
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
                <Route path="search" element={<PageLayout />}>
                    <Route index element={<SearchPage />} />
                </Route>
                <Route path="tags" element={<PageLayout />}>
                    <Route index element={<TagsPage />} />
                </Route>
                <Route path="question" element={<PageLayout />}>
                    <Route index element={<QuestionPage isHome={false} />} />
                    <Route path="new" element={<AskQuestion />} />
                    <Route path=":id">
                        <Route index element={<AnswerList />} />
                        <Route path="edit" element={<EditQuestion />} />
                        <Route path="delete" element={<DeleteQuestion />} />
                        <Route path="comment" element={<CommentQuestion />} />
                    </Route>
                </Route>
                <Route path="answer" element={<PageLayout />}>
                    <Route path=":id">
                        <Route path="edit" element={<EditAnswer />} />
                        <Route path="delete" element={<DeleteAnswer />} />
                        <Route path="comment" element={<CommentAnswer />} />
                    </Route>
                </Route>
                <Route path="user" element={<PageLayout />}>
                    <Route path=":id">
                        <Route index element={<UserProfile />} />
                        <Route path="edit" element={<EditUser />} />
                        <Route path="delete" element={<DeleteUser />} />
                    </Route>
                </Route>
                <Route path="*" element={<Navigate replace to="/404" />} />
            </Route>,
        ),
    );

    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <UserContext.Provider value={{ user: user, setUser: setUser }}>
                    <RouterProvider router={router} />
                </UserContext.Provider>
            </ThemeProvider>
        </div>
    );
};

export default App;
