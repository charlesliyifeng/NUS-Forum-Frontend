import React from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

// Props for FormSubmitControl
type Props = {
    buttonText: string;
    buttonColor: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning";
    handleSubmit: () => void;
};

const FormSubmitControl: React.FC<Props> = ({ buttonText, buttonColor, handleSubmit }) => {
    const navigate = useNavigate();
    return (
        <Box padding={1}>
            <Stack direction={"row"} spacing={2}>
                <Button variant="contained" onClick={handleSubmit} color={buttonColor}>
                    {buttonText}
                </Button>
                <Button variant="outlined" onClick={() => navigate(-1)}>
                    Cancel
                </Button>
            </Stack>
        </Box>
    );
};

export default FormSubmitControl;
