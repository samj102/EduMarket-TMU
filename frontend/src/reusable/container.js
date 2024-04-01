import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

class container extends React.Component {
  constructor(props) {
    super();
  }

  header = () => {
    return (
      <div>
        <AppBar style={{ position: "static", height: "8vh" }}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="#5fa180"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <h1>Header</h1>
          </Toolbar>
        </AppBar>
      </div>
    );
  };

  footer = () => {
    return (
      <Toolbar
        style={{
          position: "static",
          backgroundColor: "#525252",
          height: "8vh",
          color: "white",
        }}
      >
        <ul>
          <li>
            <Link to="/About_us">About Us</Link>
          </li>
          <li>
            <Link to="/TOS">Terms of Services</Link>
          </li>
          <li>
            <Link to="/privacy_policy">Privacy Policy</Link>
          </li>
          <li>
            <Link to="/ContactUs">Contact Us</Link>
          </li>
        </ul>
      </Toolbar>
    );
  };

  render() {
    return (
      <div>
        {this.header()}
        <div style={{ height: "100vh" }}>{this.props.children}</div>
        {this.footer()}
      </div>
    );
  }
}

export default container;
