import VoteDisplay from "../sub-components/VoteDisplay";
import EditBar from "../sub-components/EditBar";
import CommentList from "../sub-components/CommentList";
import { Answer } from "../../types/Answer";
import { Question } from "../../types/Question";
import UserContext from "../../contexts/UserContext";

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Box, Card, CardContent, Typography, Divider } from "@mui/material";

type Props = {
    answer: Answer;
    question: Question;
    handleVoteChange: (answerID: number, change: number) => void;
};

const AnswerItem: React.FC<Props> = ({ answer, question, handleVoteChange }) => {
    // eslint-disable-next-line
    const { user, setUser } = useContext(UserContext);
    const authorLink = (
        <Link to={`/user/${answer.author.id}`} className="link">
            {answer.author.name}
        </Link>
    );
    return (
        <Box padding={1}>
            <Card variant="outlined">
                <CardContent>
                    <Box display={"flex"} flexDirection={"row"}>
                        <VoteDisplay
                            votes={answer.votes}
                            accepted={answer.accepted}
                            handleVoteChange={(change: number) => handleVoteChange(answer.answerID, change)}
                            userVote={answer.userVote}
                            authorID={answer.author.id}
                        />
                        <Box display={"flex"} flexDirection={"column"} width={"100%"}>
                            <Typography color="text-secondary">
                                by {authorLink} on {answer.createdAt}
                            </Typography>
                            <Divider />
                            <Typography p={1} minHeight="7vw" style={{ whiteSpace: "pre-line" }}>
                                {answer.body}
                            </Typography>
                            <EditBar
                                subjectType="answer"
                                id={answer.answerID}
                                answer={answer}
                                allowEdit={answer.author.id === user.id}
                                allowDelete={answer.author.id === user.id}
                                allowAccept={question.author.id === user.id && (answer.accepted || !question.accepted)}
                                allowComment
                            />
                            <CommentList comments={answer.comments} />
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default AnswerItem;
