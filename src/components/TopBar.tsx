import SearchBar from "./sub-components/SearchBar";
import TopBarOptions from "./sub-components/TopBarOptions";

import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AppBar, Toolbar, Box } from "@mui/material";

const TopBar: React.FC = () => {
    // eslint-disable-next-line
    const [searchParams, setSearchParams] = useSearchParams();
    const q = searchParams.get("q") || "";
    const navigate = useNavigate();

    function handleSearch(value: string) {
        // navigate to new url
        navigate(`/search?q=${value}`);
        navigate(0);
    }

    return (
        <AppBar position={"fixed"} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
                <Box display="flex" width={"25%"}>
                    <h2>NUS Forum</h2>
                </Box>
                <Box display="flex" width={"50%"} justifyContent={"center"}>
                    <SearchBar defaultValue={q} onSearch={handleSearch} />
                </Box>
                <Box display="flex" width={"25%"} justifyContent={"right"}>
                    <TopBarOptions />
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default TopBar;
