import QuestionPage from "./question/QuestionPage";
import TopBar from "../components/TopBar";
import SideBar from "../components/SideBar";
import { Box } from "@mui/material";
import React from "react";

const Home: React.FC = () => {
    return (
        <Box display={"flex"}>
            <TopBar />
            <SideBar />
            <QuestionPage isHome />
        </Box>
    );
};

export default Home;
