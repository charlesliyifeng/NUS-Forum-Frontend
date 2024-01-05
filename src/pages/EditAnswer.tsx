import TopBar from "../components/TopBar";
import SideBar from "../components/SideBar";
import EditAnswerForm from "../components/answer/EditAnswerForm";
import { Box } from "@mui/material";
import React from "react";

const EditAnswer: React.FC = () => {
    return (
        <Box display={"flex"}>
            <TopBar />
            <SideBar />
            <EditAnswerForm />
        </Box>
    );
};

export default EditAnswer;
