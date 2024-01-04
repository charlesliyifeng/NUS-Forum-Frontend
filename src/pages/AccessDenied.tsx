import { Box, Typography } from "@mui/material";
import React from "react";

const AccessDenied: React.FC = () => {
    return (
        <Box display={"flex"} alignContent={"center"} position={"absolute"} left={300} top={50}>
            <Typography variant="h1">Access Denied</Typography>
        </Box>
    );
};

export default AccessDenied;
