import SearchBar from "../components/SearchBar";
import SideBar from "../components/SideBar";
import EditQuestionForm from "../components/question/EditQuestionForm";
import { Box } from "@mui/material";
import React from "react";

const EditQuestion: React.FC = () => {
    return (
        <Box display={"flex"}>
            <SearchBar />
            <SideBar />
            <EditQuestionForm />
        </Box>
    );
};

export default EditQuestion;
