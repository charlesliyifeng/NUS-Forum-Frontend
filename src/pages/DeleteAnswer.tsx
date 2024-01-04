import SearchBar from "../components/SearchBar";
import SideBar from "../components/SideBar";
import DeleteAnswerForm from "../components/answer/DeleteAnswerForm";

import React from "react";
import { Box } from "@mui/material";

const DeleteAnswer: React.FC = () => {
    return (
        <Box display={"flex"}>
            <SearchBar />
            <SideBar />
            <DeleteAnswerForm />
        </Box>
    );
};

export default DeleteAnswer;
