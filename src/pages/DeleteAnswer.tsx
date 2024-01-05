import TopBar from "../components/TopBar";
import SideBar from "../components/SideBar";
import DeleteAnswerForm from "../components/answer/DeleteAnswerForm";

import React from "react";
import { Box } from "@mui/material";

const DeleteAnswer: React.FC = () => {
    return (
        <Box display={"flex"}>
            <TopBar />
            <SideBar />
            <DeleteAnswerForm />
        </Box>
    );
};

export default DeleteAnswer;
