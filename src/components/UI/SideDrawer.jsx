import React from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { AppState } from "../../state/app-context";

const menuList = [
  { name: "Home", route: "/" },
  { name: "Picture Upload", route: "/upload" },
];

const SideDrawer = () => {
  const navigate = useNavigate();
  const { isSidebarOpen, setIsSidebarOpen } = AppState();

  const menuClickHandler = (route) => {
    navigate(route);
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setIsSidebarOpen(open);
  };

  const list = () => (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
      <List>
        {menuList.map((menu) => (
          <ListItem onClick={() => menuClickHandler(menu.route)} button key={menu.name}>
            <ListItemText primary={menu.name} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <React.Fragment>
        <Drawer anchor="left" open={isSidebarOpen} onClose={toggleDrawer(false)}>
          {list()}
        </Drawer>
      </React.Fragment>
    </div>
  );
};

export default SideDrawer;
