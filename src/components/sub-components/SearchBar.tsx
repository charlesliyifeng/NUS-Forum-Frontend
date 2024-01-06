import React from "react";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";

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

const SearchBar: React.FC = () => {
    function handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === "Enter") {
            const value: string = event.currentTarget.value;
            if (value) {
                alert(value);
            }
        }
    }

    return (
        <Search>
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
                id="search"
                placeholder={"Search…"}
                inputProps={{ "aria-label": "search" }}
                onKeyDown={handleKeyPress}
            />
        </Search>
    );
};

export default SearchBar;
