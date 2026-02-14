# Bellcorp Event Management Application

This is a full-stack MERN application for managing events.

## Features
- User Authentication (Login/Register)
- Event Discovery (Browse, Search, Filter)
- Event Registration (with capacity handling)
- User Dashboard (My Events, Cancel Registration)

## Project Structure
- `server`: Node.js + Express + MongoDB Backend
- `client`: React + Vite Frontend

## Prerequisites
- Node.js installed
- MongoDB installed and running (or a cloud MongoDB URI)

## Setup & Run Locally

1. **Install Dependencies**
   ```bash
   npm install
   npm run install-all
   ```

2. **Environment Variables**
   - The `server/.env` file is pre-configured for local development.
   - `MONGO_URI=mongodb://localhost:27017/bellcorp_events`
   - `JWT_SECRET=your_jwt_secret_key_here`

3. **Seed Database (Optional)**
   Populate the database with sample events:
   ```bash
   cd server
   node seeder.js
   ```

4. **Run Application**
   Run both backend and frontend concurrently:
   ```bash
   npm start
   ```
   - Frontend: `http://localhost:5173`
   - Backend: `http://localhost:5000`

## Deployment

### Backend (Render)
1. Create a new Web Service on Render.
2. Connect your GitHub repository.
3. Settings:
   - Root Directory: `server`
   - Build Command: `npm install`
   - Start Command: `node server.js`
   - Environment Variables: Add `MONGO_URI` and `JWT_SECRET`.

### Frontend (Vercel/Netlify)
1. Create a new project.
2. Connect your GitHub repository.
3. Settings:
   - Root Directory: `client`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Environment Variables: If needed, set backend URL.

**Note for Production**: In `client/src/services/api.js`, update the `baseURL` to your deployed backend URL.

## API Endpoints
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/events`
- `GET /api/events/:id`
- `POST /api/events/:id/register`
- `DELETE /api/events/:id/register`
- `GET /api/events/myevents`
