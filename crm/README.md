# CRM (Leads · Customers · Activities · Dashboard)

A full-stack CRM built with React (Vite), Express, and MongoDB/Mongoose.
Leads are persisted in MongoDB — refreshing the page never loses data,
because the React app always re-fetches from the API on load (`useEffect`),
it never relies on component state alone.

## Features

- **Leads**: create, read, update, delete; status (`New`, `Contacted`,
  `Qualified`, `Closed`); filter by status; search by name/company/email.
- **Customers** and **Activities**: models + full REST CRUD (customer/activity
  UI isn't built in the frontend yet — see "Extending" below — but the API is
  ready to use).
- **Dashboard**: total leads, total customers, pipeline value, conversion
  rate, and a per-status breakdown, computed live from MongoDB via
  aggregation.
- Centralized error handling on both ends; the UI surfaces API errors instead
  of failing silently.

## Tech Stack

- Frontend: React 18, Vite, Axios, plain CSS
- Backend: Node.js, Express, Mongoose
- Database: MongoDB

## Project Structure

```
crm/
├── backend/
│   ├── config/db.js
│   ├── models/          Lead.js, Customer.js, Activity.js
│   ├── routes/          leads.js, customers.js, activities.js, dashboard.js
│   ├── middleware/errorHandler.js
│   ├── server.js
│   └── .env.example
└── frontend/
    ├── src/
    │   ├── api/api.js
    │   ├── components/  Dashboard, LeadForm, LeadList, LeadItem, StatusFilter
    │   ├── App.jsx
    │   └── main.jsx
    └── .env.example
```

## Prerequisites

- Node.js 18+
- A running MongoDB instance — either:
  - Local: [install MongoDB Community Server](https://www.mongodb.com/try/download/community)
    and run `mongod`, or
  - Cloud: a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster (get
    a connection string from there)

## Setup

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env`:

```
MONGO_URI=mongodb://127.0.0.1:27017/crm_db      # or your Atlas URI
PORT=5000
CLIENT_URL=http://localhost:5173
```

Run it:

```bash
npm run dev        # requires nodemon (installed as a devDependency)
# or
npm start
```

You should see:

```
MongoDB connected: 127.0.0.1/crm_db
Server running on http://localhost:5000
```

Verify: open `http://localhost:5000/api/health` — should return
`{"success":true,"message":"CRM API is running"}`.

### 2. Frontend

In a second terminal:

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Open `http://localhost:5173`.

## Using the App

1. Fill in the **Add New Lead** form (name + email are required) and submit.
2. The lead appears in the table on the right — this data is now in
   MongoDB, not just React state.
3. **Refresh the page** — the lead is still there, because `App.jsx` fetches
   `/api/leads` again on mount.
4. Change a lead's status directly from the dropdown in the table, or click
   **Edit** to update all fields.
5. Use the status filter buttons above the table to narrow the list.
6. Click **Delete** to remove a lead (asks for confirmation first).
7. The dashboard cards at the top update automatically after every change.

## API Reference

### Leads
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/leads` | List leads. Query params: `status`, `search` |
| GET | `/api/leads/:id` | Get one lead |
| POST | `/api/leads` | Create a lead |
| PUT | `/api/leads/:id` | Update a lead |
| DELETE | `/api/leads/:id` | Delete a lead |

### Customers
`GET/POST /api/customers`, `GET/PUT/DELETE /api/customers/:id`

### Activities
`GET/POST /api/activities` (filter with `?relatedLead=<id>` or
`?relatedCustomer=<id>`), `PUT/DELETE /api/activities/:id`

### Dashboard
`GET /api/dashboard/stats` → `{ totalLeads, totalCustomers, totalActivities,
totalPipelineValue, leadsByStatus, conversionRate }`

All responses follow `{ success, data }` on success and
`{ success: false, message }` on error, with proper HTTP status codes
(400 validation, 404 not found, 500 server error).

## Error Handling

- **Backend**: a global error middleware (`middleware/errorHandler.js`)
  catches Mongoose validation errors, invalid ObjectIds, duplicate-key
  errors, and unmatched routes, and always returns the JSON shape above.
- **Frontend**: every API call is wrapped in try/catch; failures show a
  dismissible red banner at the top of the page instead of crashing the UI or
  failing silently. Successful create/update/delete actions show a brief
  green confirmation.

## Extending

The Customer and Activity APIs are fully built (models, routes, validation)
but don't have dedicated frontend pages yet. To add one, follow the same
pattern as Leads: add `customersApi` calls to `src/api/api.js`, then build a
`CustomerForm`/`CustomerList` pair and wire them into `App.jsx` (or split
into routed pages with `react-router-dom` as the app grows).

## Troubleshooting

- **"Cannot reach the server"** in the UI → backend isn't running, or
  `VITE_API_URL` doesn't match the backend port.
- **MongoDB connection fails on startup** → check `MONGO_URI`; for Atlas,
  make sure your IP is allow-listed and the password in the URI is
  URL-encoded.
- **CORS errors in the browser console** → make sure `CLIENT_URL` in the
  backend `.env` matches the URL the frontend is actually running on.
