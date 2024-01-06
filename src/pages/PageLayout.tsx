import TopBar from "../components/TopBar";
import SideBar from "../components/SideBar";

import React from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

const PageLayout: React.FC = () => {
    return (
        <Box display={"flex"}>
            <TopBar />
            <SideBar />
            <Outlet />
        </Box>
    );
};

export default PageLayout;
