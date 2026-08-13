import LeadItem from "./LeadItem";

export default function LeadList({ leads, loading, onEdit, onDelete, onStatusChange }) {
  if (loading) {
    return <div className="empty-state">Loading leads...</div>;
  }

  if (!leads.length) {
    return <div className="empty-state">No leads found. Add your first lead above.</div>;
  }

  return (
    <table className="lead-table">
      <thead>
        <tr>
          <th>Lead</th>
          <th>Contact</th>
          <th>Status</th>
          <th>Value</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {leads.map((lead) => (
          <LeadItem
            key={lead._id}
            lead={lead}
            onEdit={onEdit}
            onDelete={onDelete}
            onStatusChange={onStatusChange}
          />
        ))}
      </tbody>
    </table>
  );
}
