import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Normalize errors
export const getErrorMessage = (err) => {
  if (err.response?.data?.message) {
    return err.response.data.message;
  }

  if (err.message === "Network Error") {
    return "Cannot reach the server. Is the backend running?";
  }

  return err.message || "Something went wrong";
};

// -----------------------------
// Leads API
// -----------------------------
export const leadsApi = {
  getAll: (params) =>
    api.get("/leads", { params }),

  create: (data) =>
    api.post("/leads", data),

  update: (id, data) =>
    api.put(`/leads/${id}`, data),

  remove: (id) =>
    api.delete(`/leads/${id}`),
};

// -----------------------------
// Dashboard API
// -----------------------------
export const dashboardApi = {
  getStats: () =>
    api.get("/dashboard/stats"),
};

// -----------------------------
// Customers API
// -----------------------------
export const customersApi = {
  getAll: () =>
    api.get("/customers"),

  getById: (id) =>
    api.get(`/customers/${id}`),

  create: (data) =>
    api.post("/customers", data),

  update: (id, data) =>
    api.put(`/customers/${id}`, data),

  remove: (id) =>
    api.delete(`/customers/${id}`),
};

// -----------------------------
// Activities API
// -----------------------------
export const activitiesApi = {
  getAll: (params) =>
    api.get("/activities", { params }),

  create: (data) =>
    api.post("/activities", data),

  update: (id, data) =>
    api.put(`/activities/${id}`, data),

  remove: (id) =>
    api.delete(`/activities/${id}`),
};

// -----------------------------
// Deals API
// -----------------------------
export const dealsApi = {
  getAll: () =>
    api.get("/deals"),

  getById: (id) =>
    api.get(`/deals/${id}`),

  create: (data) =>
    api.post("/deals", data),

  update: (id, data) =>
    api.put(`/deals/${id}`, data),

  remove: (id) =>
    api.delete(`/deals/${id}`),
};

export default api;