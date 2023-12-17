import SearchBar from "../components/SearchBar";
import SideBar from "../components/SideBar";
import Thread from "../types/Thread";
import { Box } from "@mui/material";
import React from "react";

type Props = {
    thread: Thread;
};

const ThreadView: React.FC<Props> = ({ thread }) => {
    return (
        <Box display={"flex"}>
            <SearchBar />
            <SideBar />
            <Box position={"relative"} top={80}>
                <h2>{thread.body}</h2>
            </Box>
        </Box>
    );
};

export default ThreadView;
