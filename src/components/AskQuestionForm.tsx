import TagInput from "./TagInput";
import Thread from "../types/Thread";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import React, { useState } from "react";

const AskQuestionForm: React.FC = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState<string[]>([]);

    function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const inputTitle: string = event.target.value;
        setTitle(inputTitle);
    }

    function handleContentChange(event: React.ChangeEvent<HTMLInputElement>) {
        const inputContent: string = event.target.value;
        setContent(inputContent);
    }

    function handleSubmit() {
        const newThread: Thread = {
            id: "999",
            title: title,
            body: content,
            author: "tester",
            timestamp: new Date(),
            votes: 0,
            answers: 0,
            accepted: false,
            views: 0,
            tags: tags,
        };
        newThread;
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
            <TagInput tags={tags} setTags={setTags} />
            <Box padding={1} position="relative" top={10} alignContent="center">
                <Button variant="contained" onClick={handleSubmit}>
                    Submit
                </Button>
            </Box>
        </Box>
    );
};

export default AskQuestionForm;
