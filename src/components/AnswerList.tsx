import VoteDisplay from "./VoteDisplay";
import Thread from "../types/Thread";
import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";

// props for AnswerList
type Props = {
    thread: Thread;
    handleVoteChange: (change: number) => void;
};

const AnswerList: React.FC<Props> = ({ thread, handleVoteChange }) => {
    return (
        <Box className="centerBox" sx={{ flexGrow: 1, p: 3 }} top={80}>
            <Card variant="outlined">
                <CardContent>
                    <Box display={"flex"} flexDirection={"row"}>
                        <VoteDisplay
                            votes={thread.votes}
                            accepted={thread.accepted}
                            handleVoteChange={handleVoteChange}
                        />
                        <Box display={"flex"} flexDirection={"column"} width="100%">
                            <Typography variant="h5" p={0}>
                                {thread.title}
                            </Typography>
                            <Typography>
                                by {thread.author} on {thread.timestamp.toLocaleString()}
                            </Typography>
                            <Divider />
                            <Typography p={1}>{thread.body}</Typography>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default AnswerList;
