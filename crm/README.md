# 🚀 Enterprise CRM System

A full-stack Customer Relationship Management (CRM) application built using React.js, Node.js, Express.js, and MongoDB.

The system helps businesses manage leads, customers, deals, and sales activities from a centralized dashboard.

## 📌 Project Overview

The Enterprise CRM System provides a simple and efficient way to manage customer relationships and sales operations.

Users can:

* Manage leads
* Manage customers
* Track deals
* Record sales activities
* Monitor sales pipeline
* Track lead conversion
* Update lead and deal statuses

---

## ✨ Features

### 👥 Lead Management

* Add new leads
* View leads
* Edit lead information
* Delete leads
* Update lead status
* Filter leads by status
* Store deal value
* Add notes

**Lead Statuses:**

* New
* Contacted
* Qualified
* Closed

### 🏢 Customer Management

* Add customers
* View customers
* Edit customer information
* Delete customers
* Store company information
* Store contact details

### 💼 Deal Management

* Create deals
* View deals
* Set deal value
* Set deal stage
* Add descriptions
* Update deal stage
* Delete deals
* Track sales pipeline

### 📞 Activity Management

* Create activities
* View activities
* Delete activities
* Add subjects and descriptions
* Select activity type
* Track activity status
* Connect activities with leads
* Connect activities with customers

**Activity Types:**

* Call
* Email
* Meeting
* Follow-up
* Note
* Task

**Activity Statuses:**

* Pending
* Completed
* Cancelled

### 📊 Dashboard

The dashboard displays:

* Total Leads
* Total Customers
* Pipeline Value
* Conversion Rate
* Lead Status Breakdown
* Sales Information

---

## 🛠️ Technology Stack

### Frontend

* React.js
* Vite
* Axios
* JavaScript
* HTML5
* CSS3

### Backend

* Node.js
* Express.js
* REST API

### Database

* MongoDB
* Mongoose

### Development Tools

* Visual Studio Code
* Git
* GitHub
* npm

---

## 🏗️ Project Architecture

```text
Enterprise CRM System
        │
        ▼
React.js Frontend
        │
        │ Axios / REST API
        ▼
Node.js + Express.js Backend
        │
        │ Mongoose
        ▼
MongoDB Database
        │
        ▼
CRM Data
```

---

## 📂 Project Structure

```text
crm/
│
├── backend/
│   ├── config/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
└── frontend/
    ├── src/
    │   ├── api/
    │   ├── components/
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── package.json
    └── .env.example
```

---

## ⚙️ How to Run the Project

### 1. Backend

Open a terminal:

```bash
cd backend
npm install
npm start
```

The backend runs on:

```text
http://localhost:5000
```

### 2. Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on:

```text
http://localhost:5173
```

---

## 🗄️ Database

The project uses MongoDB to store:

* Leads
* Customers
* Deals
* Activities

Example local MongoDB connection:

```text
mongodb://127.0.0.1:27017/crm_db
```

---

## 🔗 REST API

### Leads

```text
GET     /api/leads
POST    /api/leads
PUT     /api/leads/:id
DELETE  /api/leads/:id
```

### Customers

```text
GET     /api/customers
POST    /api/customers
PUT     /api/customers/:id
DELETE  /api/customers/:id
```

### Deals

```text
GET     /api/deals
POST    /api/deals
PUT     /api/deals/:id
DELETE  /api/deals/:id
```

### Activities

```text
GET     /api/activities
POST    /api/activities
PUT     /api/activities/:id
DELETE  /api/activities/:id
```

### Dashboard

```text
GET /api/dashboard/stats
```

---

## 🔐 Security

Environment variables are used for application configuration.

Sensitive files such as `.env` should not be uploaded to GitHub.

The project includes `.gitignore` to prevent sensitive and unnecessary files from being committed.

---

## 🎯 Future Improvements

* User authentication
* Role-based access control
* Advanced sales analytics
* Search and pagination
* Charts and reports
* Email integration
* Customer profile pages
* Notifications
* Cloud deployment

---

## 👩‍💻 Author

**Preethi**

B.Tech – Artificial Intelligence & Machine Learning

---

## 📜 License

This project is created for educational and internship purposes.
