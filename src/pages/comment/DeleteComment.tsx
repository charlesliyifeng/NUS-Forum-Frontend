import { deleteComment, getCommentDetail } from "../../lib/api/comment";
import getCommentID from "../../lib/helper/get_url_id";
import DeleteForm from "../../components/DeleteForm";
import { Comment, newComment } from "../../types/Comment";
import UserContext from "../../contexts/UserContext";

import React, { useContext, useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";

const DeleteComment: React.FC = () => {
    const navigate = useNavigate();
    const commentID = getCommentID();
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

    // function to handle deletion of answer
    const handleDelete = async (id: number) => {
        try {
            // Delete the answer from API
            await deleteComment(id);
        } catch (error) {
            console.error(error);
        }
    };

    function handleSubmit() {
        // update backend
        handleDelete(commentID);
        // back to question
        navigate(-1);
    }

    if (comment.commentID === -1) {
        return <div></div>;
    }

    // check if user is author
    if (user.id !== comment.author.id) {
        return <Navigate replace to="/access_denied" />;
    }

    return <DeleteForm handleSubmit={handleSubmit} subjectType="comment" />;
};

export default DeleteComment;
