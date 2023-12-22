import SearchBar from "../components/SearchBar";
import SideBar from "../components/SideBar";
import AskQuestionForm from "../components/AskQuestionForm";
import { Box } from "@mui/material";
import React from "react";

const AskQuestion: React.FC = () => {
    return (
        <Box display={"flex"}>
            <SearchBar />
            <SideBar />
            <AskQuestionForm />
        </Box>
    );
};

export default AskQuestion;
