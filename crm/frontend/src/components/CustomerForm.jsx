import { useState } from "react";
import { customersApi, getErrorMessage } from "../api/api";

export default function CustomerForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    companyName: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!formData.name.trim()) {
      setError("Customer name is required.");
      return;
    }

    if (!formData.email.trim()) {
      setError("Email is required.");
      return;
    }

    if (!formData.companyName.trim()) {
      setError("Company name is required.");
      return;
    }

    setSubmitting(true);

    try {
      await customersApi.create(formData);

      setFormData({
        name: "",
        email: "",
        phone: "",
        companyName: "",
      });

      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="card">
      <h3>Add New Customer</h3>

      {error && (
        <div className="alert alert-error">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full name *"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email *"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
        />

        <input
          type="text"
          name="companyName"
          placeholder="Company name *"
          value={formData.companyName}
          onChange={handleChange}
        />

        <button type="submit" disabled={submitting}>
          {submitting ? "Adding..." : "Add Customer"}
        </button>
      </form>
    </div>
  );
}