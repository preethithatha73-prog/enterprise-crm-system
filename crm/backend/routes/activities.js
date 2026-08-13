const express = require("express");
const router = express.Router();
const Activity = require("../models/Activity");
const { asyncHandler } = require("../middleware/errorHandler");

// GET /api/activities  (supports ?relatedLead=<id> or ?relatedCustomer=<id>)
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const { relatedLead, relatedCustomer } = req.query;
    const filter = {};
    if (relatedLead) filter.relatedLead = relatedLead;
    if (relatedCustomer) filter.relatedCustomer = relatedCustomer;

    const activities = await Activity.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, count: activities.length, data: activities });
  })
);

// POST /api/activities
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const activity = await Activity.create(req.body);
    res.status(201).json({ success: true, data: activity });
  })
);

// PUT /api/activities/:id
router.put(
  "/:id",
  asyncHandler(async (req, res) => {
    const activity = await Activity.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!activity) {
      res.status(404);
      throw new Error("Activity not found");
    }
    res.json({ success: true, data: activity });
  })
);

// DELETE /api/activities/:id
router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const activity = await Activity.findByIdAndDelete(req.params.id);
    if (!activity) {
      res.status(404);
      throw new Error("Activity not found");
    }
    res.json({ success: true, data: {} });
  })
);

module.exports = router;
