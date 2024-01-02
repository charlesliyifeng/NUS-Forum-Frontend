import { Answer, emptyAnswer } from "../../types/Answer";
import { getAnswerDetail, updateAnswer } from "../../lib/api/answer";
import getAnswerID from "../../lib/helper/get_url_id";

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const EditQuestionForm: React.FC = () => {
    const answerID: number = getAnswerID();
    const navigate = useNavigate();
    const [answer, setAnswer] = useState<Answer>(emptyAnswer);

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
        if (!answer.body) {
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

            <Box display={"flex"} flexDirection={"row"} padding={1}>
                <Box paddingRight={2}>
                    <Button variant="contained" onClick={handleSubmit} color="secondary">
                        Update
                    </Button>
                </Box>
                <Box>
                    <Button variant="outlined" onClick={() => navigate(-1)}>
                        Cancel
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default EditQuestionForm;
