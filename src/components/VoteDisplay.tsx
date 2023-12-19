import React, { useState } from "react";
import { Box, Stack, Typography, IconButton, Icon } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DoneIcon from "@mui/icons-material/Done";

// Props for VoteDisplay
type Props = {
    votes: number;
    accepted: boolean;
    handleVoteChange: (change: number) => void;
};

const VoteDisplay: React.FC<Props> = ({ votes, accepted, handleVoteChange }) => {
    const [voted, setVoted] = useState(0);

    // reverse last vote if already voted
    function handleStatefulVoteChange(change: number) {
        if (voted === 0) {
            handleVoteChange(change);
            setVoted(change);
        } else {
            handleVoteChange(-voted);
            setVoted(0);
        }
    }

    return (
        <Stack direction={"column"} padding={2}>
            <IconButton aria-label="upvote" onClick={() => handleStatefulVoteChange(1)}>
                <KeyboardArrowUpIcon />
            </IconButton>
            <Typography variant="h5" align="center" color={voted > 0 ? "#00AA00" : voted < 0 ? "#AA0000" : "#555555"}>
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
