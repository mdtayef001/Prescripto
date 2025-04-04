# Prescripto

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
- **Mongoose** (ODM for MongoDB)
- **Bcrypt** (Password hashing)
- **CORS** (Cross-Origin Resource Sharing)
- **JWT** (Authentication)

## Installation

### Prerequisites

Ensure you have **Node.js** and **npm** installed on your system.

### Steps to Run Locally

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/prescripto.git
   cd prescripto
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the application:**
   ```bash
   npm run dev
   ```

### Environment Variables

Create a `.env` file in the root directory and add necessary environment variables:

```env
REACT_APP_API_URL=your_api_endpoint
```

## Folder Structure

```
/src
  ├── components     # Reusable UI components
  ├── pages          # Different pages (Login, Dashboard, Profile, etc.)
  ├── services       # API calls using Axios
  ├── context        # TanStack Query setup
  ├── routes         # React Router setup
  ├── assets         # Images, icons, etc.
  ├── App.js         # Main App component
  ├── index.js       # Entry point
```

## Live Demo

[Prescripto](https://prescripto-c3bfc.web.app/) 🚀

\*\*Backend (Under Development)
