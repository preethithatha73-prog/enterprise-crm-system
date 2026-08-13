import { useEffect, useState } from "react";
import {
  activitiesApi,
  leadsApi,
  customersApi,
  getErrorMessage,
} from "../api/api";

export default function ActivityList() {
  const [activities, setActivities] = useState([]);
  const [leads, setLeads] = useState([]);
  const [customers, setCustomers] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchActivities = async () => {
    setLoading(true);
    setError("");

    try {
      const [activitiesRes, leadsRes, customersRes] =
        await Promise.all([
          activitiesApi.getAll(),
          leadsApi.getAll(),
          customersApi.getAll(),
        ]);

      setActivities(activitiesRes.data.data || []);
      setLeads(leadsRes.data.data || []);
      setCustomers(customersRes.data.data || []);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const getLeadName = (leadId) => {
    if (!leadId) return "None";

    const lead = leads.find(
      (item) => item._id === leadId
    );

    return lead
      ? lead.name
      : leadId;
  };

  const getCustomerName = (customerId) => {
    if (!customerId) return "None";

    const customer = customers.find(
      (item) => item._id === customerId
    );

    return customer
      ? customer.companyName
      : customerId;
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Delete this activity?"
      )
    ) {
      return;
    }

    try {
      await activitiesApi.remove(id);
      await fetchActivities();
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  const handleStatusChange = async (
    id,
    status
  ) => {
    try {
      await activitiesApi.update(id, {
        status,
      });

      await fetchActivities();
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  if (loading) {
    return (
      <div className="card">
        <h3>Activities</h3>
        <p>Loading activities...</p>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="list-header">
        <h3>Activities</h3>

        <button onClick={fetchActivities}>
          Refresh
        </button>
      </div>

      {error && (
        <div className="alert alert-error">
          {error}
        </div>
      )}

      {activities.length === 0 ? (
        <p>No activities found.</p>
      ) : (
        <div>
          {activities.map((activity) => (
            <div
              key={activity._id}
              className="lead-item"
            >
              <h4>{activity.subject}</h4>

              <p>
                <strong>Type:</strong>{" "}
                {activity.type}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {activity.status}
              </p>

              {activity.description && (
                <p>
                  <strong>
                    Description:
                  </strong>{" "}
                  {activity.description}
                </p>
              )}

              {activity.relatedLead && (
                <p>
                  <strong>
                    Related Lead:
                  </strong>{" "}
                  {getLeadName(
                    activity.relatedLead
                  )}
                </p>
              )}

              {activity.relatedCustomer && (
                <p>
                  <strong>
                    Related Customer:
                  </strong>{" "}
                  {getCustomerName(
                    activity.relatedCustomer
                  )}
                </p>
              )}

              <div>
                <label>
                  Change status:{" "}
                </label>

                <select
                  value={activity.status}
                  onChange={(e) =>
                    handleStatusChange(
                      activity._id,
                      e.target.value
                    )
                  }
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

                <button
                  onClick={() =>
                    handleDelete(
                      activity._id
                    )
                  }
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}