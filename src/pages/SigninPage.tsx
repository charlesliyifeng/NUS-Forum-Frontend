import SignIn from "../components/SignIn";
import UserIdContext from "../contexts/UserIdContext";

import React, { useContext } from "react";
import { Navigate } from "react-router-dom";

const SigninPage: React.FC = () => {
    // eslint-disable-next-line
    const { userID, setUserID } = useContext(UserIdContext);

    // if signed in
    if (userID !== -1) {
        return <Navigate replace to="/" />;
    }

    return <SignIn />;
};

export default SigninPage;
