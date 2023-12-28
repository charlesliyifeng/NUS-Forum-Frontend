import VoteDisplay from "../VoteDisplay";
import EditBar from "../EditBar";
import Answer from "../../types/Answer";

import React from "react";
import { Box, Card, CardContent, Typography, Divider } from "@mui/material";

type Props = {
    answer: Answer;
    handleVoteChange: (answerID: string, change: number) => void;
};

const AnswerItem: React.FC<Props> = ({ answer, handleVoteChange }) => {
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
                                by {answer.author} on {answer.timestamp.toLocaleString()}
                            </Typography>
                            <Divider />
                            <Typography p={1} minHeight="7vw">
                                {answer.body}
                            </Typography>
                            <EditBar />
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default AnswerItem;