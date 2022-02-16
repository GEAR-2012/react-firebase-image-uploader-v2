import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SideDrawer from "./SideDrawer";
import { AppState } from "../../state/app-context";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const { setIsSidebarOpen } = AppState();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="secondary" enableColorOnDark>
        <Toolbar>
          <IconButton
            onClick={() => setIsSidebarOpen(true)}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Button
            color="inherit"
            onClick={() => navigate("/")}
            component="div"
            sx={{ flexGrow: 1, justifyContent: "flex-start", padding: 0, fontSize: "1.2rem" }}
          >
            React - Firebase Image Uploader V2
          </Button>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <SideDrawer />
    </Box>
  );
};

export default Header;
