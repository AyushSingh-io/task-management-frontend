# Task Management Frontend

Frontend for my Task Management application built with React. The application provides authentication, project management, dashboard functionality, and task-related views while communicating with a REST API backend.

## Tech Stack

* React
* Vite
* JavaScript
* React Router
* Redux Toolkit
* React Hook Form
* Tailwind CSS
* Fetch API

## Getting Started

```bash
npm install
npm run dev
```

## Features

### Authentication

* User signup
* User login
* User logout
* Protected routes
* Public routes
* Authentication state management with Redux
* HTTP-only cookie based authentication

### Dashboard

* View user's projects
* View tasks assigned to the logged-in user
* Fetch dashboard data from the backend
* Redux-based project and task state management

### Project Management

* View all projects
* Create projects
* Update projects
* Delete projects
* View project details
* View tasks belonging to a project
* Clickable project tasks
* Project status management:

  * ACTIVE
  * ARCHIVED
  * COMPLETED
* Optional project cover image upload
* Reusable project card and project form components
* React Hook Form for project forms
* FormData for project image uploads

### UI

* Reusable UI components
* Responsive layouts
* Consistent application-wide styling
* Dashboard-style card-based UI
* Project and task sections with contextual colors
* Reusable Header and Footer

## Backend

This frontend connects to my Task Management backend:

https://github.com/AyushSingh-io/task-management-backend

## Project Status

🚧 **Work in Progress**

Authentication, dashboard, and project management functionality are currently implemented.

Task creation and the remaining task management flows are currently under development.
