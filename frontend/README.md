TMU Classifieds Web Interface

Welcome to the TMU Classifieds Web Interface project, a commercial-grade digital marketplace designed exclusively for the TMU student community. This platform bridges the gap between students seeking to buy, sell, or exchange goods and services, fostering a vibrant, supportive network within the campus.

🚀 Project Overview

TMU Classifieds is more than just a marketplace; it's a community-driven platform where students can connect, exchange academic services, and trade goods seamlessly. Whether you're looking to buy textbooks, sell an old laptop, or find a study group, TMU Classifieds is your go-to campus hub.

Key Features: User Authentication: Secure login and registration, ensuring a safe, student-only marketplace. Responsive Design: A seamless browsing experience on both desktop and mobile devices. Classified Ad Categories: Organized sections for "Items Wanted," "Items for Sale," and "Academic Services." Search Functionality: Advanced search with filters to find exactly what you need. Ad Posting Interface: User-friendly posting of new ads with multimedia support. Communication Platform: In-app messaging to connect buyers and sellers securely. Admin Dashboard: Comprehensive tools for site management and content moderation. Mobile Optimization: Full functionality across a variety of mobile devices for on-the-go access.

🛠 Technical Stack

Front-End: Developed with HTML5, CSS3, and React.js for a dynamic, responsive UI.

Back-End: Powered by Node.js and Express, with a robust database management system.

Database: Utilizes MongoDB for efficient data storage and retrieval.

API Integration: Incorporates essential APIs for added functionality like maps and payment gateways.

Security: Implements best practices in web security to protect user data and transactions.

This user manual will guide you through all the functionalities of the Student Classifieds website:

Getting started:
1 - Logging in: If you are a registered user, you need to enter your credentials which consists of email and password and click on "Login".
                If you are a new user, you need to register yourself by clicking on register. The mandatory fields for registration are name, email and password and click "Sign up".

2 - Navigating the website:
    The website features a user friendly interface with a top navigation bar that provides quick access to different pages of the website:
    Home: This is the landing page displaying the welcome message for the user.
    Items wanted: Find ads where students search for specific items.
    Items for sale: Browse through ads listing items students are selling.
    Academic services: Offerings by students such as tutoring, student groups, etc.
    About us: Displays the information about the company.
    Chats: Conversation between students regarding the buying and selling of the items.
    Edit profile and log out buttons as well.

3 - Using the classifieds:
    Buying the item: Click on any ad that interests you by clicking on "Interested" button. A automated message will be sent to the seller indicatiing him that the user is interested in buying the item. You can chat with the buyer by clicking on the "chats" from the navigation bar.

    Posting ads:
    Registered users can post new ads by clicking on the button "Sell your item". The process typically involves this steps:
    1 -> Name of the item to be sold.
    2 -> a clear and detailed description highlighting the item's condition, key features and any other relevant information.
    3 -> Enter the desired price for your item. You can also choose to offer it for free.
    4 -> Choose the appropriate category that best describes yur ad.
    5 -> Include high-quality photos that accurately represent the item's condition.
    6 -> Once you have reviewed all the details click on "Submit" button to publish your listing to the website.

4 - Communication:
    The website offers a secure communication platform for the users to contact each other regarding the listed items.
    Here's how to access and use it:
    1 -> Go to the ad you're interested in and click on the button "Interested".
    2 -> Clicking the interested button will send an automated message to the seller.
    3 -> The buyer can see the chats by clicking on the "Chats" button from the navigation bar.

5 -> Admin dashboard:
    The website offers additional featuers particulatly for admin. The admin can manages the users in the database. Furthermore the admin can manage posts in the database.
    Here's how the admin can manage or delete the user from the database.
    1 -> Login to the admin profile using email and password.
    2 -> Admin can see a additional option of "Manage users" on the navigation bar.
    3 -> Clicking on "Manage users" the admin can remove the specific user from the database.

    Steps to remove an ad from the website:
    1 -> Click on the top right corner showing the profile icon and select "My Ads".
    2 -> Admin can edit the ad by clicking on edit icon on the ad and filling in the updates.
    3 -> Delete the ad by clicking on the delete option indicated by a red trash icon.

6 -> Additional features:
    The users can edit their name or email.
    Here' how to edit name and email of the user:
    1 -> Click on the top right corner showing the profile icon and select "Your Profile".
    2 -> Update the name or email.
    3 -> Review the changes and click on "UPDATE PROFILE" button.













<!-- # Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify) -->
