import TopBar from "../components/TopBar";
import SideBar from "../components/SideBar";
import DeleteQuestionForm from "../components/question/DeleteQuestionForm";
import { Box } from "@mui/material";
import React from "react";

const DeleteQuestion: React.FC = () => {
    return (
        <Box display={"flex"}>
            <TopBar />
            <SideBar />
            <DeleteQuestionForm />
        </Box>
    );
};

export default DeleteQuestion;
