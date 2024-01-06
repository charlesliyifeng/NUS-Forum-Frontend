import VoteDisplay from "../sub-components/VoteDisplay";
import EditBar from "../sub-components/EditBar";
import { Answer } from "../../types/Answer";
import { Question } from "../../types/Question";
import UserIdContext from "../../contexts/UserIdContext";

import React, { useContext } from "react";
import { Box, Card, CardContent, Typography, Divider } from "@mui/material";

type Props = {
    answer: Answer;
    question: Question;
    handleVoteChange: (answerID: number, change: number) => void;
};

const AnswerItem: React.FC<Props> = ({ answer, question, handleVoteChange }) => {
    // eslint-disable-next-line
    const { userID, setUserID } = useContext(UserIdContext);

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
                                by {answer.author.name} on {answer.createdAt}
                            </Typography>
                            <Divider />
                            <Typography p={1} minHeight="7vw" style={{ whiteSpace: "pre-line" }}>
                                {answer.body}
                            </Typography>
                            <EditBar
                                subjectType="answer"
                                id={answer.answerID}
                                answer={answer}
                                allowEdit={answer.author.id === userID}
                                allowDelete={answer.author.id === userID}
                                allowAccept={question.author.id === userID && (answer.accepted || !question.accepted)}
                            />
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default AnswerItem;
