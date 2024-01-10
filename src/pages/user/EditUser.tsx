import { getUserDetails, updateUser } from "../../lib/api/user";
import { UserDetails, newUserDetails, newUser } from "../../types/User";
import getUserID from "../../lib/helper/get_url_id";
import UserContext from "../../contexts/UserContext";
import validateInput from "../../lib/helper/validator";
import { createSession, createSessionParams } from "../../lib/api/session";
import { signin, signout } from "../../lib/helper/tokenManager";

import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const EditUser: React.FC = () => {
    const targetUserID = getUserID();
    const navigate = useNavigate();
    // eslint-disable-next-line
    const { user, setUser } = useContext(UserContext);
    const [targetUser, setTargetUser] = useState<UserDetails>(newUserDetails());
    const [confirmPassword, setConfirmPassword] = useState("");

    // get user details from backend
    useEffect(() => {
        getUserDetails(targetUserID).then((data) => {
            if (data) {
                setTargetUser(data);
            } else {
                //handle not found
                navigate("/404");
            }
        });
    }, []);

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        // handle Change for input element
        const { name, value } = event.target;
        // Update the state with the new value for the corresponding input field
        setTargetUser((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    async function handleSubmit() {
        if (!validateInput(targetUser, confirmPassword)) {
            return;
        }

        // update backend
        try {
            await updateUser(targetUserID, targetUser);

            // if target user is current user, sign in again
            const params: createSessionParams = {
                email: targetUser.email,
                password: targetUser.password,
            };

            if (targetUserID === user.id) {
                // create session from API
                try {
                    const response = await createSession(params);
                    // set userID
                    setUser(newUser(response.data.userId, response.data.username));
                    console.log("signed in");
                    // store token
                    signin(response.data.authToken, false);
                    // navigate back
                    navigate(-1);
                } catch (error) {
                    console.error(error);
                    alert("An unknown error occured, please signin");
                    setUser(newUser());
                    signout();
                    console.log("signed out");
                    navigate("/");
                }
            }
        } catch (error) {
            console.error(error);
        }
    }

    if (targetUser.id === -1) {
        return <div></div>;
    }

    // check if user is owner
    if (user.id !== targetUserID) {
        return <Navigate replace to="/access_denied" />;
    }

    return (
        <Box className="centerBox" sx={{ flexGrow: 1, p: 3, "& .MuiTextField-root": { m: 1, width: "50ch" } }} top={80}>
            <Typography variant="h4" padding={2}>
                Edit your profile
            </Typography>
            <Divider />
            <Stack padding={3} direction={"column"} spacing={1}>
                <Box display={"flex"} flexDirection={"row"}>
                    <Typography variant="body1" p={2} minWidth={200}>
                        Username
                    </Typography>
                    <TextField
                        id="name"
                        name="name"
                        required
                        onChange={handleChange}
                        value={targetUser.name}
                        size="small"
                    />
                </Box>
                <Box display={"flex"} flexDirection={"row"}>
                    <Typography variant="body1" p={2} minWidth={200}>
                        Email
                    </Typography>
                    <TextField
                        id="email"
                        name="email"
                        required
                        onChange={handleChange}
                        value={targetUser.email}
                        size="small"
                    />
                </Box>
                <Box display={"flex"} flexDirection={"row"}>
                    <Typography variant="body1" p={2} minWidth={200}>
                        New Password
                    </Typography>
                    <TextField
                        id="password"
                        name="password"
                        type="password"
                        required
                        onChange={handleChange}
                        value={targetUser.password}
                        size="small"
                    />
                </Box>
                <Box display={"flex"} flexDirection={"row"}>
                    <Typography variant="body1" p={2} minWidth={200}>
                        Confirm New Password
                    </Typography>
                    <TextField
                        id="confirm_password"
                        name="confirm_password"
                        type="password"
                        required
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        value={confirmPassword}
                        size="small"
                    />
                </Box>
            </Stack>
            <Divider />
            <Box padding={1}>
                <Stack direction={"row"} spacing={2}>
                    <Button variant="contained" onClick={handleSubmit} color="secondary">
                        Update
                    </Button>
                    <Button variant="outlined" onClick={() => navigate(-1)}>
                        Cancel
                    </Button>
                </Stack>
            </Box>
        </Box>
    );
};

export default EditUser;
