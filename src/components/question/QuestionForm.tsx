import TagInput from "../TagInput";
import { Question } from "../../types/Question";

import React from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

type Props = {
    question: Question;
    setQuestion: React.Dispatch<React.SetStateAction<Question>>;
    handleSubmit: () => void;
    buttonType: string;
};

const QuestionForm: React.FC<Props> = ({ question, setQuestion, handleSubmit, buttonType }) => {
    // Function to handle changes in input fields
    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        // Update the state with the new value for the corresponding input field
        setQuestion((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    function setTags(newTags: string[]) {
        setQuestion((prev) => ({
            ...prev,
            tags: newTags,
        }));
    }

    return (
        <>
            <Typography variant="h6" display="block" padding={1}>
                Title
            </Typography>
            <TextField
                id="title"
                name="title"
                required
                placeholder="Enter your question here"
                onChange={handleChange}
                value={question.title}
            />

            <Typography variant="h6" display="block" padding={1}>
                Problem Details
            </Typography>
            <TextField
                id="body"
                name="body"
                multiline
                required
                rows={8}
                placeholder="Describe the details of your question here"
                onChange={handleChange}
                value={question.body}
            />

            <Typography variant="h6" display="block" padding={1}>
                Tags
            </Typography>
            <TagInput tags={question.tags} setTags={setTags} />
            <Box display={"flex"} flexDirection={"row"} padding={1}>
                <Box paddingRight={2}>
                    <Button
                        variant="contained"
                        onClick={handleSubmit}
                        color={buttonType === "Update" ? "secondary" : "primary"}
                    >
                        {buttonType}
                    </Button>
                </Box>
                <Box>
                    <Button variant="outlined" component={Link} to=".." relative="path">
                        Cancel
                    </Button>
                </Box>
            </Box>
        </>
    );
};

export default QuestionForm;
