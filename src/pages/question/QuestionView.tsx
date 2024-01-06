import TopBar from "../../components/TopBar";
import SideBar from "../../components/SideBar";
import AnswerList from "../../components/answer/AnswerList";
import { Box } from "@mui/material";
import React from "react";

const QuestionView: React.FC = () => {
    return (
        <Box display={"flex"}>
            <TopBar />
            <SideBar />
            <AnswerList />
        </Box>
    );
};

export default QuestionView;
