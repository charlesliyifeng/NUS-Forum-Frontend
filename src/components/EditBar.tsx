import { Answer } from "../types/Answer";
import { toggleAccept } from "../lib/api/answer";
import React from "react";
import { Link } from "react-router-dom";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

// props for EditBar
// display each button conditionally
type Props = {
    subjectType: "question" | "answer";
    id: number;
    answer?: Answer;
    allowEdit?: boolean;
    allowDelete?: boolean;
    allowComment?: boolean;
    allowAccept?: boolean;
};

const EditBar: React.FC<Props> = (props) => {
    const path: string = `../../${props.subjectType}/${props.id}`;

    async function handleAccept() {
        try {
            // toggle accept status from API
            await toggleAccept(props.id, !props.answer!.accepted);
            // reload page
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Box paddingTop={1}>
            <Stack direction="row">
                {props.allowEdit ? (
                    <Button variant="text" component={Link} to={`${path}/edit`} relative="path">
                        Edit
                    </Button>
                ) : null}
                {props.allowDelete ? (
                    <Button variant="text" component={Link} to={`${path}/delete`} relative="path">
                        Delete
                    </Button>
                ) : null}
                {props.allowComment ? (
                    <Button variant="text" component={Link} to="." relative="path">
                        Comment
                    </Button>
                ) : null}
                {props.allowAccept ? (
                    <Button variant="text" onClick={handleAccept}>
                        {props.answer!.accepted ? "Unaccept" : "Accept"}
                    </Button>
                ) : null}
            </Stack>
        </Box>
    );
};

EditBar.defaultProps = {
    allowEdit: false,
    allowDelete: false,
    allowComment: false,
    allowAccept: false,
};

export default EditBar;
