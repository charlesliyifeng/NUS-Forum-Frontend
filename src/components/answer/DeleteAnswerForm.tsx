import { deleteAnswer } from "../../lib/api/answer";
import DeleteForm from "../DeleteForm";

import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const DeleteQuestionForm: React.FC = () => {
    function getAnswerID(): number {
        const { id } = useParams();
        if (id) {
            return +id;
        } else {
            return -1;
        }
    }

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
