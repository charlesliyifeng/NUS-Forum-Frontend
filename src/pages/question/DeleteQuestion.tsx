import DeleteForm from "../../components/DeleteForm";
import { Question, newQuestion } from "../../types/Question";
import { getQuestionDetail, deleteQuestion } from "../../lib/api/question";
import getQuestionID from "../../lib/helper/get_url_id";
import UserIdContext from "../../contexts/UserIdContext";

import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Navigate } from "react-router-dom";

const DeleteQuestion: React.FC = () => {
    const navigate = useNavigate();
    const questionID: number = getQuestionID();
    // eslint-disable-next-line
    const { userID, setUserID } = useContext(UserIdContext);
    const [question, setQuestion] = useState<Question>(newQuestion());

    // get question details from backend
    useEffect(() => {
        getQuestionDetail(questionID).then((data) => {
            if (data) {
                setQuestion(data);
            } else {
                //handle not found
                navigate("/404");
            }
        });
    }, []);

    // function to handle deletion of question
    const handleDelete = async (id: number) => {
        try {
            // Delete the question from API
            await deleteQuestion(id);
        } catch (error) {
            console.error(error);
        }
    };

    function handleSubmit() {
        // update backend
        handleDelete(questionID);
        // back to questions
        navigate("/question");
    }

    if (question.id === -1) {
        return <div></div>;
    }

    // check if user is author
    if (userID !== question.author.id) {
        return <Navigate replace to="/access_denied" />;
    }

    return <DeleteForm handleSubmit={handleSubmit} subjectType="question" />;
};

export default DeleteQuestion;
