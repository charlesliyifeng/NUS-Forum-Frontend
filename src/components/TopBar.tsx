import SearchBar from "./sub-components/SearchBar";
import TopBarOptions from "./sub-components/TopBarOptions";

import React from "react";
import { AppBar, Toolbar } from "@mui/material";

const TopBar: React.FC = () => {
    return (
        <AppBar position={"fixed"} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
                <h2>NUS Forum</h2>
                <SearchBar />
                <TopBarOptions />
            </Toolbar>
        </AppBar>
    );
};

export default TopBar;
