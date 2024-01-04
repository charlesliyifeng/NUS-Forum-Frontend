import QuestionForm from "./QuestionForm";
import { Question, newQuestion } from "../../types/Question";
import { getQuestionDetail, updateQuestion } from "../../lib/api/question";
import getQuestionID from "../../lib/helper/get_url_id";
import UserIdContext from "../../contexts/UserIdContext";

import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const EditQuestionForm: React.FC = () => {
    const questionID: number = getQuestionID();
    const navigate = useNavigate();
    // eslint-disable-next-line
    const { userID, setUserID } = useContext(UserIdContext);
    const [question, setQuestion] = useState<Question>(newQuestion());

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
        if (!question.title) {
            alert("Your title cannot be empty");
            return;
        }
        if (!question.body) {
            alert("Your body cannot be empty");
            return;
        }

        // update backend
        try {
            await updateQuestion(questionID, question);
            // navigate back
            navigate(-1);
        } catch (error) {
            console.error(error);
        }
    }

    if (question.id === -1) {
        return <div></div>;
    }

    // check if user is author
    if (userID !== question.author.id) {
        return <Navigate replace to="/access_denied" />;
    }

    return (
        <Box
            className="centerBox"
            sx={{ flexGrow: 1, p: 3, "& .MuiTextField-root": { m: 1, width: "100ch" } }}
            top={80}
        >
            <Typography variant="h4" padding={2}>
                Edit a question
            </Typography>

            <QuestionForm
                question={question}
                setQuestion={setQuestion}
                handleSubmit={handleSubmit}
                buttonType="Update"
            />
        </Box>
    );
};

export default EditQuestionForm;
