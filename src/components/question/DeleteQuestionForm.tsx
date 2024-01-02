import DeleteForm from "../DeleteForm";
import { deleteQuestion } from "../../lib/api/question";
import getQuestionID from "../../lib/helper/get_url_id";

import React from "react";
import { useNavigate } from "react-router-dom";

const DeleteQuestionForm: React.FC = () => {
    // function to handle deletion of question
    const handleDelete = async (id: number) => {
        try {
            // Delete the question from API
            await deleteQuestion(id);
        } catch (error) {
            console.error(error);
        }
    };

    const navigate = useNavigate();
    const questionID: number = getQuestionID();

    function handleSubmit() {
        // update backend
        handleDelete(questionID);
        // back to questions
        navigate("/question");
    }

    return <DeleteForm handleSubmit={handleSubmit} subjectType="question" />;
};

export default DeleteQuestionForm;
