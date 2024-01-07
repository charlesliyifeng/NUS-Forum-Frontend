import { getUserDetails, updateUser } from "../../lib/api/user";
import { UserDetails, newUserDetails, newUser } from "../../types/User";
import getUserID from "../../lib/helper/get_url_id";
import UserContext from "../../contexts/UserContext";

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
        if (!targetUser.name) {
            alert("Your username cannot be empty");
            return;
        }

        // update backend
        try {
            await updateUser(targetUserID, targetUser);
            // if target user is current user, update user global context
            if (targetUserID === user.id) {
                setUser(newUser(targetUser.id, targetUser.name));
            }
            // navigate back
            navigate(-1);
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
            <Box padding={3}>
                <Stack direction={"row"} spacing={2}>
                    <Typography variant="body1" p={2}>
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
                </Stack>
            </Box>
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
