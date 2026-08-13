const STATUSES = ["All", "New", "Contacted", "Qualified", "Closed"];

export default function StatusFilter({ value, onChange }) {
  return (
    <div className="status-filter">
      {STATUSES.map((s) => (
        <button
          key={s}
          className={`filter-btn ${value === s ? "active" : ""}`}
          onClick={() => onChange(s)}
          type="button"
        >
          {s}
        </button>
      ))}
    </div>
  );
}
