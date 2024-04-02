import React from "react";
import { Container, Typography } from "@mui/material";

const PrivacyPolicy = () => {
    return (
        <Container maxWidth="md" style={{ marginTop: "20px" }}>
            <Typography variant="h2" gutterBottom>
                Privacy Policy
            </Typography>
            <Typography variant="body1" paragraph>
                At AdVista, we take your privacy seriously. This Privacy Policy outlines the types of personal information we collect, how we use it, and your choices regarding your information.
            </Typography>
            <Typography variant="h4" gutterBottom>
                Information We Collect
            </Typography>
            <Typography variant="body1" paragraph>
                - <strong>Personal Information:</strong> When you register an account with AdVista, we collect certain personal information such as your name, email address, and contact information.
            </Typography>
            <Typography variant="body1" paragraph>
                - <strong>Usage Data:</strong> We may collect information about how you interact with our web app, such as the pages you visit, the items you view, and your interactions with other users.
            </Typography>
            <Typography variant="h4" gutterBottom>
                How We Use Your Information
            </Typography>
            <Typography variant="body1" paragraph>
                - We use the personal information you provide to create and maintain your account, communicate with you about your account and our services, and to provide personalized recommendations and features.
            </Typography>
            <Typography variant="body1" paragraph>
                - We use usage data to analyze trends, administer the web app, track users' movements around the app, and to gather demographic information about our user base as a whole.
            </Typography>
            <Typography variant="h4" gutterBottom>
                Data Security
            </Typography>
            <Typography variant="body1" paragraph>
                We take appropriate measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.
            </Typography>
            <Typography variant="h4" gutterBottom>
                Your Choices
            </Typography>
            <Typography variant="body1" paragraph>
                You have the right to access, update, or delete your personal information at any time. You can also choose to opt-out of certain communications or features.
            </Typography>
            <Typography variant="body1" paragraph>
                If you have any questions or concerns about our Privacy Policy or practices, please contact us at [contact email].
            </Typography>
        </Container>
    );
};

export default PrivacyPolicy;
