// src/layouts/MainLayout.tsx
import React, { useState } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Link,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

interface MainLayoutProps {
  children: React.ReactNode; // Define the 'children' prop with React.ReactNode type
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [isMenuOpen, setMenuOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const location = useLocation();

  const handleMenuToggle = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleMenuToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Bee Smart Reporting
          </Typography>
          <IconButton color="inherit" onClick={handleProfileMenuOpen}>
            <AccountCircleIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleProfileMenuClose}
          >
            <MenuItem onClick={handleProfileMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleProfileMenuClose}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer variant="persistent" anchor="left" open={isMenuOpen}>
        <List>
          <ListItem button component={RouterLink} to="/dashboard">
            <ListItemIcon>{/* Add an icon here */}</ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          {/* Add more menu items here */}
        </List>
      </Drawer>
      <Container sx={{ mt: 2 }}>{children}</Container>
    </>
  );
};

export default MainLayout;
