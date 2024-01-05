import TopBar from "../components/TopBar";
import SideBar from "../components/SideBar";
import QuestionList from "../components/question/QuestionList";
import { Box } from "@mui/material";
import React from "react";

const Home: React.FC = () => {
    return (
        <Box display={"flex"}>
            <TopBar />
            <SideBar />
            <QuestionList />
        </Box>
    );
};

export default Home;
