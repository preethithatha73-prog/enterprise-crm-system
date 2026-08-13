import { useState, useEffect, useCallback } from "react";

import {
  leadsApi,
  dashboardApi,
  getErrorMessage,
} from "./api/api";

import Dashboard from "./components/Dashboard";
import LeadForm from "./components/LeadForm";
import LeadList from "./components/LeadList";
import StatusFilter from "./components/StatusFilter";

import CustomerForm from "./components/CustomerForm";
import CustomerList from "./components/CustomerList";

import DealForm from "./components/DealForm";
import DealList from "./components/DealList";

import ActivityForm from "./components/ActivityForm";
import ActivityList from "./components/ActivityList";

export default function App() {
  // -----------------------------
  // Leads
  // -----------------------------

  const [leads, setLeads] = useState([]);

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [search, setSearch] = useState("");

  const [editingLead, setEditingLead] =
    useState(null);

  // -----------------------------
  // Dashboard
  // -----------------------------

  const [stats, setStats] = useState(null);

  // -----------------------------
  // Loading states
  // -----------------------------

  const [loadingLeads, setLoadingLeads] =
    useState(true);

  const [loadingStats, setLoadingStats] =
    useState(true);

  const [submitting, setSubmitting] =
    useState(false);

  // -----------------------------
  // Messages
  // -----------------------------

  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  // -----------------------------
  // Fetch Leads
  // -----------------------------

  const fetchLeads = useCallback(async () => {
    setLoadingLeads(true);
    setError("");

    try {
      const params = {};

      // Status filter
      if (statusFilter !== "All") {
        params.status = statusFilter;
      }

      // Search filter
      if (search.trim()) {
        params.search = search.trim();
      }

      const res = await leadsApi.getAll(params);

      setLeads(res.data.data || []);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoadingLeads(false);
    }
  }, [statusFilter, search]);

  // -----------------------------
  // Fetch Dashboard Statistics
  // -----------------------------

  const fetchStats = useCallback(async () => {
    setLoadingStats(true);

    try {
      const res =
        await dashboardApi.getStats();

      setStats(res.data.data);
    } catch (err) {
      setError(
        (prev) =>
          prev || getErrorMessage(err)
      );
    } finally {
      setLoadingStats(false);
    }
  }, []);

  // -----------------------------
  // Load Leads
  // -----------------------------

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  // -----------------------------
  // Load Dashboard
  // -----------------------------

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  // -----------------------------
  // Auto hide notification
  // -----------------------------

  useEffect(() => {
    if (!notice) return;

    const timer = setTimeout(() => {
      setNotice("");
    }, 3000);

    return () => clearTimeout(timer);
  }, [notice]);

  // -----------------------------
  // Refresh everything
  // -----------------------------

  const refreshAll = async () => {
    await Promise.all([
      fetchLeads(),
      fetchStats(),
    ]);
  };

  // -----------------------------
  // Create / Update Lead
  // -----------------------------

  const handleCreateOrUpdate = async (
    formData
  ) => {
    setSubmitting(true);
    setError("");

    try {
      if (editingLead) {
        await leadsApi.update(
          editingLead._id,
          formData
        );

        setNotice("Lead updated.");

        setEditingLead(null);
      } else {
        await leadsApi.create(formData);

        setNotice("Lead added.");
      }

      await refreshAll();
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  // -----------------------------
  // Delete Lead
  // -----------------------------

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Delete this lead? This cannot be undone."
      )
    ) {
      return;
    }

    setError("");

    try {
      await leadsApi.remove(id);

      setNotice("Lead deleted.");

      if (editingLead?._id === id) {
        setEditingLead(null);
      }

      await refreshAll();
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  // -----------------------------
  // Change Lead Status
  // -----------------------------

  const handleStatusChange = async (
    id,
    status
  ) => {
    setError("");

    try {
      await leadsApi.update(id, {
        status,
      });

      setNotice("Lead status updated.");

      await refreshAll();
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  // -----------------------------
  // Customer Refresh
  // -----------------------------

  const handleCustomerSuccess = () => {
    setNotice("Customer added successfully.");
  };

  // -----------------------------
  // Deal Refresh
  // -----------------------------

  const handleDealSuccess = () => {
    setNotice("Deal added successfully.");

    fetchStats();
  };

  // -----------------------------
  // Activity Refresh
  // -----------------------------

  const handleActivitySuccess = () => {
    setNotice("Activity added successfully.");
  };

  // -----------------------------
  // UI
  // -----------------------------

  return (
    <div className="app-shell">

      {/* Header */}

      <header className="app-header">
        <h1>CRM Dashboard</h1>

        <p>
          Manage leads, customers, deals,
          and sales activities.
        </p>
      </header>

      {/* Error */}

      {error && (
        <div className="alert alert-error">
          {error}

          <button
            className="alert-close"
            onClick={() => setError("")}
          >
            &times;
          </button>
        </div>
      )}

      {/* Success */}

      {notice && (
        <div className="alert alert-success">
          {notice}
        </div>
      )}

      {/* Dashboard */}

      <section>
        <Dashboard
          stats={stats}
          loading={loadingStats}
        />
      </section>

      {/* ========================= */}
      {/* LEADS SECTION */}
      {/* ========================= */}

      <section className="content-grid">

        {/* Lead Form */}

        <div>
          <LeadForm
            onSubmit={
              handleCreateOrUpdate
            }
            editingLead={editingLead}
            onCancelEdit={() =>
              setEditingLead(null)
            }
            submitting={submitting}
          />
        </div>

        {/* Lead List */}

        <div>

          <div className="list-header">

            <h3>Leads</h3>

            {/* Search */}

            <input
              type="text"
              placeholder="Search name, email, or company..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

            {/* Status Filter */}

            <StatusFilter
              value={statusFilter}
              onChange={setStatusFilter}
            />

          </div>

          <LeadList
            leads={leads}
            loading={loadingLeads}
            onEdit={setEditingLead}
            onDelete={handleDelete}
            onStatusChange={
              handleStatusChange
            }
          />

        </div>

      </section>

      {/* ========================= */}
      {/* CUSTOMERS SECTION */}
      {/* ========================= */}

      <section className="content-grid">

        <div>
          <CustomerForm
            onSuccess={
              handleCustomerSuccess
            }
          />
        </div>

        <div>
          <CustomerList />
        </div>

      </section>

      {/* ========================= */}
      {/* DEALS SECTION */}
      {/* ========================= */}

      <section className="content-grid">

        <div>
          <DealForm
            onSuccess={
              handleDealSuccess
            }
          />
        </div>

        <div>
          <DealList />
        </div>

      </section>

      {/* ========================= */}
      {/* ACTIVITIES SECTION */}
      {/* ========================= */}

      <section className="content-grid">

        <div>
          <ActivityForm
            onSuccess={
              handleActivitySuccess
            }
          />
        </div>

        <div>
          <ActivityList />
        </div>

      </section>

    </div>
  );
}
