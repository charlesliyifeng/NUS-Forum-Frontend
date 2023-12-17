import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";

const drawerWidth: number = 150;

export default function SideBar() {
    const navigate = useNavigate();

    const listItem = [
        {
            text: "Home",
            onclick: () => navigate("/home"),
        },
        {
            text: "History",
            onclick: () => navigate("/thread/1"),
        },
        {
            text: "Tags",
            onclick: () => navigate("/thread/1"),
        },
    ];

    return (
        <Drawer
            variant={"permanent"}
            PaperProps={{ style: { position: "fixed" } }}
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
            }}
        >
            <Toolbar />
            <Box sx={{ overflow: "auto" }}>
                <List>
                    {listItem.map((item) => (
                        <ListItem key={item.text} disablePadding>
                            <ListItemButton onClick={item.onclick}>
                                <ListItemText primary={item.text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Drawer>
    );
}