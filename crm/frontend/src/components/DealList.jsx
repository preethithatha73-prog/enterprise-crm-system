import { useEffect, useState } from "react";
import { dealsApi, getErrorMessage } from "../api/api";

export default function DealList() {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDeals = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await dealsApi.getAll();
      setDeals(res.data.data || []);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeals();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this deal?")) {
      return;
    }

    try {
      await dealsApi.remove(id);
      await fetchDeals();
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  const handleStageChange = async (id, stage) => {
    try {
      await dealsApi.update(id, { stage });
      await fetchDeals();
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  if (loading) {
    return <p>Loading deals...</p>;
  }

  return (
    <div className="card">
      <div className="list-header">
        <h3>Deals</h3>

        <button onClick={fetchDeals}>
          Refresh
        </button>
      </div>

      {error && (
        <div className="alert alert-error">
          {error}
        </div>
      )}

      {deals.length === 0 ? (
        <p>No deals found.</p>
      ) : (
        <div>
          {deals.map((deal) => (
            <div
              key={deal._id}
              className="lead-item"
            >
              <h4>{deal.title}</h4>

              <p>
                <strong>Value:</strong> $
                {Number(deal.value).toLocaleString()}
              </p>

              <p>
                <strong>Stage:</strong>{" "}
                {deal.stage}
              </p>

              {deal.description && (
                <p>
                  <strong>Description:</strong>{" "}
                  {deal.description}
                </p>
              )}

              <div>
                <label>
                  Change stage:{" "}
                  <select
                    value={deal.stage}
                    onChange={(e) =>
                      handleStageChange(
                        deal._id,
                        e.target.value
                      )
                    }
                  >
                    <option value="New">
                      New
                    </option>

                    <option value="Contacted">
                      Contacted
                    </option>

                    <option value="Qualified">
                      Qualified
                    </option>

                    <option value="Won">
                      Won
                    </option>

                    <option value="Lost">
                      Lost
                    </option>
                  </select>
                </label>
              </div>

              <br />

              <button
                onClick={() =>
                  handleDelete(deal._id)
                }
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}