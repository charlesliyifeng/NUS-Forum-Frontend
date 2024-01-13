import { Question, newQuestion } from "../../types/Question";
import { getQuestionDetail } from "../../lib/api/question";
import { newComment } from "../../types/Comment";
import getQuestionID from "../../lib/helper/get_url_id";
import UserContext from "../../contexts/UserContext";
import { createComment } from "../../lib/api/comment";
import FormSubmitControl from "../../components/sub-components/FormSubmitControl";
import Item from "../../components/sub-components/Item";
import CommentList from "../../components/sub-components/CommentList";

import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";

const CommentQuestion: React.FC = () => {
    const questionID = getQuestionID();
    const navigate = useNavigate();
    // eslint-disable-next-line
    const { user, setUser } = useContext(UserContext);
    const [question, setQuestion] = useState<Question>(newQuestion());
    const [comment, setComment] = useState("");

    // get question details from backend
    useEffect(() => {
        getQuestionDetail(questionID).then((data) => {
            if (data) {
                setQuestion(data);
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
            await createComment(newComment(user.id, comment, questionID, "Question"));
            // navigate back
            navigate(-1);
        } catch (error) {
            console.error(error);
        }
    }

    if (question.id === -1) {
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
                        <Box display={"flex"} flexDirection={"column"} width="100%">
                            <Typography variant="h5" p={0}>
                                {question.title}
                            </Typography>
                            <Typography>
                                by {question.author.name} on {question.createdAt}
                            </Typography>
                            <Stack direction="row" spacing={1} paddingTop={1} paddingBottom={1}>
                                {question.tags.map((tag: string) => (
                                    <Item sx={{ backgroundColor: "#777", color: "#fff" }} key={tag}>
                                        {tag}
                                    </Item>
                                ))}
                            </Stack>
                            <Divider />
                            <Typography p={1} minHeight="3vw" style={{ whiteSpace: "pre-line" }}>
                                {question.body}
                            </Typography>
                            <CommentList comments={question.comments} />
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

export default CommentQuestion;
