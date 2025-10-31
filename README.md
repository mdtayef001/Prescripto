# Prescripto

## Live Demo

[**Prescripto**](https://prescripto-c3bfc.web.app/) 🚀  

---

## Overview

**Prescripto** is a web application that allows seamless interaction between administrators, doctors, and patients. Users can manage appointments, edit profiles, and handle other essential medical operations efficiently.

## Features

### Authentication & Authorization

- Three user roles: **Admin, Doctor, Patient**
- Secure login and authentication
- Role-based access control

### User Features

- **Admin**:
  - Manage doctors and patients
  - Cancel appointments
  - View system analytics

- **Doctor**:
  - View and manage their appointments
  - Edit their profile
  - Cancel appointments if necessary

- **Patient**:
  - Book, reschedule, or cancel appointments
  - Edit their profile
  - View doctor availability

### Additional Features

- Notifications using **react-toastify**
- Smooth navigation with **react-router-dom**
- API handling with **axios**
- Optimized data fetching using **tanstack-query**
- Responsive UI with **Tailwind CSS**

## Tech Stack

### Frontend:

- **React.js**
- **Tailwind CSS**
- **TanStack Query** (State Management)
- **React Router DOM** (Routing)
- **Axios** (HTTP Requests)
- **React-Toastify** (Notifications)

### Backend:

- **Express.js** (Server-side framework)
- **MongoDB** (Database)
- **Mongoose** (Schema definition and data modeling)
- **Bcrypt** (Password hashing)
- **JWT** (Authentication & Authorization)
- **Validator** (Data validation)
- **CORS** (Cross-Origin Resource Sharing)

### Backend Overview

The backend of **Prescripto** is developed using **Node.js** and **Express.js**, designed for performance, scalability, and security. It manages all server-side logic, authentication, and database operations.

#### Key Backend Features:

- Secure authentication and authorization using **JWT**
- Encrypted password storage with **Bcrypt**
- Data validation with **Validator** and **Mongoose**
- RESTful API endpoints for users, doctors, and appointments
- Role-based access for **Admin**, **Doctor**, and **Patient**
- Error handling and response standardization

