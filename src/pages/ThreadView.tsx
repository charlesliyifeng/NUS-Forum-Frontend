import SearchBar from "../components/SearchBar";
import SideBar from "../components/SideBar";
import AnswerList from "../components/AnswerList";
import Thread from "../types/Thread";
import { Box } from "@mui/material";
import React from "react";

type Props = {
    thread: Thread;
    handleVoteChange: (change: number) => void;
};

const ThreadView: React.FC<Props> = ({ thread, handleVoteChange }) => {
    return (
        <Box display={"flex"}>
            <SearchBar />
            <SideBar />
            <AnswerList thread={thread} handleThreadVoteChange={handleVoteChange} />
        </Box>
    );
};

export default ThreadView;
