import SearchBar from "../components/SearchBar";
import SideBar from "../components/SideBar";
import AnswerList from "../components/AnswerList";
import { Box } from "@mui/material";
import React from "react";

const QuestionView: React.FC = () => {
    return (
        <Box display={"flex"}>
            <SearchBar />
            <SideBar />
            <AnswerList />
        </Box>
    );
};

export default QuestionView;
