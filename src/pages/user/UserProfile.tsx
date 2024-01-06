import { User, newUser } from "../../types/User";
import { getUser } from "../../lib/api/user";
import EditBar from "../../components/sub-components/EditBar";
import getUserID from "../../lib/helper/get_url_id";
import UserIdContext from "../../contexts/UserIdContext";

import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";

const UserProfile: React.FC = () => {
    // eslint-disable-next-line
    const { userID, setUserID } = useContext(UserIdContext);
    const targetUserID = getUserID();
    const navigate = useNavigate();
    const [targetUser, setTargetUser] = useState<User>(newUser());

    // get user profile from backend
    useEffect(() => {
        getUser(targetUserID).then((data) => {
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
            <h2>{targetUser.name}</h2>
            <EditBar
                subjectType="user"
                id={targetUserID}
                allowEdit={userID === targetUserID}
                allowDelete={userID === targetUserID}
            />
        </Box>
    );
};

export default UserProfile;
