import React from "react";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

// props for EditBar
// display each button conditionally
type Props = {
    allowEdit?: boolean;
    allowDelete?: boolean;
    allowComment?: boolean;
    allowAccept?: boolean;
};

const EditBar: React.FC<Props> = (props) => {
    return (
        <Box paddingTop={1}>
            <Stack direction="row">
                {props.allowEdit ? (
                    <Button variant="text" component={Link} to="edit" relative="path">
                        Edit
                    </Button>
                ) : null}
                {props.allowDelete ? (
                    <Button variant="text" component={Link} to="delete" relative="path">
                        Delete
                    </Button>
                ) : null}
                {props.allowComment ? (
                    <Button variant="text" component={Link} to="/" relative="path">
                        Comment
                    </Button>
                ) : null}
                {props.allowAccept ? (
                    <Button variant="text" component={Link} to="/" relative="path">
                        Accept
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
