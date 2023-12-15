import Thread from "../types/Thread";
import React from "react";
import { Box, List, ListItem, ListItemText } from "@mui/material";
//import { Link } from "react-router-dom";

const ThreadList: React.FC = () => {
    // get threads
    const Threads: Thread[] = [];
    Threads[0] = { id: "1", body: "hello", author: "Bob", timestamp: new Date(2022, 10, 28, 10, 33, 30), votes: 5 };
    Threads[1] = {
        id: "2",
        body: "Testing testing",
        author: "Allen",
        timestamp: new Date(2022, 10, 28, 10, 33, 30),
        votes: 2,
    };

    return (
        <Box position={"fixed"} sx={{ flexGrow: 1, p: 3 }}>
            <h2>{"Top Questions"}</h2>
            <Box sx={{ overflow: "auto" }}>
                <List>
                    {Threads.map((thread: Thread) => (
                        <ListItem key={thread.id} disablePadding>
                            <ListItemText primary="Hello" color="Black" />
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Box>
    );
};

export default ThreadList;
