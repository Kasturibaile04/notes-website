#BlogVerse

BlogVerse is a full-stack web application built with React on the frontend and Node.js/Express on the backend. The project includes user authentication, protected routes, a blog-style home page, and a course section for learning content.

## Features

- User signup and login
- JWT-based authentication
- Protected pages for authenticated users
- Blog-style home page with cards
- Course page
- Responsive UI with Tailwind CSS
- MongoDB backend integration

## Tech Stack

- Frontend: React, Vite, React Router, Tailwind CSS
- Backend: Node.js, Express, MongoDB
- Authentication: JWT
- API: REST API

## Project Structure

```bash
pro-web/
├── Backend/
│   ├── controllers/
│   ├── database/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env
│   ├── package.json
│   └── server.js
├── Frontend/
│   ├── src/
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
├── .gitignore
└── README.md
```

## Prerequisites

Before running the project, ensure you have:

- Node.js installed
- npm installed
- MongoDB running locally or a valid MongoDB connection string

## Installation

### 1. Install backend dependencies

```bash
cd Backend
npm install
```

### 2. Configure environment variables

Create a `.env` file in the `Backend` folder and add:

```env
port=3000
JWT_SECRET=your_secret_key
mongodb_url=mongodb://127.0.0.1:27017/your_database_name
```

### 3. Start the backend

```bash
cd Backend
npm start
```

### 4. Install frontend dependencies

```bash
cd Frontend
npm install
```

### 5. Start the frontend

```bash
cd Frontend
npm run dev
```

The frontend should run on:

```bash
http://localhost:5173
```

The backend runs on:

```bash
http://localhost:3000
```

## Usage

- Open the frontend in your browser
- Sign up for a new account or log in
- After login, you will be redirected to the home page
- Browse the blog cards and access protected content
- Use the course page from the navigation menu

## Available Scripts

### Backend

```bash
npm start
```

Starts the Express server with nodemon.

### Frontend

```bash
npm run dev
```

Starts the Vite development server.

```bash
npm run build
```

Builds the project for production.

## Notes

- The frontend uses mock public data for blog posts.
- The app stores JWT tokens in frontend state for authentication.
- API routes are organized under `/api` and `/api/user`.

## License

This project is for educational and personal use.

