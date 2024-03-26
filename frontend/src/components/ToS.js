import React, { useState, useEffect } from "react";
import { useLocation, userNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";

function ToS() {



    return (
      <div className="SidePages">
        <h1>Terms of Service(ToS)</h1>
        <hr />
        <ol>
            <li>Introduction: Welcome to TMU Classifieds, the specialized marketplace for TMU students. This platform is designed to facilitate the exchange of goods and services within the TMU community. By accessing or using our services, you agree to comply with and be bound by these Terms of Service</li>
            <li>User Eligibility and Responsibility: This service is exclusively for registered students of TMU. By creating an account, you affirm that you are a current TMU student and provide accurate and complete registration information. You are responsible for safeguarding your account credentials and must notify us immediately of any unauthorized use of your account</li>
            <li>Prohibited Conduct and Usage: Users are prohibited from engaging in illegal activities, harassment, posting prohibited items (e.g., drugs, weapons), and academic dishonesty (e.g., selling plagiarized work). We reserve the right to remove content that violates these standards and to suspend or terminate accounts involved in such activities</li>
            <li>Intellectual Property: Content posted by users remains their property. However, by posting content on TMU Classifieds, you grant us a non-exclusive, royalty-free license to use, reproduce, and display your content in connection with the service. Additionally, our logos, designs, and software are our property and are protected under intellectual property laws.</li>
            <li>Content and Ad Listings: All ad listings must comply with our posting guidelines. We reserve the right to edit, remove, or refuse any content that violates these guidelines or is otherwise harmful or inappropriate</li>
            <li>Communication Platform Usage: Our communication platform must be used responsibly. Harassment, spamming, or use of offensive language is strictly prohibited and may result in suspension or termination of your account</li>
            <li>Privacy Policy Reference:Please refer to our Privacy Policy to understand how we collect, use, and protect your personal information.</li>
            <li>Termination and Suspension of Accounts: We reserve the right to suspend or terminate your account if you violate these terms, engage in illegal activities, or harm other users or the service.</li>
        </ol>   
      </div>
    );
  }

export default ToS;