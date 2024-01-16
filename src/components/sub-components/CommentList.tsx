import { Comment } from "../../types/Comment";
import UserContext from "../../contexts/UserContext";

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Divider } from "@mui/material";

// Props for CommentList
type Props = {
    comments: Comment[];
};

const CommentList: React.FC<Props> = ({ comments }) => {
    // eslint-disable-next-line
    const { user, setUser } = useContext(UserContext);
    return (
        <Stack direction={"column"} spacing={1} paddingTop={2}>
            {comments.map((comment: Comment) => {
                const authorLink = (
                    <Link to={`/user/${comment.author.id}`} className="link">
                        {comment.author.name}
                    </Link>
                );
                return (
                    <div key={comment.commentID}>
                        <Typography variant="subtitle1" fontSize={12}>
                            {comment.body} - {authorLink} at {comment.createdAt}
                        </Typography>
                        {comment.author.id === user.id ? (
                            <Stack direction={"row"} spacing={1}>
                                <Link
                                    className="link"
                                    style={{ fontSize: 12 }}
                                    to={`/comment/${comment.commentID}/edit`}
                                >
                                    Edit
                                </Link>
                                <Link
                                    className="link"
                                    style={{ fontSize: 12 }}
                                    to={`/comment/${comment.commentID}/delete`}
                                >
                                    Delete
                                </Link>
                            </Stack>
                        ) : null}
                        <Divider />
                    </div>
                );
            })}
        </Stack>
    );
};

export default CommentList;
