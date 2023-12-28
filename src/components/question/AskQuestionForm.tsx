import TagInput from "../TagInput";
import { Question, emptyQuestion } from "../../types/Question";
import { createQuestion } from "../../lib/api/question";

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const AskQuestionForm: React.FC = () => {
    const navigate = useNavigate();
    const [question, setQuestion] = useState<Question>(emptyQuestion);

    function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const inputTitle: string = event.target.value;
        const newQuestion: Question = structuredClone(question);
        newQuestion.title = inputTitle;
        setQuestion(newQuestion);
    }

    function handleContentChange(event: React.ChangeEvent<HTMLInputElement>) {
        const inputContent: string = event.target.value;
        const newQuestion: Question = structuredClone(question);
        newQuestion.body = inputContent;
        setQuestion(newQuestion);
    }

    // Function to handle changes in input fields
    function handleChange(event: React.ChangeEvent<HTMLInputElement> | "tags", newTags: string[] = []) {
        // handle Change for input element
        if (event !== "tags") {
            const { name, value } = event.target;
            // Update the state with the new value for the corresponding input field
            setQuestion((prev) => ({
                ...prev,
                [name]: value,
            }));
        } else {
            setQuestion((prev) => ({
                ...prev,
                tags: newTags,
            }));
        }
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

            <Typography variant="h6" display="block" padding={1}>
                Title
            </Typography>
            <TextField id="title" required placeholder="Enter your question here" onChange={handleTitleChange} />

            <Typography variant="h6" display="block" padding={1}>
                Problem Details
            </Typography>
            <TextField
                id="body"
                multiline
                required
                rows={8}
                placeholder="Describe the details of your question here"
                onChange={handleContentChange}
            />

            <Typography variant="h6" display="block" padding={1}>
                Tags
            </Typography>
            <TagInput tags={question.tags} setTags={handleChange} />
            <Box display={"flex"} flexDirection={"row"} padding={1}>
                <Box paddingRight={2}>
                    <Button variant="contained" onClick={handleSubmit}>
                        Submit
                    </Button>
                </Box>
                <Box>
                    <Button variant="outlined" component={Link} to=".." relative="path">
                        Cancel
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default AskQuestionForm;
