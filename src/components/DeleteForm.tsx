import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import React from "react";
import { Link } from "react-router-dom";

function capitalize(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

type Props = {
    subjectType: "question" | "answer";
    handleSubmit: () => void;
};

const DeleteForm: React.FC<Props> = ({ subjectType, handleSubmit }) => {
    return (
        <Box
            className="centerBox"
            sx={{ flexGrow: 1, p: 3, "& .MuiTextField-root": { m: 1, width: "100ch" } }}
            top={80}
        >
            <Typography variant="h4" padding={2}>
                Delete {capitalize(subjectType)}
            </Typography>

            <Typography display="block" padding={1}>
                Are you sure you want to delete this {subjectType}? <br />
                Warning: This process is not reversible!
            </Typography>

            <Box display={"flex"} flexDirection={"row"} padding={1}>
                <Box paddingRight={2}>
                    <Button variant="contained" onClick={handleSubmit} color="warning">
                        Delete
                    </Button>
                </Box>
                <Box>
                    <Button variant="outlined" component={Link} to=".." relative="path">
                        Cancel
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default DeleteForm;
