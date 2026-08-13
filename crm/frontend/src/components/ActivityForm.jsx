import { useEffect, useState } from "react";

import {
  activitiesApi,
  leadsApi,
  customersApi,
  getErrorMessage,
} from "../api/api";

export default function ActivityForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    type: "Note",
    subject: "",
    description: "",
    relatedLead: "",
    relatedCustomer: "",
    status: "Pending",
  });

  const [leads, setLeads] = useState([]);
  const [customers, setCustomers] = useState([]);

  const [loadingData, setLoadingData] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Load Leads and Customers
  useEffect(() => {
    const loadData = async () => {
      setLoadingData(true);
      setError("");

      try {
        const [leadsRes, customersRes] =
          await Promise.all([
            leadsApi.getAll(),
            customersApi.getAll(),
          ]);

        setLeads(leadsRes.data.data || []);
        setCustomers(customersRes.data.data || []);
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setLoadingData(false);
      }
    };

    loadData();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!formData.subject.trim()) {
      setError("Subject is required.");
      return;
    }

    setSubmitting(true);

    try {
      const activityData = {
        type: formData.type,
        subject: formData.subject,
        description: formData.description,
        status: formData.status,
        relatedLead:
          formData.relatedLead || null,
        relatedCustomer:
          formData.relatedCustomer || null,
      };

      await activitiesApi.create(activityData);

      setFormData({
        type: "Note",
        subject: "",
        description: "",
        relatedLead: "",
        relatedCustomer: "",
        status: "Pending",
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
      <h3>Add New Activity</h3>

      {error && (
        <div className="alert alert-error">
          {error}
        </div>
      )}

      {loadingData ? (
        <p>Loading leads and customers...</p>
      ) : (
        <form onSubmit={handleSubmit}>

          {/* Activity Type */}

          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
          >
            <option value="Call">Call</option>
            <option value="Email">Email</option>
            <option value="Meeting">Meeting</option>
            <option value="Follow-up">
              Follow-up
            </option>
            <option value="Note">Note</option>
            <option value="Task">Task</option>
          </select>

          {/* Subject */}

          <input
            type="text"
            name="subject"
            placeholder="Subject *"
            value={formData.subject}
            onChange={handleChange}
          />

          {/* Description */}

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
          />

          {/* Related Lead */}

          <select
            name="relatedLead"
            value={formData.relatedLead}
            onChange={handleChange}
          >
            <option value="">
              -- Select Related Lead --
            </option>

            {leads.map((lead) => (
              <option
                key={lead._id}
                value={lead._id}
              >
                {lead.name} - {lead.email}
              </option>
            ))}
          </select>

          {/* Related Customer */}

          <select
            name="relatedCustomer"
            value={formData.relatedCustomer}
            onChange={handleChange}
          >
            <option value="">
              -- Select Related Customer --
            </option>

            {customers.map((customer) => (
              <option
                key={customer._id}
                value={customer._id}
              >
                {customer.companyName} -{" "}
                {customer.email}
              </option>
            ))}
          </select>

          {/* Status */}

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Pending">
              Pending
            </option>

            <option value="Completed">
              Completed
            </option>

            <option value="Cancelled">
              Cancelled
            </option>
          </select>

          {/* Submit */}

          <button
            type="submit"
            disabled={submitting}
          >
            {submitting
              ? "Adding..."
              : "Add Activity"}
          </button>

        </form>
      )}
    </div>
  );
}