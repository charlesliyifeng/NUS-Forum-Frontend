import ThreadCard from "./ThreadCard";
import BasicSelect from "./BasicSelect";
import Thread from "../types/Thread";
import { getThreadList } from "../lib/api/thread";
import React, { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const ThreadList: React.FC = () => {
    const [threads, setThreads] = useState<Thread[]>([]);

    // Fetch the list of threads from the API when the component mounts
    useEffect(() => {
        getThreadList().then((data) => {
            if (data) {
                setThreads(data);
            }
        });
    }, []);

    return (
        <Box className="centerBox" sx={{ flexGrow: 1, p: 3 }} top={80}>
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
                {threads.map((thread: Thread) => (
                    <ThreadCard thread={thread} key={thread.id} />
                ))}
            </Box>
        </Box>
    );
};

export default ThreadList;
