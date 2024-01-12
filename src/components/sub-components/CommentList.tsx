import { Comment } from "../../types/Comment";

import React from "react";
// import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Divider } from "@mui/material";

// Props for CommentList
type Props = {
    comments: Comment[];
};

const CommentList: React.FC<Props> = ({ comments }) => {
    return (
        <Stack direction={"column"} spacing={1} paddingTop={2}>
            {comments.map((comment: Comment) => (
                <div key={comment.commentID}>
                    <Typography variant="subtitle1" fontSize={12}>
                        {comment.body} - {comment.author.name} at {comment.createdAt}
                    </Typography>
                    <Divider />
                </div>
            ))}
        </Stack>
    );
};

export default CommentList;
