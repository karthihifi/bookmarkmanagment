import { Component, useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { FaUserCircle, FaMeteor } from "react-icons/fa";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Divider, Link, Drawer } from "@mui/material";
import FolderDrawerCat from "./FolderDrawerCat";

export default function FileAddNavbar() {
  const cat = ["All", "Projects", "Study"];

  const [Drawerstate, setDrawerstate] = useState(false);

  const toggleDrawer = (open) => (event) => {
    console.log(open);
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDrawerstate(open);
    console.log(Drawerstate);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            onClick={toggleDrawer(true)}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor="left"
            open={Drawerstate}
            onClose={toggleDrawer(false)}
          >
            <FolderDrawerCat
              toggleDrawer={toggleDrawer}
              Category={cat}
            ></FolderDrawerCat>
          </Drawer>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link
              href={window.location.origin}
              underline="none"
              sx={{ color: "white" }}
            >
              <FaMeteor size="20px" />
            </Link>
          </Typography>

          <Button color="inherit">
            <AccountCircleIcon></AccountCircleIcon>
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
