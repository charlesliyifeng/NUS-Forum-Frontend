import ThreadCard from "./ThreadCard";
import BasicSelect from "./BasicSelect";
import Thread from "../types/Thread";
import React, { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

import axios from "axios";

const API_URL = "http://localhost:3000/api/v1/questions";

function getAPIData() {
    return axios.get(API_URL).then((response) => response.data);
}

// eslint-disable-next-line
function formatData(data: any[]): Thread[] {
    const threads: Thread[] = [];
    data.forEach((x) => {
        const t: Thread = {
            id: x.id,
            title: x.title,
            body: x.body,
            author: x.author,
            created_at: x.created_at,
            updated_at: x.updated_at,
            votes: x.votes,
            answers: x.answers,
            accepted: !!x.accepted,
            views: x.views,
            tags: x.tags.split(","),
        };
        threads.push(t);
    });
    return threads;
}

// props for ThreadList
type Props = {
    handleThreadClick: (thread: Thread) => void;
};

const ThreadList: React.FC<Props> = ({ handleThreadClick }) => {
    const [threads, setThreads] = useState<Thread[]>([]);

    useEffect(() => {
        let mounted = true;
        getAPIData().then((items) => {
            if (mounted) {
                console.log(items);
                setThreads(formatData(items));
            }
        });
        return () => {
            mounted = false;
        };
    }, []);

    /*
    Threads[0] = {
        id: "1",
        title: "hello",
        body: "yes, this is the body!",
        author: "Bob",
        timestamp: new Date(2022, 10, 28, 10, 33, 30),
        votes: 5,
        answers: 1,
        accepted: false,
        views: 1000000000,
        tags: ["python", "testing"],
    };
    Threads[1] = {
        id: "2",
        title: "guess what",
        body: "testing is the worst thing in the world.",
        author: "Cathy",
        timestamp: new Date(2022, 10, 28, 10, 33, 30),
        votes: 2,
        answers: 2,
        accepted: true,
        views: 1000,
        tags: ["C++", "testing"],
    };
    Threads[2] = {
        id: "3",
        title: "what is going on?",
        body: "hello hello",
        author: "Alice",
        timestamp: new Date(2020, 12, 28, 10, 33, 2),
        votes: 1,
        answers: 1,
        accepted: false,
        views: 100,
        tags: ["games", "NUS"],
    };
    */

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
                    <ThreadCard thread={thread} handleThreadClick={handleThreadClick} key={thread.id} />
                ))}
            </Box>
        </Box>
    );
};

export default ThreadList;
