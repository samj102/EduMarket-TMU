import React from "react";
import { Link } from "react-router-dom";
import { Typography, Box } from "@mui/material";
import "../styles/Navbar.css";

const footer = () => {
  return (
    <Box
      sx={{
        textAlign: "center",
        bgcolor: "#5fa180",
        color: "white",
        p: 3,
        position: "sticky",
        width: "100%",
      }}
    >
      <Box>
        <ul className="navbar_menu">
          <li>
            <Link to="/ContactUs">Contact Us</Link>
          </li>
          <li>
            <Link to="/ToS">Terms of Services</Link>
          </li>
          <li>
            <Link to="/PrivacyPolicy">Privacy Policy</Link>
          </li>
        </ul>
      </Box>
      <Typography
        variant="h10"
        sx={{
          "@media (max-width:600px)": { fontSize: "1rem" },
          fontFamily: "Forum",
        }}
      >
        All Rights Reserved &copy; 2024 AdVista
      </Typography>
    </Box>
  );
};

export default footer;
