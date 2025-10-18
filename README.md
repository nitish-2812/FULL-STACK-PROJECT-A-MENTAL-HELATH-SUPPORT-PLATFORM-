# Bloom: Mental Wellness & Support Platform

Bloom is a full-stack web application designed to provide a safe and supportive space for students. It features an anonymous "Feelings Wall," mood tracking, wellness resources, and a secure support system, all managed by a comprehensive admin dashboard.

---

## Features

* **Student Dashboard:**
    * **Feelings Wall:** Post and view anonymous feelings or messages of support.
    * **Mood Tracker:** Log daily moods and view trends over the past week (visualized with Chart.js).
    * **Wellness Resources:** Access articles, videos, and contacts for mental wellness.
    * **Support Tickets:** Securely send a support request to an admin.
    * **Secure Authentication:** JWT-based login and registration.

* **Admin Dashboard:**
    * **User Management:** View all registered student users.
    * **Content Management:** Add, edit, and delete wellness resources.
    * **Post Moderation:** View and remove flagged posts from the Feelings Wall.
    * **Ticket Management:** View and resolve student support tickets.
    * **Data Analytics:** View high-level analytics on user engagement and mood trends.

---

## Tech Stack

This project is built on the **MERN** stack with additional technologies for visualization and security.

* **Frontend:** HTML5, CSS3, JavaScript (ES6+), Chart.js
* **Backend:** Node.js, Express.js
* **Database:** MongoDB Atlas (Cloud) with Mongoose (ODM)
* **Authentication:** JSON Web Tokens (JWT), bcrypt.js
* **Deployment:** Render (Backend) & Netlify (Frontend)
* **Utilities:** `cors`, `dotenv`

---

## Setup and Installation

Follow these steps to get a local copy of the project up and running.

### **Prerequisites**

* **Node.js** (which includes npm): [Download here](https://nodejs.org/)
* **Git**: [Download here](https://git-scm.com/)
* **MongoDB Atlas Account**: You will need a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

### **1. Clone the Repository**

```bash
git clone [https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git](https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git](https://github.com/login?return_to=https%3A%2F%2Fgithub.com%2Flogin%2Fdevice)
cd YOUR-REPO-NAME
Backend Setup
  # Example: cd server
npm install
