import { UserDetails, newUserDetails } from "../../types/User";
import { getUserDetails } from "../../lib/api/user";
import EditBar from "../../components/sub-components/EditBar";
import UserAvatar from "../../components/sub-components/UserAvatar";
import getUserID from "../../lib/helper/get_url_id";
import UserContext from "../../contexts/UserContext";

import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

const UserProfile: React.FC = () => {
    // eslint-disable-next-line
    const { user, setUser } = useContext(UserContext);
    const targetUserID = getUserID();
    const navigate = useNavigate();
    const [targetUser, setTargetUser] = useState<UserDetails>(newUserDetails());

    // get user profile from backend
    useEffect(() => {
        getUserDetails(targetUserID).then((data) => {
            if (data) {
                setTargetUser(data);
            } else {
                // handle not found
                navigate("/404");
            }
        });
    }, []);

    if (targetUser.id === -1) {
        return <div></div>;
    }

    return (
        <Box className="centerBox" sx={{ flexGrow: 1, p: 3 }} top={80} m={2}>
            <Typography variant="h4" paddingBottom={2}>
                {targetUser.id === user.id ? "Your Profile" : "User Profile"}
            </Typography>
            <Divider />
            <Box paddingTop={5} paddingBottom={5}>
                <Stack direction={"row"} spacing={5}>
                    <UserAvatar userID={targetUser.id} username={targetUser.name} fontSize={100} />
                    <Divider orientation="vertical" flexItem />
                    <Stack direction="column" spacing={1}>
                        <Typography variant="h5">{targetUser.name}</Typography>
                        <Typography variant="body1">Joined on {targetUser.createdAt.split(" ")[0]}.</Typography>
                    </Stack>
                </Stack>
            </Box>
            <Divider />
            <EditBar
                subjectType="user"
                id={targetUserID}
                allowEdit={user.id === targetUserID}
                allowDelete={user.id === targetUserID}
            />
        </Box>
    );
};

export default UserProfile;
