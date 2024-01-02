import { deleteAnswer } from "../../lib/api/answer";
import getAnswerID from "../../lib/helper/get_url_id";
import DeleteForm from "../DeleteForm";

import React from "react";
import { useNavigate } from "react-router-dom";

const DeleteQuestionForm: React.FC = () => {
    // function to handle deletion of answer
    const handleDelete = async (id: number) => {
        try {
            // Delete the answer from API
            await deleteAnswer(id);
        } catch (error) {
            console.error(error);
        }
    };

    const navigate = useNavigate();
    const answerID: number = getAnswerID();

    function handleSubmit() {
        // update backend
        handleDelete(answerID);
        // back to question
        navigate(-1);
    }

    return <DeleteForm handleSubmit={handleSubmit} subjectType="answer" />;
};

export default DeleteQuestionForm;
