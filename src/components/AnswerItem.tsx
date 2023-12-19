import Answer from "../types/Answer";

import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
//import { makeStyles } from "@mui/styles";

// styles
const cardStyle = {
    display: "flex",
    width: "100%",
    height: "15vw",
};

type Props = {
    answer: Answer;
};

const AnswerItem: React.FC<Props> = ({ answer }) => {
    return (
        <Box padding={1}>
            <Card variant="outlined" style={cardStyle}>
                <CardContent>
                    <Box display={"flex"} flexDirection={"column"}>
                        <Typography component="div">{answer.body}</Typography>
                        <Typography color="text-secondary">
                            by {answer.author} on {answer.timestamp.toLocaleString()}
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default AnswerItem;
