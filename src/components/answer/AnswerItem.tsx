import VoteDisplay from "../VoteDisplay";
import EditBar from "../EditBar";
import { Answer } from "../../types/Answer";

import React from "react";
import { Box, Card, CardContent, Typography, Divider } from "@mui/material";

type Props = {
    answer: Answer;
    questionAccepted: boolean;
    handleVoteChange: (answerID: number, change: number) => void;
};

const AnswerItem: React.FC<Props> = ({ answer, questionAccepted, handleVoteChange }) => {
    return (
        <Box padding={1}>
            <Card variant="outlined">
                <CardContent>
                    <Box display={"flex"} flexDirection={"row"}>
                        <VoteDisplay
                            votes={answer.votes}
                            accepted={answer.accepted}
                            handleVoteChange={(change: number) => handleVoteChange(answer.answerID, change)}
                        />
                        <Box display={"flex"} flexDirection={"column"} width={"100%"}>
                            <Typography color="text-secondary">
                                by {answer.author} on {answer.createdAt}
                            </Typography>
                            <Divider />
                            <Typography p={1} minHeight="7vw" style={{ whiteSpace: "pre-line" }}>
                                {answer.body}
                            </Typography>
                            <EditBar
                                subjectType="answer"
                                id={answer.answerID}
                                answer={answer}
                                allowEdit
                                allowDelete
                                allowAccept={answer.accepted || !questionAccepted}
                            />
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default AnswerItem;
