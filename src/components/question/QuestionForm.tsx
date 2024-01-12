import TagInput from "../sub-components/TagInput";
import { Question } from "../../types/Question";
import FormSubmitControl from "../sub-components/FormSubmitControl";

import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

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
            <FormSubmitControl
                buttonText={buttonType}
                buttonColor={buttonType === "Update" ? "secondary" : "primary"}
                handleSubmit={handleSubmit}
            />
        </>
    );
};

export default QuestionForm;
