# 🚀 Enterprise CRM System

A full-stack Customer Relationship Management (CRM) application built to manage leads, customers, deals, and sales activities from a single dashboard.

## 📌 Project Overview

The Enterprise CRM System helps businesses organize and manage customer-related information efficiently.

The application provides a centralized dashboard where users can:

- Manage leads
- Manage customers
- Track deals
- Record sales activities
- Monitor sales pipeline value
- Track lead conversion
- Update lead and deal statuses

The project uses a modern full-stack architecture with React.js, Node.js, Express.js, and MongoDB.

---

## ✨ Features

### 👥 Lead Management

- Add new leads
- View all leads
- Edit lead information
- Delete leads
- Update lead status
- Filter leads by status
- Store lead value
- Add notes to leads

Supported lead statuses:

- New
- Contacted
- Qualified
- Closed

### 🏢 Customer Management

- Add customers
- View customer information
- Edit customer information
- Delete customers
- Store company details
- Store contact information

### 💼 Deal Management

- Create new deals
- View deals
- Set deal value
- Set deal stage
- Add deal descriptions
- Update deal stage
- Delete deals
- Track sales pipeline

### 📞 Activity Management

- Create activities
- View activities
- Delete activities
- Add activity subjects
- Add descriptions
- Select activity type
- Track activity status
- Connect activities with leads
- Connect activities with customers

Supported activity types:

- Call
- Email
- Meeting
- Follow-up
- Note
- Task

Supported activity statuses:

- Pending
- Completed
- Cancelled

### 📊 Dashboard

The dashboard displays:

- Total Leads
- Total Customers
- Pipeline Value
- Conversion Rate
- Lead status breakdown
- Sales information

---

## 🛠️ Technology Stack

### Frontend

- React.js
- Vite
- Axios
- JavaScript
- HTML5
- CSS3

### Backend

- Node.js
- Express.js
- REST API

### Database

- MongoDB
- Mongoose

### Development Tools

- Visual Studio Code
- Git
- GitHub
- npm

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
Node.js + Express.js
        │
        │ Mongoose
        ▼
MongoDB Database
        │
        ▼
CRM Data