import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import { AppBar, InputBase, Toolbar, Button, Box } from "@mui/material";
import React from "react";

// styling functions for SearchBar
const Search = styled("div")(({ theme }) => ({
    position: "relative",
    left: 150,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto",
    },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    width: "100%",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        [theme.breakpoints.up("md")]: {
            width: "60ch",
        },
    },
}));

const BootstrapButton = styled(Button)({
    fontSize: 16,
    padding: "6px 12px",
    border: "1px solid",
    lineHeight: 1.5,
    borderColor: "#FFFFFF",
    color: "#FFFFFF",

    "&:hover": {
        borderColor: "#FFFFFF",
        boxShadow: "none",
    },
    "&:active": {
        boxShadow: "none",
        borderColor: "#FFFFFF",
    },
});

export default function SearchBar() {
    return (
        <AppBar position={"fixed"} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
                <h2>NUS Forum</h2>
                <Search>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder={"Search…"}
                        inputProps={{ "aria-label": "search" }}
                        onKeyDown={handleKeyPress}
                    />
                </Search>
                <Box position={"relative"} left={300}>
                    <BootstrapButton variant="outlined" href="/login">
                        Login
                    </BootstrapButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

function handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
        const value: string = event.currentTarget.value;
        if (value) {
            alert(value);
        }
    }
}
