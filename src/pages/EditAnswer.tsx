import SearchBar from "../components/SearchBar";
import SideBar from "../components/SideBar";
import DeleteAnswerForm from "../components/answer/DeleteAnswerForm";
import { Box } from "@mui/material";
import React from "react";

const EditAnswer: React.FC = () => {
    return (
        <Box display={"flex"}>
            <SearchBar />
            <SideBar />
            <DeleteAnswerForm />
        </Box>
    );
};

export default EditAnswer;
