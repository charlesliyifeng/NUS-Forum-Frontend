import { Answer, newAnswer } from "../../types/Answer";
import { getAnswerDetail, updateAnswer } from "../../lib/api/answer";
import getAnswerID from "../../lib/helper/get_url_id";
import UserContext from "../../contexts/UserContext";
import FormSubmitControl from "../../components/sub-components/FormSubmitControl";

import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

const EditAnswer: React.FC = () => {
    const answerID = getAnswerID();
    const navigate = useNavigate();
    // eslint-disable-next-line
    const { user, setUser } = useContext(UserContext);
    const [answer, setAnswer] = useState<Answer>(newAnswer());

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

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        // handle Change for input element
        const { name, value } = event.target;
        // Update the state with the new value for the corresponding input field
        setAnswer((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    async function handleSubmit() {
        if (!answer.body.trim()) {
            alert("Your answer cannot be empty");
            return;
        }

        // update backend
        try {
            await updateAnswer(answerID, answer);
            // navigate back
            navigate(-1);
        } catch (error) {
            console.error(error);
        }
    }

    if (answer.answerID === -1) {
        return <div></div>;
    }

    // check if user is author
    if (user.id !== answer.author.id) {
        return <Navigate replace to="/access_denied" />;
    }

    return (
        <Box
            className="centerBox"
            sx={{ flexGrow: 1, p: 3, "& .MuiTextField-root": { m: 1, width: "100ch" } }}
            top={80}
        >
            <Typography variant="h4" padding={2}>
                Edit an answer
            </Typography>

            <TextField id="body" name="body" multiline required rows={8} onChange={handleChange} value={answer.body} />
            <FormSubmitControl buttonText="Update" buttonColor="secondary" handleSubmit={handleSubmit} />
        </Box>
    );
};

export default EditAnswer;
