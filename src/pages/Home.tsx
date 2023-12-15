import SearchBar from "../components/SearchBar";
import SideBar from "../components/SideBar";
import ThreadList from "../components/ThreadList";
import { Box } from "@mui/material";
import React from "react";

const Home: React.FC = () => {
    return (
        <Box>
            <SearchBar />
            <SideBar />
            <ThreadList />
        </Box>
    );
};

export default Home;
