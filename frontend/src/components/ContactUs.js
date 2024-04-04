import React from "react";
import {
  Container,
  Typography,
  Grid,
  Paper,
  TextField,
  Button,
} from "@mui/material";

const ContactUsPage = () => {
  return (
    <Container maxWidth="lg" style={{ marginTop: "20px" }}>
      <Typography variant="h2" component="h1" gutterBottom>
        Contact Us
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: "20px" }}>
            <Typography variant="h5" component="h3" gutterBottom>
              Our Location
            </Typography>
            <Typography paragraph>
              123 Main Street, Anytown, AN 12345
            </Typography>
            <Typography variant="h5" component="h3" gutterBottom>
              Phone
            </Typography>
            <Typography paragraph>+1 (234) 567-8900</Typography>
            <Typography variant="h5" component="h3" gutterBottom>
              Email
            </Typography>
            <Typography paragraph>contact@example.com</Typography>
          </Paper>
        </Grid>
        {/* <Grid item xs={12} md={6}>
                    <Paper elevation={3} style={{ padding: '20px' }}>
                        <Typography variant="h5" component="h3" gutterBottom>
                            Send us a message
                        </Typography>
                        <form>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField label="First Name" variant="outlined" fullWidth />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField label="Last Name" variant="outlined" fullWidth />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField label="Email" variant="outlined" fullWidth />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Message"
                                        variant="outlined"
                                        fullWidth
                                        multiline
                                        rows={4}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button variant="contained" color="primary">
                                        Send Message
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Paper>
                </Grid> */}
      </Grid>
    </Container>
  );
};

export default ContactUsPage;
