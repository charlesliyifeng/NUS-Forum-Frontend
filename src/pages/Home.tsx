import SearchBar from "../components/SearchBar";
import SideBar from "../components/SideBar";
import QuestionList from "../components/QuestionList";
import { Box } from "@mui/material";
import React from "react";

const Home: React.FC = () => {
    return (
        <Box display={"flex"}>
            <SearchBar />
            <SideBar />
            <QuestionList />
        </Box>
    );
};

export default Home;
