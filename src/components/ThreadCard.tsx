import Thread from "../types/Thread";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

import { Link } from "react-router-dom";
import React from "react";

// styles
const cardStyle = {
    display: "flex",
    width: "100%",
    height: "15vw",
};

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: "#000000",
}));

// helper function to format views
function formatViews(views: number): string {
    const postfix: string[] = ["", "k", "M", "B"];
    let index: number = 0;
    while (views >= 1000) {
        views = Math.floor(views / 1000);
        index++;
    }
    return String(views) + postfix[index];
}

type Props = {
    thread: Thread;
};

const ThreadCard: React.FC<Props> = ({ thread }) => {
    return (
        <Box padding={1}>
            <Card variant="outlined" style={cardStyle}>
                <CardContent>
                    <Box display={"flex"} flexDirection={"column"}>
                        <Typography variant="h5" component="div">
                            <Link to="/" className="link">
                                {thread.body}
                            </Link>
                        </Typography>
                        <Typography color="text-secondary">
                            by {thread.author} on {thread.timestamp.toLocaleString()}
                        </Typography>
                        <Stack direction="row" spacing={1}>
                            <Item>votes: {thread.votes}</Item>
                            <Item
                                sx={{
                                    backgroundColor: thread.accepted ? "#00AA00" : "inherit",
                                    color: thread.accepted ? "#FFFFFF" : "#000000",
                                }}
                            >
                                answers: {thread.answers}
                            </Item>
                            <Item>views: {formatViews(thread.views)}</Item>
                        </Stack>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default ThreadCard;
