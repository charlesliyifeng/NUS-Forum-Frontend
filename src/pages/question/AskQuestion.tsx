import QuestionForm from "../../components/question/QuestionForm";
import { Question, newQuestion } from "../../types/Question";
import { createQuestion } from "../../lib/api/question";
import UserContext from "../../contexts/UserContext";

import React, { useContext, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const AskQuestion: React.FC = () => {
    // eslint-disable-next-line
    const { user, setUser } = useContext(UserContext);
    const [question, setQuestion] = useState<Question>(newQuestion(user.id));
    const navigate = useNavigate();

    // if not signed in
    if (user.id === -1) {
        return <Navigate replace to="/signin" />;
    }

    async function handleSubmit() {
        if (!question.title.trim()) {
            alert("Your title cannot be empty");
            return;
        }
        if (!question.body.trim()) {
            alert("Your body cannot be empty");
            return;
        }

        try {
            // create new question through API
            await createQuestion(question);
            navigate("/question");
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Box
            className="centerBox"
            sx={{ flexGrow: 1, p: 3, "& .MuiTextField-root": { m: 1, width: "100ch" } }}
            top={80}
        >
            <Typography variant="h4" padding={2}>
                Ask a question
            </Typography>

            <QuestionForm
                question={question}
                setQuestion={setQuestion}
                handleSubmit={handleSubmit}
                buttonType="Submit"
            />
        </Box>
    );
};

export default AskQuestion;
