import React from "react";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

// props for EditBar
// display each button conditionally
type Props = {
    handleEdit?: React.MouseEventHandler<HTMLButtonElement>;
    handleDelete?: React.MouseEventHandler<HTMLButtonElement>;
    handleComment?: React.MouseEventHandler<HTMLButtonElement>;
    handleAccept?: React.MouseEventHandler<HTMLButtonElement>;
};

const EditBar: React.FC<Props> = (props) => {
    return (
        <Box paddingTop={1}>
            <Stack direction="row">
                {props.handleEdit !== undefined ? (
                    <Button variant="text" onClick={props.handleEdit}>
                        Edit
                    </Button>
                ) : null}
                {props.handleDelete !== undefined ? (
                    <Button variant="text" onClick={props.handleDelete}>
                        Delete
                    </Button>
                ) : null}
                {props.handleComment !== undefined ? (
                    <Button variant="text" onClick={props.handleComment}>
                        Comment
                    </Button>
                ) : null}
                {props.handleAccept !== undefined ? (
                    <Button variant="text" onClick={props.handleAccept}>
                        Accept
                    </Button>
                ) : null}
            </Stack>
        </Box>
    );
};

EditBar.defaultProps = {
    handleEdit: undefined,
    handleDelete: undefined,
    handleComment: undefined,
    handleAccept: undefined,
};

export default EditBar;
