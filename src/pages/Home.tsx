import SearchBar from "../components/SearchBar";
import SideBar from "../components/SideBar";
import ThreadList from "../components/ThreadList";
import Thread from "../types/Thread";
import { Box } from "@mui/material";
import React from "react";

// props for Home
type Props = {
    handleThreadClick: (thread: Thread) => void;
};

const Home: React.FC<Props> = ({ handleThreadClick }) => {
    return (
        <Box display={"flex"}>
            <SearchBar />
            <SideBar />
            <ThreadList handleThreadClick={handleThreadClick} />
        </Box>
    );
};

export default Home;
