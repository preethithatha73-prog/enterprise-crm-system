import { useEffect, useState } from "react";
import { customersApi, getErrorMessage } from "../api/api";

export default function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCustomers = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await customersApi.getAll();
      setCustomers(res.data.data || []);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  if (loading) {
    return <p>Loading customers...</p>;
  }

  return (
    <div className="card">
      <div className="list-header">
        <h3>Customers</h3>

        <button onClick={fetchCustomers}>
          Refresh
        </button>
      </div>

      {error && (
        <p className="alert alert-error">
          {error}
        </p>
      )}

      {customers.length === 0 ? (
        <p>No customers found.</p>
      ) : (
        <div>
          {customers.map((customer) => (
            <div key={customer._id} className="lead-item">

              <h4>
                {customer.name}
              </h4>

              <p>
                <strong>Email:</strong> {customer.email}
              </p>

              <p>
                <strong>Phone:</strong> {customer.phone}
              </p>

              <p>
                <strong>Company:</strong> {customer.companyName}
              </p>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}