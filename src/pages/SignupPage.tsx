import SignUp from "../components/SignUp";
import UserIdContext from "../contexts/UserIdContext";

import React, { useContext } from "react";
import { Navigate } from "react-router-dom";

const SignupPage: React.FC = () => {
    // eslint-disable-next-line
    const { userID, setUserID } = useContext(UserIdContext);

    // if signed in
    if (userID !== -1) {
        return <Navigate replace to="/" />;
    }

    return <SignUp />;
};

export default SignupPage;
