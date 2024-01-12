import FormSubmitControl from "./sub-components/FormSubmitControl";

import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function capitalize(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

type Props = {
    subjectType: string;
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

            <FormSubmitControl buttonText="Delete" buttonColor="warning" handleSubmit={handleSubmit} />
        </Box>
    );
};

export default DeleteForm;
