export default function LeadItem({ lead, onEdit, onDelete, onStatusChange }) {
  return (
    <tr>
      <td>
        <div className="lead-name">{lead.name}</div>
        <div className="lead-sub">{lead.company}</div>
      </td>
      <td>
        <div>{lead.email}</div>
        <div className="lead-sub">{lead.phone}</div>
      </td>
      <td>
        <select
          value={lead.status}
          onChange={(e) => onStatusChange(lead._id, e.target.value)}
          className={`status-select status-${lead.status.toLowerCase()}`}
        >
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Qualified">Qualified</option>
          <option value="Closed">Closed</option>
        </select>
      </td>
      <td>${Number(lead.value || 0).toLocaleString()}</td>
      <td className="actions-cell">
        <button className="link-btn" onClick={() => onEdit(lead)}>
          Edit
        </button>
        <button className="link-btn danger" onClick={() => onDelete(lead._id)}>
          Delete
        </button>
      </td>
    </tr>
  );
}
