import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Menu,
  MenuItem,
} from "@mui/material";
import "../styles/Navbar.css";
import MenuIcon from "@mui/icons-material/Menu";
import { jwtDecode } from "jwt-decode";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function Header() {
  const [anchor, setAnchor] = useState(null);
  const [anchorDropDown, setAnchorDropDown] = useState(null);
  const [anchorDropDown2, setAnchorDropDown2] = useState(null);

  const openMenu = Boolean(anchor);
  const openDropDown = Boolean(anchorDropDown);
  const openDropDown2 = Boolean(anchorDropDown2);

  const handleClick = (e) => {
    setAnchor(e.currentTarget);
  };

  const handleClickDropdown = (e) => {
    setAnchorDropDown(e.currentTarget);
  };

  const handleClickDropdown2 = (e) => {
    setAnchorDropDown2(e.currentTarget);
  };

  const handleClose = () => {
    setAnchor(null);
  };

  const handleCloseDropdown = () => {
    setAnchorDropDown(null);
  };

  const handleCloseDropdown2 = () => {
    setAnchorDropDown2(null);
  };

  const tok = localStorage.getItem("login");
  const decoded = jwtDecode(tok);

  return (
    <div>
      <Box>
        <AppBar
          component={"nav"}
          sx={{ bgcolor: "#5fa180", position: "sticky" }}
        >
          <Toolbar>
            <IconButton
              color="white"
              aria-label="open drawer"
              edge="start"
              sx={{ mr: 2, display: { sm: "none" } }}
              onClick={handleClickDropdown}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorDropDown}
              open={openDropDown}
              onClose={handleCloseDropdown}
            >
              <MenuItem
                component={Link}
                to="/ItemsForSale"
                onClick={handleCloseDropdown}
              >
                Items for Sale
              </MenuItem>
              <MenuItem
                component={Link}
                to="/itemsWanted"
                onClick={handleCloseDropdown}
              >
                Items Wanted
              </MenuItem>
              <MenuItem
                component={Link}
                to="/academicServices"
                onClick={handleCloseDropdown}
              >
                Academic Services
              </MenuItem>
              {decoded.role === "admin" && (
                <MenuItem
                  component={Link}
                  to="/all-users"
                  onClick={handleCloseDropdown}
                >
                  Manage Users
                </MenuItem>
              )}
              <MenuItem
                component={Link}
                to="/chat"
                onClick={handleCloseDropdown}
              >
                Chat
              </MenuItem>
              <MenuItem
                component={Link}
                to="/edit-profile"
                onClick={handleCloseDropdown}
              >
                Your Profile
              </MenuItem>

              <MenuItem
                component={Link}
                to="/logout"
                onClick={handleCloseDropdown}
              >
                Logout
              </MenuItem>
            </Menu>
            <Typography
              variant="h6"
              sx={{
                flexGrow: 1,
                fontFamily: "El Messiri",
                textDecoration: "none",
                color: "white",
              }}
              component={Link}
              to="/home"
            >
              <img style={{ width: "40px" }} src="./favicon.ico"></img>Advista
            </Typography>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <ul className="navbar_menu">
                <li>
                  <Link to="/itemsForSale">Items For Sale</Link>
                </li>
                <li>
                  <Link to="/itemsWanted">Items Wanted</Link>
                </li>
                <li>
                  <Link to="/AcademicServices">Academic Services</Link>
                </li>
                {decoded.role === "admin" && (
                  <li>
                    <Link to="/all-users">Manage Users</Link>
                  </li>
                )}

                <li>
                  <Link to="/chat">Chats</Link>
                </li>
                <li
                  className="nav-links"
                  aria-controls="basic-menu"
                  aria-haspopup="true"
                  aria-expanded={openMenu ? "true" : undefined}
                  onClick={handleClick}
                >
                  <AccountCircleIcon />
                </li>
                <Menu
                  id="basic-menu"
                  anchorEl={anchor}
                  open={openMenu}
                  onClose={handleClose}
                >
                  <MenuItem
                    component={Link}
                    to="/edit-profile"
                    onClick={handleClose}
                  >
                    Your Profile
                  </MenuItem>
                  <MenuItem component={Link} to="/MyAds" onClick={handleClose}>
                    {decoded.role === "admin" ? "All Ads" : "My Ads"}
                  </MenuItem>
                  <MenuItem component={Link} to="/logout" onClick={handleClose}>
                    Logout
                  </MenuItem>
                </Menu>
              </ul>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}

export default Header;
