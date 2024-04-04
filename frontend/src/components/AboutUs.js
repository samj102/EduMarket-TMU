import React from "react";
import { Container, Typography, Grid, Paper } from "@mui/material";

const AboutUsPage = () => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h2" component="h1" gutterBottom>
        About Us
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: "20px" }}>
            <Typography variant="h5" component="h3">
              Our Mission
            </Typography>
            <Typography paragraph>
              At AdVista, our mission is to revolutionize the way students at
              Toronto Metropolitan University (TMU) engage in commerce and
              academic exchange. Our platform is designed to empower students by
              providing a seamless and secure marketplace where they can buy,
              sell, and trade various items and academic services. We are
              committed to fostering a sense of community within TMU, connecting
              students in innovative ways that enhance their educational
              experience. Through accessibility, transparency, and a dedication
              to student success, we aim to redefine the traditional boundaries
              of campus commerce, making AdVista the go-to destination for all
              student needs.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: "20px" }}>
            <Typography variant="h5" component="h3">
              Our Story
            </Typography>
            <Typography paragraph>
              AdVista was conceived by a group of five ambitious Computer
              Science students from Toronto Metropolitan University (TMU),
              driven by a shared passion for innovation and a desire to address
              the practical challenges faced by their peers. Drawing inspiration
              from their own experiences as students, they embarked on a journey
              to develop a groundbreaking solution that would transform the way
              TMU students engage in buying and selling. With their combined
              expertise and unwavering commitment, they brought AdVista to life,
              meticulously crafting a user-friendly platform tailored
              specifically to the needs of the TMU community. Their journey is
              one of collaboration, perseverance, and a relentless pursuit of
              excellence, culminating in the creation of a platform that
              promises to revolutionize campus commerce. As pioneers in
              student-driven innovation, the creators of AdVista are not only
              shaping the future of e-commerce but also leaving an indelible
              mark on the TMU community for generations to come.
            </Typography>
          </Paper>
        </Grid>
        {}
      </Grid>
    </Container>
  );
};

export default AboutUsPage;
