import { Box, Typography } from "@mui/material";
import React from "react";

const NotFound: React.FC = () => {
    return (
        <Box display={"flex"} alignContent={"center"} position={"absolute"} left={300} top={50}>
            <Typography variant="h1">Page Not Found</Typography>
        </Box>
    );
};

export default NotFound;
