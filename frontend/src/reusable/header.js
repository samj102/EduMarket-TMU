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

  const openMenu = Boolean(anchor);

  const handleClick = (e) => {
    setAnchor(e.currentTarget);
  };

  const handleClose = () => {
    setAnchor(null);
  };

  const tok = localStorage.getItem("login");
  const decoded = jwtDecode(tok);

  if (decoded.role === "admin") {
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
              >
                <MenuIcon />
              </IconButton>
              <Typography
                variant="h6"
                // component="div"
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
                  <li>
                    <Link to="/all-users">Manage Users</Link>
                  </li>
                  <li>
                    <Link to="/About_Us">About Us</Link>
                  </li>
                  <li>
                    <Link to="/chat">Messages</Link>
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
                    <MenuItem
                      component={Link}
                      to="/logout"
                      onClick={handleClose}
                    >
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
  } else {
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
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
                <img src="./favicon.ico"></img>Advista
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
                  <li>
                    <Link to="/About_Us">About Us</Link>
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
                    <MenuItem
                      component={Link}
                      to="/logout"
                      onClick={handleClose}
                    >
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
}

export default Header;
