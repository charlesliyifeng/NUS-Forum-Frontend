import { Answer, newAnswer } from "../../types/Answer";
import { getAnswerDetail } from "../../lib/api/answer";
import { newComment } from "../../types/Comment";
import getAnswerID from "../../lib/helper/get_url_id";
import UserContext from "../../contexts/UserContext";
import { createComment } from "../../lib/api/comment";
import FormSubmitControl from "../../components/sub-components/FormSubmitControl";
import CommentList from "../../components/sub-components/CommentList";

import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";

const CommentAnswer: React.FC = () => {
    const answerID = getAnswerID();
    const navigate = useNavigate();
    // eslint-disable-next-line
    const { user, setUser } = useContext(UserContext);
    const [answer, setAnswer] = useState<Answer>(newAnswer());
    const [comment, setComment] = useState("");

    // get question details from backend
    useEffect(() => {
        getAnswerDetail(answerID).then((data) => {
            if (data) {
                setAnswer(data);
            } else {
                //handle not found
                navigate("/404");
            }
        });
    }, []);

    async function handleSubmit() {
        if (!comment.trim()) {
            alert("Your comment cannot be empty");
            return;
        }

        // update backend
        try {
            await createComment(newComment(user.id, comment, answerID, "Answer"));
            // navigate back
            navigate(-1);
        } catch (error) {
            console.error(error);
        }
    }

    if (answer.answerID === -1) {
        return <div></div>;
    }

    return (
        <Box
            className="centerBox"
            sx={{ flexGrow: 1, p: 3, "& .MuiTextField-root": { m: 1, width: "100ch" } }}
            top={80}
        >
            <Typography variant="h4" padding={2}>
                Add a comment
            </Typography>

            <Box padding={1}>
                <Card variant="outlined">
                    <CardContent>
                        <Box display={"flex"} flexDirection={"row"}>
                            <Box display={"flex"} flexDirection={"column"} width={"100%"}>
                                <Typography color="text-secondary">
                                    by {answer.author.name} on {answer.createdAt}
                                </Typography>
                                <Divider />
                                <Typography p={1} minHeight="7vw" style={{ whiteSpace: "pre-line" }}>
                                    {answer.body}
                                </Typography>
                                <CommentList comments={answer.comments} />
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            </Box>

            <TextField
                id="comment"
                name="comment"
                placeholder="add your comment here"
                value={comment}
                onChange={(e) => {
                    setComment(e.target.value);
                }}
            />

            <FormSubmitControl buttonText="Submit" buttonColor="primary" handleSubmit={handleSubmit} />
        </Box>
    );
};

export default CommentAnswer;
