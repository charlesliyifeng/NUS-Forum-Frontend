import Answer from "../types/Answer";

import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

type Props = {
    answer: Answer;
};

const useStyles = makeStyles(() => ({
    commentBody: {
        fontSize: 16,
        whiteSpace: "pre-wrap",
        paddingBottom: "1em",
    },
    commentCard: {
        marginBottom: "1em",
    },
    metadata: {
        fontSize: 14,
    },
}));

const CommentItem: React.FC<Props> = ({ answer }) => {
    const classes = useStyles();

    return (
        <Card className={classes.commentCard}>
            <CardContent>
                <Typography variant="body2" color="textPrimary" className={classes.commentBody} component="p">
                    {answer.body}
                </Typography>
                <Typography color="textSecondary" className={classes.metadata} gutterBottom>
                    {"Posted by " + answer.author + " on " + answer.timestamp.toLocaleString()}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default CommentItem;
