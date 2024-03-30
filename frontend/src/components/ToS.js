import React from "react";
import { Stack, Divider, styled, Paper, Typography, Container} from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'Left',
  color: theme.palette.text.secondary,
}));

const Customhead = (props) => {
  return (
    <Typography component="strong" fontWeight={'bold'}{...props}>
    </Typography>);
  };
function ToS() {



  return (
    <Container>
      <Typography variant="h2" component="h1" textAlign={"center"}>
        Terms of service
      </Typography>
      <Stack
        direction="column"
        divider={<Divider orientation="horizontal" flexItem color="#00e676" sx={{ borderBottomWidth: 2 }} />}
        spacing={2}
        padding={2}
      >
        <Item><Customhead>1. </Customhead> Introduction: Welcome to TMU Classifieds, the specialized marketplace for TMU students. This platform is designed to facilitate the exchange of goods and services within the TMU community. By accessing or using our services, you agree to comply with and be bound by these Terms of Service</Item>
        <Item><Customhead>2. </Customhead>User Eligibility and Responsibility: This service is exclusively for registered students of TMU. By creating an account, you affirm that you are a current TMU student and provide accurate and complete registration information. You are responsible for safeguarding your account credentials and must notify us immediately of any unauthorized use of your account</Item>
        <Item><Customhead>3. </Customhead>Prohibited Conduct and Usage: Users are prohibited from engaging in illegal activities, harassment, posting prohibited items (e.g., drugs, weapons), and academic dishonesty (e.g., selling plagiarized work). We reserve the right to remove content that violates these standards and to suspend or terminate accounts involved in such activities</Item>
        <Item><Customhead>4. </Customhead>Intellectual Property: Content posted by users remains their property. However, by posting content on TMU Classifieds, you grant us a non-exclusive, royalty-free license to use, reproduce, and display your content in connection with the service. Additionally, our logos, designs, and software are our property and are protected under intellectual property laws.</Item>
        <Item><Customhead>5. </Customhead>Content and Ad Listings: All ad listings must comply with our posting guidelines. We reserve the right to edit, remove, or refuse any content that violates these guidelines or is otherwise harmful or inappropriate</Item>
        <Item><Customhead>6. </Customhead>Communication Platform Usage: Our communication platform must be used responsibly. Harassment, spamming, or use of offensive language is strictly prohibited and may result in suspension or termination of your account</Item>
        <Item><Customhead>7. </Customhead>Privacy Policy Reference:Please refer to our Privacy Policy to understand how we collect, use, and protect your personal information.</Item>
        <Item><Customhead>8. </Customhead>Termination and Suspension of Accounts: We reserve the right to suspend or terminate your account if you violate these terms, engage in illegal activities, or harm other users or the service.</Item>
      </Stack>
    </Container>
  );
}

export default ToS;