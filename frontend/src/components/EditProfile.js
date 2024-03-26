import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  Paper,
  TextField,
  Button,
} from "@mui/material";
import { jwtDecode } from "jwt-decode";
import api from "../utils/api";

const EditProfile = ({ profile }) => {
  return (
    <Container maxWidth="lg" style={{ marginTop: "20px" }}>
      <Typography variant="h2" component="h1" gutterBottom>
        Edit Your Profile
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: "20px" }}>
            <Typography variant="h5" component="h3" gutterBottom></Typography>
            <form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    defaultValue={profile.name}
                    label="Your Name"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    defaultValue={profile.email}
                    label="Email"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" color="primary">
                    Update Profile
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default EditProfile;
