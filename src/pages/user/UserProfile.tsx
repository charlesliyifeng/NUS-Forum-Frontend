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
    });

    if (targetUser.id === -1) {
        return <div></div>;
    }

    return (
        <Box className="centerBox" sx={{ flexGrow: 1, p: 3 }} top={80}>
            <Typography variant="h4" padding={2}>
                User Profile
            </Typography>
            <Box>
                <UserAvatar userID={user.id} username={user.name} />
            </Box>
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
