import { Comment, newComment } from "../../types/Comment";
import { getCommentDetail, updateComment } from "../../lib/api/comment";
import getCommentID from "../../lib/helper/get_url_id";
import UserContext from "../../contexts/UserContext";
import FormSubmitControl from "../../components/sub-components/FormSubmitControl";

import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

const EditComment: React.FC = () => {
    const commentID = getCommentID();
    const navigate = useNavigate();
    // eslint-disable-next-line
    const { user, setUser } = useContext(UserContext);
    const [comment, setComment] = useState<Comment>(newComment());

    // get question details from backend
    useEffect(() => {
        getCommentDetail(commentID).then((data) => {
            if (data) {
                setComment(data);
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
        setComment((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    async function handleSubmit() {
        if (!comment.body.trim()) {
            alert("Your comment cannot be empty");
            return;
        }
        // update backend
        try {
            await updateComment(commentID, comment);
            // navigate back
            navigate(-1);
        } catch (error) {
            console.error(error);
        }
    }

    if (comment.commentID === -1) {
        return <div></div>;
    }

    // check if user is author
    if (user.id !== comment.author.id) {
        return <Navigate replace to="/access_denied" />;
    }

    return (
        <Box
            className="centerBox"
            sx={{ flexGrow: 1, p: 3, "& .MuiTextField-root": { m: 1, width: "100ch" } }}
            top={80}
        >
            <Typography variant="h4" padding={2}>
                Edit a comment
            </Typography>

            <TextField id="body" name="body" required onChange={handleChange} value={comment.body} />
            <FormSubmitControl buttonText="Update" buttonColor="secondary" handleSubmit={handleSubmit} />
        </Box>
    );
};

export default EditComment;
