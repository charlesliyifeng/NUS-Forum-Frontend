import ThreadCard from "./ThreadCard";
import BasicSelect from "./BasicSelect";
import Thread from "../types/Thread";
import React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { Link } from "react-router-dom";

const ThreadList: React.FC = () => {
    // get threads
    const Threads: Thread[] = [];
    Threads[0] = {
        id: "1",
        body: "hello",
        author: "Bob",
        timestamp: new Date(2022, 10, 28, 10, 33, 30),
        votes: 5,
        answers: 1,
        accepted: false,
        views: 1000000000,
    };
    Threads[1] = {
        id: "2",
        body: "testing is the worst thing in the world.",
        author: "Cathy",
        timestamp: new Date(2022, 10, 28, 10, 33, 30),
        votes: 2,
        answers: 2,
        accepted: true,
        views: 1000,
    };
    Threads[2] = {
        id: "3",
        body: "hello2",
        author: "Alice",
        timestamp: new Date(2020, 12, 28, 10, 33, 2),
        votes: 1,
        answers: 1,
        accepted: false,
        views: 100,
    };

    return (
        <Box
            display={"flex"}
            flexDirection={"column"}
            position={"relative"}
            width={"100%"}
            sx={{ flexGrow: 1, p: 3 }}
            top={80}
        >
            <Toolbar>
                <Typography variant="h4" position="static">
                    {"Top Questions"}
                </Typography>
                <BasicSelect placeholder={"Sort by"} choices={["votes", "answers", "views"]} />
                <BasicSelect placeholder={"Filter by"} choices={["Accepted", "Not Accepted", "No Answer"]} />
                <Box position={"relative"} left={300}>
                    <Button variant="contained" component={Link} to="/AskQuestion">
                        Ask a Question
                    </Button>
                </Box>
            </Toolbar>
            <Box>
                {Threads.map((thread: Thread) => (
                    <ThreadCard thread={thread} key={thread.id} />
                ))}
            </Box>
        </Box>
    );
};

export default ThreadList;
