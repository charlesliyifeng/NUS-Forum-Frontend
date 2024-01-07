import { getUser, deleteUser } from "../../lib/api/user";
import getUserID from "../../lib/helper/get_url_id";
import DeleteForm from "../../components/DeleteForm";
import { User, newUser } from "../../types/User";
import UserContext from "../../contexts/UserContext";

import React, { useContext, useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";

const DeleteUser: React.FC = () => {
    const navigate = useNavigate();
    const targetUserID = getUserID();
    // eslint-disable-next-line
    const { user, setUser } = useContext(UserContext);
    const [targetUser, setTargetUser] = useState<User>(newUser());

    // get question details from backend
    useEffect(() => {
        getUser(targetUserID).then((data) => {
            if (data) {
                setTargetUser(data);
            } else {
                //handle not found
                navigate("/404");
            }
        });
    }, []);

    // function to handle deletion of user
    const handleDelete = async (id: number) => {
        try {
            // Delete the user from API
            await deleteUser(id);
        } catch (error) {
            console.error(error);
        }
    };

    function handleSubmit() {
        // update backend
        handleDelete(targetUserID);

        // sign out if targetUser is current user
        if (targetUserID === user.id) {
            setUser(newUser());
            sessionStorage.removeItem("token");
            console.log("signed out");
        }

        // back to home page
        navigate("/");
    }

    if (targetUser.id === -1) {
        return <div></div>;
    }

    // check if user is owner of account
    if (user.id !== targetUserID) {
        return <Navigate replace to="/access_denied" />;
    }

    return <DeleteForm handleSubmit={handleSubmit} subjectType="account" />;
};

export default DeleteUser;
