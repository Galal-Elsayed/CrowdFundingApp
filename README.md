# CrowdFundingApp

A full-stack web application for creating, managing, and supporting crowdfunding campaigns. Users can register, create fundraising projects, donate to campaigns, and track progress—all in a modern, user-friendly interface.

## Features

- User registration and authentication (email-based, JWT)
- Create, edit, and manage fundraising projects
- Browse and search for campaigns
- Donate to projects (with or without an account)
- Track donation progress and campaign goals
- Admin interface for user and project management
- Responsive frontend built with React + Vite

## Tech Stack

- **Backend:** Django, Django REST Framework, Djoser, SimpleJWT
- **Frontend:** React, Vite, Bootstrap
- **Database:** (postgresql)

### Backend Dependencies (see `requirements.txt`)
- Django
- djangorestframework
- djoser
- djangorestframework_simplejwt
- django-cors-headers
- psycopg2-binary
- pillow

### Frontend Dependencies (see `frontend/package.json`)
- React
- react-router-dom
- axios
- bootstrap
- react-icons
- react-toastify

## Getting Started

### Backend (Django)
1. Create and activate a virtual environment (optional but recommended):
   ```bash
   python3 -m venv venv
   # Linux:
   source venv/bin/activate
   # Windows:
   venv\Scripts\activate
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Run migrations:
   ```bash
   cd backend
   python manage.py migrate
   ```
4. Start the backend server:
   ```bash
   python manage.py runserver
   ```

### Frontend (React + Vite)
1. Open a new terminal and go to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm run dev
   ```

- The React app will be available at [http://localhost:5173](http://localhost:5173)
- The Django API will be available at [http://localhost:8000](http://localhost:8000)

## Project Structure

```
CrowdFundingApp/
  backend/      # Django backend (API, models, users, projects, donations, categories)
  frontend/     # React frontend (components, pages, services)
  requirements.txt
  setup_instructions.txt
```

## API Overview
- User registration, login, and profile management (see `backend/users/README.md` for details)
- Project CRUD endpoints
- Donation endpoints
- Category endpoints

## License

This project is for educational purposes. 
