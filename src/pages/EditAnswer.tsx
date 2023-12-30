import SearchBar from "../components/SearchBar";
import SideBar from "../components/SideBar";
import EditAnswerForm from "../components/answer/EditAnswerForm";
import { Box } from "@mui/material";
import React from "react";

const EditAnswer: React.FC = () => {
    return (
        <Box display={"flex"}>
            <SearchBar />
            <SideBar />
            <EditAnswerForm />
        </Box>
    );
};

export default EditAnswer;
