import Item from "./Item";
import Thread from "../types/Thread";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import { Link } from "react-router-dom";
import React from "react";

// styles
const cardStyle = {
    display: "flex",
    width: "100%",
    height: "15vw",
};

// helper functions to format views
function formatViews(views: number): string {
    const postfix: string[] = ["", "k", "M", "B"];
    let index: number = 0;
    while (views >= 1000) {
        views = Math.floor(views / 1000);
        index++;
    }
    return String(views) + postfix[index];
}

// props for threadcard
type Props = {
    thread: Thread;
    handleThreadClick: (thread: Thread) => void;
};

const ThreadCard: React.FC<Props> = ({ thread, handleThreadClick }) => {
    return (
        <Box padding={1}>
            <Card variant="outlined" style={cardStyle}>
                <CardContent>
                    <Box display={"flex"} flexDirection={"column"}>
                        <Typography variant="h5" component="div">
                            <Link to="/thread/1" className="link" onClick={() => handleThreadClick(thread)}>
                                {thread.title}
                            </Link>
                        </Typography>
                        <Typography color="text-secondary">
                            by {thread.author} on {thread.created_at}
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
                        <Stack direction="row" spacing={1} paddingTop={2}>
                            {thread.tags.map((tag: string) => (
                                <Item sx={{ backgroundColor: "#777", color: "#fff" }} key={tag}>
                                    {tag}
                                </Item>
                            ))}
                        </Stack>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default ThreadCard;
