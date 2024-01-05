import Item from "../shared/Item";
import { Question } from "../../types/Question";
import formatViews from "../../lib/helper/formatViews";

import React from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

// styles
const cardStyle = {
    display: "flex",
    width: "100%",
    height: "15vw",
};

// props for questioncard
type Props = {
    question: Question;
};

const QuestionCard: React.FC<Props> = ({ question }) => {
    return (
        <Box padding={1}>
            <Card variant="outlined" style={cardStyle}>
                <CardContent>
                    <Box display={"flex"} flexDirection={"column"}>
                        <Typography variant="h5" component="div">
                            <Link to={`/question/${question.id}`} className="link">
                                {question.title}
                            </Link>
                        </Typography>
                        <Typography color="text-secondary">
                            by {question.author.name} on {question.createdAt}
                        </Typography>
                        <Stack direction="row" spacing={1}>
                            <Item>votes: {question.votes}</Item>
                            <Item
                                sx={{
                                    backgroundColor: question.accepted ? "#00AA00" : "inherit",
                                    color: question.accepted ? "#FFFFFF" : "#000000",
                                }}
                            >
                                answers: {question.answersCount}
                            </Item>
                            <Item>views: {formatViews(question.views)}</Item>
                        </Stack>
                        <Stack direction="row" spacing={1} paddingTop={2}>
                            {question.tags.map((tag: string) => (
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

export default QuestionCard;
