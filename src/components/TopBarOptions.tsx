import UserIdContext from "../contexts/UserIdContext";
import { deleteSession } from "../lib/api/session";

import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const BootstrapButton = styled(Button)({
    fontSize: 16,
    padding: "6px 12px",
    border: "1px solid",
    lineHeight: 1.5,
    borderColor: "#FFFFFF",
    color: "#FFFFFF",

    "&:hover": {
        borderColor: "#FFFFFF",
        boxShadow: "none",
    },
    "&:active": {
        boxShadow: "none",
        borderColor: "#FFFFFF",
    },
});

// Button for sign in / sign out
const SigninButton: React.FC = () => {
    const navigate = useNavigate();
    const { userID, setUserID } = useContext(UserIdContext);

    async function handleSigninButton() {
        if (userID === -1) {
            // sign in
            navigate("/signin");
        } else {
            // sign out
            try {
                await deleteSession(userID);
                setUserID(-1);
                sessionStorage.removeItem("token");
                console.log("signed out");
                navigate("/");
            } catch (error) {
                console.error(error);
            }
        }
    }

    return (
        <BootstrapButton variant="outlined" onClick={handleSigninButton}>
            {userID === -1 ? "Sign in" : "Sign out"}
        </BootstrapButton>
    );
};

const TopBarOptions: React.FC = () => {
    return (
        <Box position={"relative"} left={300}>
            <SigninButton />
        </Box>
    );
};

export default TopBarOptions;
