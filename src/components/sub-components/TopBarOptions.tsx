import UserAvatar from "./UserAvatar";
import UserContext from "../../contexts/UserContext";
import { deleteSession } from "../../lib/api/session";
import { User, newUser } from "../../types/User";

import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

// button style signin/signout/signup
const BootstrapButton = styled(Button)({
    fontSize: 16,
    padding: "6px 12px",
    border: "1px solid",
    lineHeight: 1.5,
    borderColor: "#FFFFFF",
    color: "#FFFFFF",

    "&:hover": {
        color: "#FFFFFF",
        borderColor: "#FFFFFF",
        boxShadow: "none",
    },
    "&:active": {
        color: "#FFFFFF",
        boxShadow: "none",
        borderColor: "#FFFFFF",
    },
});

const SigninButton: React.FC = () => {
    return (
        <BootstrapButton variant="outlined" href="/signin">
            Sign in
        </BootstrapButton>
    );
};

// props for sign out button
type SignoutButtonProps = {
    user: User;
    setUser: React.Dispatch<React.SetStateAction<User>>;
};

const SignoutButton: React.FC<SignoutButtonProps> = ({ user, setUser }) => {
    const navigate = useNavigate();

    async function handleButton() {
        // sign out
        try {
            await deleteSession(user.id);
            setUser(newUser());
            sessionStorage.removeItem("token");
            console.log("signed out");
            navigate("/");
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <BootstrapButton variant="outlined" onClick={handleButton}>
            Sign out
        </BootstrapButton>
    );
};

const SignupButton: React.FC = () => {
    return (
        <BootstrapButton variant="outlined" href="/signup" sx={{ backgroundColor: "white", color: "#2196f3" }}>
            Sign up
        </BootstrapButton>
    );
};

const TopBarOptions: React.FC = () => {
    const { user, setUser } = useContext(UserContext);

    if (user.id === -1) {
        // display signin and signup if not signed in
        return (
            <Stack position={"relative"} left={250} direction={"row"} spacing={1}>
                <SigninButton />
                <SignupButton />
            </Stack>
        );
    } else {
        // display avatar and sign out if signed in
        return (
            <Stack position={"relative"} left={250} direction={"row"} spacing={5}>
                <SignoutButton user={user} setUser={setUser} />
                <UserAvatar userID={user.id} username={user.name} />
            </Stack>
        );
    }
};

export default TopBarOptions;
