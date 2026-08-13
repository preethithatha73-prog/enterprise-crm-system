import { useState } from "react";
import { dealsApi, getErrorMessage } from "../api/api";

export default function DealForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    title: "",
    value: "",
    stage: "New",
    description: "",
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

    if (!formData.title.trim()) {
      setError("Deal title is required.");
      return;
    }

    if (formData.value === "" || Number(formData.value) < 0) {
      setError("Please enter a valid deal value.");
      return;
    }

    setSubmitting(true);

    try {
      await dealsApi.create({
        title: formData.title.trim(),
        value: Number(formData.value),
        stage: formData.stage,
        description: formData.description.trim(),
      });

      setFormData({
        title: "",
        value: "",
        stage: "New",
        description: "",
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
      <h3>Add New Deal</h3>

      {error && (
        <div className="alert alert-error">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Deal title *"
          value={formData.title}
          onChange={handleChange}
        />

        <input
          type="number"
          name="value"
          placeholder="Deal value *"
          min="0"
          step="0.01"
          value={formData.value}
          onChange={handleChange}
        />

        <select
          name="stage"
          value={formData.stage}
          onChange={handleChange}
        >
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Qualified">Qualified</option>
          <option value="Won">Won</option>
          <option value="Lost">Lost</option>
        </select>

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
        />

        <button
          type="submit"
          disabled={submitting}
        >
          {submitting ? "Adding..." : "Add Deal"}
        </button>
      </form>
    </div>
  );
}