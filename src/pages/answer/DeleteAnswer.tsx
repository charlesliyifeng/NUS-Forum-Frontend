import { deleteAnswer, getAnswerDetail } from "../../lib/api/answer";
import getAnswerID from "../../lib/helper/get_url_id";
import DeleteForm from "../../components/DeleteForm";
import { Answer, newAnswer } from "../../types/Answer";
import UserContext from "../../contexts/UserContext";

import React, { useContext, useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";

const DeleteAnswer: React.FC = () => {
    const navigate = useNavigate();
    const answerID = getAnswerID();
    // eslint-disable-next-line
    const { user, setUser } = useContext(UserContext);
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
    if (user.id !== answer.author.id) {
        return <Navigate replace to="/access_denied" />;
    }

    return <DeleteForm handleSubmit={handleSubmit} subjectType="answer" />;
};

export default DeleteAnswer;
