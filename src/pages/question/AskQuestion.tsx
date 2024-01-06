import QuestionForm from "../../components/question/QuestionForm";
import { Question, newQuestion } from "../../types/Question";
import { createQuestion } from "../../lib/api/question";
import UserIdContext from "../../contexts/UserIdContext";

import React, { useContext, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const AskQuestion: React.FC = () => {
    // eslint-disable-next-line
    const { userID, setUserID } = useContext(UserIdContext);
    const [question, setQuestion] = useState<Question>(newQuestion(userID));
    const navigate = useNavigate();

    // if not signed in
    if (userID === -1) {
        return <Navigate replace to="/signin" />;
    }

    async function handleSubmit() {
        if (!question!.title) {
            alert("Your title cannot be empty");
            return;
        }
        if (!question!.body) {
            alert("Your body cannot be empty");
            return;
        }

        try {
            // create new question through API
            await createQuestion(question!);
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
