import UserIdContext from "../../contexts/UserIdContext";
import { deleteSession } from "../../lib/api/session";
import { getUser } from "../../lib/api/user";

import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";

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
    userID: number;
    setUserID: React.Dispatch<React.SetStateAction<number>>;
};

const SignoutButton: React.FC<SignoutButtonProps> = ({ userID, setUserID }) => {
    const navigate = useNavigate();

    async function handleButton() {
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

// helper functions to style UserAvatar
function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

function stringAvatar(name: string) {
    const names = name.split(" ");
    // create initials
    let initials: string = "";
    let i = 0;
    while (i < names.length && initials.length < 2) {
        const char = names[i];
        if (char) {
            initials += char[0].toUpperCase();
        }
        i++;
    }

    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: initials,
    };
}

// props for UserAvatar
type UserAvatarProps = {
    userID: number;
};

const UserAvatar: React.FC<UserAvatarProps> = ({ userID }) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    useEffect(() => {
        // get user profile from API
        getUser(userID).then((data) => {
            if (data) {
                console.log(data.name);
                setUsername(data.name);
            }
        });
    }, []);

    function handleAvatarClick() {
        navigate(`/`);
    }

    // get initial of name
    return <Avatar {...stringAvatar(username)} onClick={handleAvatarClick} />;
};

const TopBarOptions: React.FC = () => {
    const { userID, setUserID } = useContext(UserIdContext);

    if (userID === -1) {
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
                <SignoutButton userID={userID} setUserID={setUserID} />
                <UserAvatar userID={userID} />
            </Stack>
        );
    }
};

export default TopBarOptions;
