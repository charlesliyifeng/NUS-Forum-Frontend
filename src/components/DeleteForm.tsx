import React from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

function capitalize(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

type Props = {
    subjectType: string;
    handleSubmit: () => void;
};

const DeleteForm: React.FC<Props> = ({ subjectType, handleSubmit }) => {
    const navigate = useNavigate();

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

            <Box padding={1}>
                <Stack direction={"row"} spacing={2}>
                    <Button variant="contained" onClick={handleSubmit} color="warning">
                        Delete
                    </Button>
                    <Button variant="outlined" onClick={() => navigate(-1)}>
                        Cancel
                    </Button>
                </Stack>
            </Box>
        </Box>
    );
};

export default DeleteForm;
