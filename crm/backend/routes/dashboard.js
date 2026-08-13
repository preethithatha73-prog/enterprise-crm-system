const express = require("express");
const router = express.Router();
const Lead = require("../models/Lead");
const Customer = require("../models/Customer");
const Activity = require("../models/Activity");
const { asyncHandler } = require("../middleware/errorHandler");

// GET /api/dashboard/stats
router.get(
  "/stats",
  asyncHandler(async (req, res) => {
    const [totalLeads, totalCustomers, totalActivities, statusAgg, valueAgg] =
      await Promise.all([
        Lead.countDocuments(),
        Customer.countDocuments(),
        Activity.countDocuments(),
        Lead.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }]),
        Lead.aggregate([{ $group: { _id: null, total: { $sum: "$value" } } }]),
      ]);

    const byStatus = { New: 0, Contacted: 0, Qualified: 0, Closed: 0 };
    statusAgg.forEach((s) => {
      byStatus[s._id] = s.count;
    });

    const closedLeads = byStatus.Closed || 0;
    const conversionRate =
      totalLeads > 0 ? Number(((closedLeads / totalLeads) * 100).toFixed(1)) : 0;

    res.json({
      success: true,
      data: {
        totalLeads,
        totalCustomers,
        totalActivities,
        totalPipelineValue: valueAgg[0]?.total || 0,
        leadsByStatus: byStatus,
        conversionRate,
      },
    });
  })
);

module.exports = router;
