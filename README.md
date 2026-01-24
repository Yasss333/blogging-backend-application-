# Blog.io

# Blogging Application - Node.js Backend

A full-stack blogging application built with Node.js following the MVC (Model-View-Controller) architecture pattern. This was my first backend project where I learned fundamental web development concepts.

## 🎯 Project Overview

This blogging application allows users to:
- Create and manage blog posts
- User authentication and authorization
- View blogs created by other users
- Save favorite blogs
- Upload images with blog posts
- Comment on blogs (Model included)

## 🚀 Live Demo

**Deployment:** [blogging-backend-application-production.up.railway.app](https://blogging-backend-application-production.up.railway.app)

## 📚 What I Learned

### First Backend Experience
- Building server-side applications with **Node.js**
- Understanding request-response cycle
- Working with databases and data persistence

### MVC Pattern Implementation
- **Model:** Database schemas for Blog, User, and Comment
- **View:** EJS templating engine for rendering dynamic HTML
- **Controller:** Business logic separation for Blog and User operations

### Key Technologies & Concepts
- **Authentication & Authorization:** JWT tokens for secure user sessions
- **File Management:** Image upload and storage using Multer middleware
- **Templating:** Dynamic page rendering with EJS
- **Database:** Database operations and relationships
- **Middleware:** Custom middleware for authentication and file uploads

## 📚 Tech Stack

### Backend Framework & Runtime
- **Node.js** - JavaScript runtime for server-side development
- **Express.js** - Web application framework for routing and middleware

### Templating & Frontend
- **EJS (Embedded JavaScript)** - Server-side templating engine for dynamic HTML rendering
- **CSS/HTML** - Static assets served from public directory

### Database & ORM
- **MongoDB/Mongoose** - (Assumed based on project structure) NoSQL database and ODM

### Authentication & Security
- **JWT (JSON Web Tokens)** - Token-based authentication via `services/verifyjwt.js`
- **Custom Authentication Service** - Located in `services/authentication.js`
- **Password Hashing** - Secure user credential management

### File Handling
- **Multer** - Middleware for handling image uploads
- **File Storage** - Images stored in `uploads/photos/images/` directory

### Additional Tools
- **Environment Management** - Configuration management for different environments

## 📁 Project Structure

```
blogging-nodejs/
├── app.js                    # Main application entry point
├── connect.js                # Database connection configuration
├── package.json              # Project dependencies
├── Controller/
│   ├── blog.js              # Blog operations logic
│   └── user.js              # User operations logic
├── Model/
│   ├── blog.js              # Blog schema
│   ├── comment.js           # Comment schema
│   └── user.js              # User schema
├── Routes/
│   ├── blog.js              # Blog routes
│   └── user.js              # User routes
├── middleware/
│   ├── authentication.js    # Auth middleware
│   └── upload.js            # File upload middleware
├── services/
│   ├── authentication.js    # Auth service logic
│   └── verifyjwt.js         # JWT verification
├── views/                   # EJS templates
│   ├── blog.ejs
│   ├── home.ejs
│   ├── savedBlogs.ejs
│   ├── signin.ejs
│   ├── signup.ejs
│   ├── viewblog.ejs
│   └── partials/            # Reusable template components
│       ├── header.ejs
│       ├── navbar.ejs
│       └── script.ejs
├── public/                  # Static files
│   └── images/
└── uploads/                 # User uploaded images
    └── photos/images/
```

## 🛠️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd blogging-nodejs
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   - Create a `.env` file with necessary configuration
   - Set up database connection URL
   - Configure JWT secret key

4. **Start the application**
   ```bash
   npm start
   ```

## 📖 Credits

This project was built following the **Piyush Garg YouTube Backend Series**, which provided excellent guidance on Node.js fundamentals, MVC architecture, and building production-ready applications.

## ✨ Key Takeaways

- Building scalable backend applications with Node.js
- Understanding MVC pattern for organized code structure
- Implementing authentication and secure user sessions
- Working with file uploads and storage
- Dynamic page rendering with template engines
- Database design and operations
- Project deployment and production considerations

This project was simple yet incredibly educational. Building it from scratch helped me understand how web applications work at the backend level and gave me confidence to tackle more complex projects.

---

**Author:** Yash  
**Created:** 2026  
**Status:** Deployed & Learning ✅
