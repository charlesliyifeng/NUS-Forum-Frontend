import AnswerItem from "./AnswerItem";
import VoteDisplay from "../VoteDisplay";
import EditBar from "../EditBar";
import Item from "../Item";
import Question from "../../types/Question";
import Answer from "../../types/Answer";
import { getQuestionDetail } from "../../lib/api/question";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const AnswerList: React.FC = () => {
    /*
        Structure: 
        - Card containing question title and body
        - AnswerItems
        - user answer
    */

    const answers: Answer[] = [];
    answers[0] = {
        answerID: "1",
        questionID: "1",
        body: "yes, this is the body!",
        author: "Bob1",
        timestamp: new Date(2022, 10, 28, 10, 33, 30),
        votes: 5,
        accepted: false,
    };
    answers[1] = {
        answerID: "2",
        questionID: "1",
        body: "testing is the worst thing in the world.",
        author: "Cat",
        timestamp: new Date(2022, 10, 28, 10, 33, 30),
        votes: 2,
        accepted: true,
    };
    answers[2] = {
        answerID: "3",
        questionID: "1",
        body: "hello hello",
        author: "Alice",
        timestamp: new Date(2020, 12, 28, 10, 33, 2),
        votes: 1,
        accepted: false,
    };

    // get question ID from URL
    function getQuestionID(): number {
        const { id } = useParams();
        if (id) {
            return +id;
        } else {
            return -1;
        }
    }

    const questionID: number = getQuestionID();

    const [question, setQuestion] = useState<Question>();
    const [Answers, setAnswers] = useState<Answer[]>(answers);
    const [userAnswer, setUserAnswer] = useState("");

    // Fetch the question from the API when the component mounts
    useEffect(() => {
        getQuestionDetail(questionID).then((data) => {
            if (data) {
                setQuestion(data);
            } else {
                //handle not found
            }
        });
    }, []);

    function handleQuestionVoteChange() {}

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

    if (question === undefined) {
        return <div></div>;
    }

    return (
        <Box className="centerBox" sx={{ flexGrow: 1, p: 3 }} top={80}>
            <Box padding={1}>
                <Card variant="outlined">
                    <CardContent>
                        <Box display={"flex"} flexDirection={"row"}>
                            <VoteDisplay
                                votes={question.votes}
                                accepted={false}
                                handleVoteChange={handleQuestionVoteChange}
                            />
                            <Box display={"flex"} flexDirection={"column"} width="100%">
                                <Typography variant="h5" p={0}>
                                    {question.title}
                                </Typography>
                                <Typography>
                                    by {question.author} on {question.created_at}
                                </Typography>
                                <Stack direction="row" spacing={1} paddingTop={1} paddingBottom={1}>
                                    {question.tags.map((tag: string) => (
                                        <Item sx={{ backgroundColor: "#777", color: "#fff" }} key={tag}>
                                            {tag}
                                        </Item>
                                    ))}
                                </Stack>
                                <Divider />
                                <Typography p={1} minHeight="3vw">
                                    {question.body}
                                </Typography>
                                <EditBar allowEdit={true} allowDelete={true} />
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
            <Typography variant="h5" padding={2}>
                Answers
            </Typography>
            {Answers.map((answer: Answer) => (
                <AnswerItem answer={answer} handleVoteChange={handleAnswerVoteChange} key={answer.answerID} />
            ))}
            <Typography variant="h5" padding={2}>
                Your Answer
            </Typography>
            <Box padding={1} sx={{ "& .MuiTextField-root": { width: "100ch" } }}>
                <TextField
                    id="userAnswer"
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
