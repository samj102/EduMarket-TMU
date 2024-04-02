import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  Paper,
  TextField,
  Button,
} from "@mui/material";
import api from "../utils/api";

const EditProfile = ({ profile, setProfile }) => {
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  console.log(profile);
  async function updateUser() {
    if (
      (name === profile.name && email === profile.email) ||
      name === "" ||
      email === ""
    ) {
      alert(
        "You cannot update to the same Name and Email or keep any field empty"
      );
    } else {
      await api.put(`user/update/${profile.id}`, { name: name, email: email });
      setProfile({ id: profile.id, name: name, email: email });
      alert("Profile updated successfully");
    }
  }

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
                    required
                    defaultValue={profile.name}
                    label="Your Name"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    defaultValue={profile.email}
                    label="Email"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={updateUser}
                  >
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
