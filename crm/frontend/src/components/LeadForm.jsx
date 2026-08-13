import { useState, useEffect } from "react";

const STATUSES = ["New", "Contacted", "Qualified", "Closed"];

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  company: "",
  status: "New",
  value: "",
  notes: "",
};

export default function LeadForm({ onSubmit, editingLead, onCancelEdit, submitting }) {
  const [form, setForm] = useState(emptyForm);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (editingLead) {
      setForm({
        name: editingLead.name || "",
        email: editingLead.email || "",
        phone: editingLead.phone || "",
        company: editingLead.company || "",
        status: editingLead.status || "New",
        value: editingLead.value ?? "",
        notes: editingLead.notes || "",
      });
    } else {
      setForm(emptyForm);
    }
  }, [editingLead]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    if (!form.name.trim() || !form.email.trim()) {
      setFormError("Name and email are required.");
      return;
    }

    onSubmit({
      ...form,
      value: form.value === "" ? 0 : Number(form.value),
    });

    if (!editingLead) setForm(emptyForm);
  };

  return (
    <form className="lead-form" onSubmit={handleSubmit}>
      <h3>{editingLead ? "Edit Lead" : "Add New Lead"}</h3>

      {formError && <div className="form-error">{formError}</div>}

      <div className="form-row">
        <input
          name="name"
          placeholder="Full name *"
          value={form.name}
          onChange={handleChange}
        />
        <input
          name="email"
          type="email"
          placeholder="Email *"
          value={form.email}
          onChange={handleChange}
        />
      </div>

      <div className="form-row">
        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
        />
        <input
          name="company"
          placeholder="Company"
          value={form.company}
          onChange={handleChange}
        />
      </div>

      <div className="form-row">
        <select name="status" value={form.status} onChange={handleChange}>
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <input
          name="value"
          type="number"
          min="0"
          placeholder="Deal value ($)"
          value={form.value}
          onChange={handleChange}
        />
      </div>

      <textarea
        name="notes"
        placeholder="Notes"
        rows={2}
        value={form.notes}
        onChange={handleChange}
      />

      <div className="form-actions">
        <button type="submit" disabled={submitting}>
          {submitting ? "Saving..." : editingLead ? "Update Lead" : "Add Lead"}
        </button>
        {editingLead && (
          <button type="button" className="secondary" onClick={onCancelEdit}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
