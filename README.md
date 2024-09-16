> 15 - Sep - 2024

# Learning Advanced Auth


## About this project:- 
|No| Backend - System                       | Frontend - System                   |
|--|----------------------------------------|-------------------------------------|
|1 | 🗄️ Database Setup                      | 📋 Registration Page UI            |
|2 | 🔐 Registration `Endpoint`             | 🔓 Login Page UI                   |
|3 | 📧 Send Email Verification Code        | ✅ Email Verification Page UI      |
|4 | 🔍 Verify Email `Endpoint`             | 📤 Implementing Registration       |
|5 | 📧 Building a Welcome Email Template   | 📧 Implementing Email Verification |
|6 | 🔑 Login `Endpoint`                    | 🔒 Protecting Our Routes           |
|7 | 🚫 Logout `Endpoint`                   | 🔑 Implementing Login              |
|8 | 🔄 Forgot Password `Endpoint`          | 🏠 Dashboard Page                  |
|9 | 📧 Send Link to Email for new password | 🔄 Implementing Forgot Password    |
|10| 🔁 Reset Password `Endpoint`           |                                     |
|11| 📧 Send Email for password status      |                                     |
|12| ✔️ Check Auth `Endpoint`               |                                     |



<br/>


## Backend endpoints:-
| No| Context & File Link                     | Method | Api Endpoint                  |
| --| --------------------------------------- | ------ | ------------------------------|
| 1 | [Registration][registration]            | POST   | /api/auth/`register`          |
| 2 | [Email Verification][emailVerification] | POST   | /api/auth/`email-verification`|
| 3 | [Login][userLogin]                      | POST   | /api/auth/`login`             |
| 4 | [Logout][userLogout]                    | POST   | /api/auth/`logout`            |
| 5 | [Forgot Password][forgotPassword]       | POST   | /api/auth/`forgot-password`   |
| 6 | [Reset Password][resetPassword]         | POST   | /api/auth/`reset-password`    |
| 7 | [Check Auth][checkAuth]                 | GET    | /api/auth/`check-auth`        |

[registration]:      ./backend/src/projects/auth/controllers/registration.js
[emailVerification]: ./backend/src/projects/auth/controllers/emailVerification.js
[userLogin]:         ./backend/src/projects/auth/controllers/login.js
[userLogout]:        ./backend/src/projects/auth/controllers/logout.js
[forgotPassword]:    ./backend/src/projects/auth/controllers/forgotPassword.js
[resetPassword]:     ./backend/src/projects/auth/controllers/resetPassword.js
[checkAuth]:         ./backend/src/projects/auth/controllers/checkAuth.js



<br/>

### To run backend please setup the .env file

```
MONGODB_URI = *****

NODE_ENV = development
CLIENT_URL = *****

JWT_SECRET = *****
JWT_EXPIRES_IN = *****

MAILTRAP_ENDPOINT = *****
MAILTRAP_TOKEN = *****

MAILTRAP_SENDER_EMAIL = *****
MAILTRAP_SENDER_NAME = *****

MAILTRAP_WELCOME_MAIL_TEMPLATE_UUID = *****
MAILTRAP_COMPANY_INFO_NAME = *****
```

<br/>

### Backend run in local:-

```
cd backend
```
```
yarn dev
```

### Frontend run in local:-

```
cd frontend
```
```
yarn dev
```


## NodeJs | Backend Basic Data Flow...
<img src="./backend/public/img/backendDataFlow.png" />
