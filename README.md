# Dexter Final Backend Project

## Project Overview

This project is a full-stack web application with a Node.js (Express) backend and a simple static frontend.
The application implements authentication, user profile management, and a second resource (Notes).

Main features:
- JWT authentication (register and login)
- User profile management (get and update profile)
- Notes CRUD functionality
- Notes are linked to a specific case (killerKey) and to the user who created them
- Authorization rules:
    - only the owner can edit or delete their notes
    - all authenticated users can view notes for a case

Technologies used:
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Token)
- bcrypt

---

## Setup and Installation Instructions

### Requirements
- Node.js installed
- MongoDB installed and running locally (or MongoDB Atlas)

### Installation

1. Clone the repository
2. Open the backend folder
3. Install dependencies:

npm install

### Environment Variables

Create a `.env` file in the backend folder with the following content:

PORT=5000  
MONGODB_URI=mongodb://127.0.0.1:27017/final_project  
JWT_SECRET=your_secret_key

### Run MongoDB
If you are using a local MongoDB instance, make sure MongoDB is running.

### Start the Server

node src/server.js

The server will run on:
http://localhost:5000

### Frontend Pages

The frontend is served by Express from the `public` folder.

Available pages:
- Form.html – login and registration
- Case_Files.html – case notes management
- Profile.html – user profile page

---

## API Documentation

### Access Types
- Public – no authentication required
- Private – requires Authorization header with JWT token

Authorization header format:
Authorization: Bearer <token>

---

## Authentication Routes (Public)

### Register User
POST /api/auth/register

Request body:
{
"username": "Aibyn",
"email": "user@mail.com",
"password": "password123"
}

Response:
{
"message": "Registered",
"token": "...",
"user": {
"id": "...",
"username": "...",
"email": "..."
}
}

---

### Login User
POST /api/auth/login

Request body:
{
"email": "user@mail.com",
"password": "password123"
}

Response:
{
"message": "Logged in",
"token": "...",
"user": {
"id": "...",
"username": "...",
"email": "..."
}
}

---

## User Routes (Private)

### Get User Profile
GET /api/users/profile

Response:
{
"id": "...",
"username": "...",
"email": "..."
}

---

### Update User Profile
PUT /api/users/profile

Request body:
{
"username": "NewName",
"email": "new@mail.com",
"password": "newpassword123"
}

Notes:
- password is optional
- email must be unique

Response:
{
"message": "Profile updated",
"user": {
"id": "...",
"username": "...",
"email": "..."
}
}

---

## Notes Routes (Second Resource, Private)

### Create Note
POST /api/notes

Request body:
{
"killerKey": "dexter_morgan",
"text": "First note about Dexter"
}

Response:
{
"message": "Note created",
"note": {
"id": "...",
"killerKey": "...",
"text": "...",
"createdAt": "..."
}
}

---

### Get Notes by Case
GET /api/notes?killerKey=dexter_morgan

Response:
{
"killerKey": "dexter_morgan",
"notes": [
{
"id": "...",
"text": "...",
"createdAt": "...",
"owner": {
"id": "...",
"username": "...",
"email": "..."
}
}
]
}

---

### Get Note by ID
GET /api/notes/:id

Response:
{
"id": "...",
"killerKey": "...",
"text": "...",
"createdAt": "...",
"owner": {
"id": "...",
"username": "...",
"email": "..."
}
}

---

### Update Note
PUT /api/notes/:id

Request body:
{
"text": "Updated note text"
}

Response:
{
"message": "Note updated",
"note": {
"id": "...",
"killerKey": "...",
"text": "...",
"createdAt": "..."
}
}

---

### Delete Note
DELETE /api/notes/:id

Response:
{
"message": "Note deleted"
}

---

## Authorization Rules

- JWT is required for all private routes
- Notes are visible to all authenticated users
- Only the note owner can edit or delete a note

---

## Project Structure

src/
- app.js
- server.js
- controllers/
- routes/
- models/
- middleware/

public/
- HTML files
- JavaScript files
- CSS files
