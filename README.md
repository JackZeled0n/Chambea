# Chambea - Blog Application

Chambea is a blog application built with Angular. It allows users to create, edit, view, and favorite blog posts. The backend is powered by a JSON Server hosted on Render.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [API Endpoints](#api-endpoints)

## Features

- User authentication (Sign up, Login, Logout)
- Create, edit, and delete blog posts
- Mark posts as favorites
- Search functionality
- Responsive design
- Protected routes based on user authentication

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/chambea.git
   cd chambea
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Server the application locally:
   ```bash
   ng serve
    ```
## API Endpoints: https://chambea-api.onrender.com/

- **GET /posts**: Retrieve all posts.
- **GET /posts/:id**: Retrieve a specific post by ID.
- **POST /posts**: Create a new post.
- **PUT /posts/:id**: Update a post by ID.
- **DELETE /posts/:id**: Delete a post by ID.
- **GET /favorites**: Retrieve all favorites.
- **GET /favorites?userEmail=:userEmail**: Retrieve all favorites for a specific user.
- **POST /favorites**: Add a new favorite.
- **DELETE /favorites/:id**: Remove a favorite by ID.
- **GET /users**: Retrieve all users.
- **GET /users?email=:email**: Retrieve a specific user by email.

