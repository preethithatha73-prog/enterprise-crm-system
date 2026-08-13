export default function Dashboard({ stats, loading }) {
  if (loading) {
    return <div className="dashboard-grid">Loading stats...</div>;
  }

  if (!stats) return null;

  const cards = [
    { label: "Total Leads", value: stats.totalLeads },
    { label: "Total Customers", value: stats.totalCustomers },
    { label: "Pipeline Value", value: `$${stats.totalPipelineValue.toLocaleString()}` },
    { label: "Conversion Rate", value: `${stats.conversionRate}%` },
  ];

  return (
    <div>
      <div className="dashboard-grid">
        {cards.map((c) => (
          <div className="stat-card" key={c.label}>
            <div className="stat-value">{c.value}</div>
            <div className="stat-label">{c.label}</div>
          </div>
        ))}
      </div>

      <div className="status-breakdown">
        {Object.entries(stats.leadsByStatus).map(([status, count]) => (
          <span key={status} className={`status-pill status-${status.toLowerCase()}`}>
            {status}: {count}
          </span>
        ))}
      </div>
    </div>
  );
}
