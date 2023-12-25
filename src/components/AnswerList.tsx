import VoteDisplay from "./VoteDisplay";
import AnswerItem from "./AnswerItem";
import EditBar from "./EditBar";
import Item from "./Item";
import Thread from "../types/Thread";
import Answer from "../types/Answer";
import React, { useState } from "react";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

// props for AnswerList
type Props = {
    thread: Thread;
    handleThreadVoteChange: (change: number) => void;
};

const AnswerList: React.FC<Props> = ({ thread, handleThreadVoteChange }) => {
    /*
        Structure: 
        - Card containing question title and body
        - AnswerItems
    */

    const answers: Answer[] = [];
    answers[0] = {
        answerID: "1",
        threadID: "1",
        body: "yes, this is the body!",
        author: "Bob1",
        timestamp: new Date(2022, 10, 28, 10, 33, 30),
        votes: 5,
        accepted: false,
    };
    answers[1] = {
        answerID: "2",
        threadID: "1",
        body: "testing is the worst thing in the world.",
        author: "Cat",
        timestamp: new Date(2022, 10, 28, 10, 33, 30),
        votes: 2,
        accepted: true,
    };
    answers[2] = {
        answerID: "3",
        threadID: "1",
        body: "hello hello",
        author: "Alice",
        timestamp: new Date(2020, 12, 28, 10, 33, 2),
        votes: 1,
        accepted: false,
    };

    const [Answers, setAnswers] = useState(fetchAnswers());
    const [userAnswer, setUserAnswer] = useState("");

    function fetchAnswers(): Answer[] {
        // get answers from backend and set as initial state
        const newAnswers = structuredClone(answers);
        return newAnswers;
    }

    function handleUserAnswerChange(event: React.ChangeEvent<HTMLInputElement>) {
        const text: string = event.target.value;
        setUserAnswer(text);
    }

    function handleAnswerVoteChange(answerID: string, change: number) {
        // update vote of target answer
        const newAnswers: Answer[] = [];
        for (let i = 0; i < Answers.length; i++) {
            newAnswers[i] = Answers[i];
            if (Answers[i].answerID === answerID) {
                newAnswers[i].votes += change;
            }
        }
        setAnswers(newAnswers);

        // update backend
    }

    function handleUserAnswerSubmit() {
        if (userAnswer) {
            // update backend
        } else {
            alert("Your answer cannot be empty");
        }
    }

    return (
        <Box className="centerBox" sx={{ flexGrow: 1, p: 3 }} top={80}>
            <Box padding={1}>
                <Card variant="outlined">
                    <CardContent>
                        <Box display={"flex"} flexDirection={"row"}>
                            <VoteDisplay
                                votes={thread.votes}
                                accepted={false}
                                handleVoteChange={handleThreadVoteChange}
                            />
                            <Box display={"flex"} flexDirection={"column"} width="100%">
                                <Typography variant="h5" p={0}>
                                    {thread.title}
                                </Typography>
                                <Typography>
                                    by {thread.author} on {thread.timestamp.toLocaleString()}
                                </Typography>
                                <Stack direction="row" spacing={1} paddingTop={1} paddingBottom={1}>
                                    {thread.tags.map((tag: string) => (
                                        <Item sx={{ backgroundColor: "#777", color: "#fff" }} key={tag}>
                                            {tag}
                                        </Item>
                                    ))}
                                </Stack>
                                <Divider />
                                <Typography p={1} minHeight="3vw">
                                    {thread.body}
                                </Typography>
                                <EditBar />
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
            <Typography variant="h5" padding={2}>
                Answers
            </Typography>
            {Answers.map((answer: Answer) => (
                <AnswerItem answer={answer} handleVoteChange={handleAnswerVoteChange} key={answer.threadID} />
            ))}
            <Typography variant="h5" padding={2}>
                Your Answer
            </Typography>
            <Box padding={1} sx={{ "& .MuiTextField-root": { width: "100ch" } }}>
                <TextField
                    id="body"
                    multiline
                    required
                    rows={8}
                    placeholder="Write your answer here"
                    onChange={handleUserAnswerChange}
                />
                <Box position="relative" top={10} alignContent="center">
                    <Button variant="contained" onClick={handleUserAnswerSubmit}>
                        Post Answer
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default AnswerList;
