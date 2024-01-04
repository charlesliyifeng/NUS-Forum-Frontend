import { deleteAnswer, getAnswerDetail } from "../../lib/api/answer";
import getAnswerID from "../../lib/helper/get_url_id";
import DeleteForm from "../DeleteForm";
import { Answer, newAnswer } from "../../types/Answer";
import UserIdContext from "../../contexts/UserIdContext";

import React, { useContext, useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";

const DeleteQuestionForm: React.FC = () => {
    const navigate = useNavigate();
    const answerID: number = getAnswerID();
    // eslint-disable-next-line
    const { userID, setUserID } = useContext(UserIdContext);
    const [answer, setAnswer] = useState<Answer>(newAnswer());

    // get question details from backend
    useEffect(() => {
        getAnswerDetail(answerID).then((data) => {
            if (data) {
                setAnswer(data);
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
            await deleteAnswer(id);
        } catch (error) {
            console.error(error);
        }
    };

    function handleSubmit() {
        // update backend
        handleDelete(answerID);
        // back to question
        navigate(-1);
    }

    if (answer.answerID === -1) {
        return <div></div>;
    }

    // check if user is author
    if (userID !== answer.author.id) {
        return <Navigate replace to="/access_denied" />;
    }

    return <DeleteForm handleSubmit={handleSubmit} subjectType="answer" />;
};

export default DeleteQuestionForm;
