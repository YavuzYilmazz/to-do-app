
# To-Do App

This is a full-stack To-Do application built with Node.js, Express.js, MongoDB for the backend, and React.js for the frontend. The application allows users to manage their To-Dos, including adding, editing, deleting, and uploading attachments or thumbnails.

---

## Project Structure

```
backend/
  ├── src/
  │   ├── controllers/  # Backend logic
  │   ├── middlewares/  # Middleware functions (e.g., authentication)
  │   ├── models/       # Mongoose models
  │   ├── routes/       # Express routes
  │   ├── app.js        # Main application entry point
  ├── uploads/          # Folder for uploaded files
  ├── .env              # Environment variables
  ├── package.json      # Backend dependencies and scripts

frontend/
  ├── public/           # Public assets
  ├── src/
  │   ├── components/   # Reusable UI components
  │   ├── pages/        # Main pages (e.g., Login, Todos)
  │   ├── services/     # API services
  │   ├── styles/       # Global and modular CSS
  │   ├── utils/        # Utility functions
  │   ├── App.js        # Main application entry point
  │   ├── index.js      # React app entry point
  ├── .env              # Frontend environment variables
  ├── package.json      # Frontend dependencies and scripts
```

---

## Prerequisites

1. Node.js (v16+ recommended)
2. MongoDB (local or cloud instance)
3. NPM or Yarn

---

## Backend Setup

1. Navigate to the `backend/` directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.dist`:

   ```bash
   cp .env.dist .env
   ```

4. Configure the `.env` file with the following values:

   ```env
   PORT=5001
   MONGO_URI=mongodb://<your_mongo_connection_string>
   JWT_SECRET=<your_jwt_secret>
   ```

5. Start the backend server:

   ```bash
   npm run dev
   ```

   The backend should now be running on `http://localhost:5001`.

---

## Frontend Setup

1. Navigate to the `frontend/` directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.dist`:

   ```bash
   cp .env.dist .env
   ```

4. Configure the `.env` file with the following values:

   ```env
   REACT_APP_BACKEND_PORT=5001
   REACT_APP_BACKEND_URL=http://localhost:5001
   ```

5. Start the frontend application:

   ```bash
   npm start
   ```

   The frontend should now be running on `http://localhost:3000`.

---

## How to Use

1. Open the application in your browser: `http://localhost:3000`.
2. Register a new user or log in with existing credentials.
3. Add, edit, or delete To-Dos.
4. Upload attachments or thumbnails to your To-Dos.
5. Click on attachments to download them.

---

## Notes

- The `uploads/` folder should be added to `.gitignore` to prevent uploading files to the repository.
- Always use environment variables for sensitive information.

---

## Scripts

### Backend

| Command         | Description                  |
|-----------------|------------------------------|
| `npm run dev`   | Start in development mode    |

### Frontend

| Command         | Description                  |
|-----------------|------------------------------|
| `npm start`     | Start the development server |
| `npm run build` | Build for production         |

---

## License

This project is licensed under the MIT License.
