import UserContext from "../../contexts/UserContext";

import React, { useContext, useState } from "react";
import { Box, Stack, Typography, IconButton, Icon } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DoneIcon from "@mui/icons-material/Done";

// Props for VoteDisplay
type Props = {
    votes: number;
    accepted: boolean;
    handleVoteChange: (change: number) => void;
    userVote: number;
    authorID: number;
};

const VoteDisplay: React.FC<Props> = ({ votes, accepted, handleVoteChange, userVote, authorID }) => {
    // eslint-disable-next-line
    const { user, setUser } = useContext(UserContext);
    const [currentVote, setCurrentVote] = useState(userVote);

    function handleStatefulVoteChange(change: number) {
        if (user.id === -1) {
            // check if user signed in
            alert("please sign in to vote");
            return;
        } else if (user.id === authorID) {
            // check if user is author
            alert("you cannot vote for your own post");
            return;
        }

        // reverse last vote if already voted
        if (currentVote === 0) {
            handleVoteChange(change);
            setCurrentVote(change);
        } else {
            handleVoteChange(-currentVote);
            setCurrentVote(0);
        }
    }

    return (
        <Stack direction={"column"} padding={2}>
            <IconButton aria-label="upvote" onClick={() => handleStatefulVoteChange(1)}>
                <KeyboardArrowUpIcon />
            </IconButton>
            <Typography
                variant="h5"
                align="center"
                color={currentVote > 0 ? "#00AA00" : currentVote < 0 ? "#AA0000" : "#555555"}
            >
                {votes}
            </Typography>
            <IconButton aria-label="downvote" onClick={() => handleStatefulVoteChange(-1)}>
                <KeyboardArrowDownIcon />
            </IconButton>
            <Box position={"relative"} left={10}>
                {accepted ? (
                    <Icon>
                        <DoneIcon style={{ color: "green" }} />
                    </Icon>
                ) : null}
            </Box>
        </Stack>
    );
};

export default VoteDisplay;
