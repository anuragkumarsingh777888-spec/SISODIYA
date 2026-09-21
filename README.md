# MechConnect – Smart Vehicle Care & Emergency Assistance Platform

MechConnect is a full-stack vehicle care platform that helps users manage vehicle data, find trusted mechanics, diagnose common issues, maintain service history, and request emergency roadside support.

## Tech Stack

- Frontend: React + Vite + CSS
- Backend: Node.js + Express
- Database: Firebase Firestore (prototype uses mock data when Firebase is not configured)
- Authentication: Firebase Authentication (ready for integration)

## Project Structure

```bash
.
├── client/
│   ├── src/
│   ├── public/
│   ├── .env.example
│   ├── package.json
│   └── vite.config.js
├── server/
│   ├── config/
│   ├── data/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── .env.example
│   ├── server.js
│   └── package.json
├── package.json
├── .gitignore
└── README.md
```

## Local Setup

### 1) Install dependencies

```bash
npm install
npm install --prefix client
npm install --prefix server
```

### 2) Configure environment variables

- Copy `.env.example` files and fill in your values.

Client:

```bash
cp client/.env.example client/.env
```

Server:

```bash
cp server/.env.example server/.env
```

### 3) Start the app

Frontend:

```bash
npm run dev --prefix client
```

Backend:

```bash
npm run dev --prefix server
```

Or from the root:

```bash
npm run dev
```

## Firebase Setup

1. Create a Firebase project in the Google Firebase console.
2. Enable Firebase Authentication (Email/Password).
3. Create a Firestore database.
4. Add a web app and copy configuration values to `client/.env`.
5. For backend Admin SDK, create a service account and place the JSON credentials in server environment variables.

## Firebase Collection Structure

- users
- vehicles
- mechanics
- serviceHistory
- emergencyRequests
- serviceReminders

## Notes

- This is a working prototype and uses mock data when Firebase services are not configured.
- The frontend is separated from the backend and uses environment variables for network configuration.
- The app contains reusable UI blocks and beginner-friendly project structure.
