import SearchBar from "../components/SearchBar";
import SideBar from "../components/SideBar";
import AskQuestionForm from "../components/question/AskQuestionForm";
import UserIdContext from "../contexts/UserIdContext";

import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Box } from "@mui/material";

const AskQuestion: React.FC = () => {
    // eslint-disable-next-line
    const { userID, setUserID } = useContext(UserIdContext);

    // if not signed in
    if (userID === -1) {
        return <Navigate replace to="/signin" />;
    }

    return (
        <Box display={"flex"}>
            <SearchBar />
            <SideBar />
            <AskQuestionForm />
        </Box>
    );
};

export default AskQuestion;
