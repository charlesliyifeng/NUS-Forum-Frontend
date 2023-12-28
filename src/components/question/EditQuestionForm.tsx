import TagInput from "../TagInput";
import Question from "../../types/Question";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import React, { useState } from "react";
import { Link } from "react-router-dom";

const EditQuestionForm: React.FC = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState<string[]>([]);

    // get question from backend

    function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const inputTitle: string = event.target.value;
        setTitle(inputTitle);
    }

    function handleContentChange(event: React.ChangeEvent<HTMLInputElement>) {
        const inputContent: string = event.target.value;
        setContent(inputContent);
    }

    function handleSubmit() {
        if (!title) {
            alert("Your title cannot be empty");
            return;
        }
        if (!content) {
            alert("Your body cannot be empty");
            return;
        }
        const newQuestion: Question = {
            id: 0,
            title: title,
            body: content,
            author: "tester",
            created_at: "",
            updated_at: "",
            votes: 0,
            answers: 0,
            accepted: false,
            views: 0,
            tags: tags,
        };
        newQuestion;
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

            <Typography variant="h6" display="block" padding={1}>
                Title
            </Typography>
            <TextField id="title" required onChange={handleTitleChange} />

            <Typography variant="h6" display="block" padding={1}>
                Problem Details
            </Typography>
            <TextField id="body" multiline required rows={8} onChange={handleContentChange} />

            <Typography variant="h6" display="block" padding={1}>
                Tags
            </Typography>
            <TagInput tags={tags} setTags={setTags} />
            <Box display={"flex"} flexDirection={"row"} padding={1}>
                <Box paddingRight={2}>
                    <Button variant="contained" onClick={handleSubmit} color="secondary">
                        Update
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

export default EditQuestionForm;
