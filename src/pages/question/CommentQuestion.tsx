import { Question, newQuestion } from "../../types/Question";
import { getQuestionDetail } from "../../lib/api/question";
import { newComment } from "../../types/Comment";
import getQuestionID from "../../lib/helper/get_url_id";
import UserContext from "../../contexts/UserContext";
import { createComment } from "../../lib/api/comment";
import FormSubmitControl from "../../components/sub-components/FormSubmitControl";

import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

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
