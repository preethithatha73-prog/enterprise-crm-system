const express = require("express");
const router = express.Router();
const Lead = require("../models/Lead");
const { asyncHandler } = require("../middleware/errorHandler");

// GET /api/leads  (supports ?status=New&search=acme)
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const { status, search } = req.query;
    const filter = {};

    if (status && Lead.STATUSES.includes(status)) {
      filter.status = status;
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { company: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    const leads = await Lead.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, count: leads.length, data: leads });
  })
);

// GET /api/leads/:id
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      res.status(404);
      throw new Error("Lead not found");
    }
    res.json({ success: true, data: lead });
  })
);

// POST /api/leads
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const lead = await Lead.create(req.body);
    res.status(201).json({ success: true, data: lead });
  })
);

// PUT /api/leads/:id
router.put(
  "/:id",
  asyncHandler(async (req, res) => {
    const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!lead) {
      res.status(404);
      throw new Error("Lead not found");
    }
    res.json({ success: true, data: lead });
  })
);

// DELETE /api/leads/:id
router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    if (!lead) {
      res.status(404);
      throw new Error("Lead not found");
    }
    res.json({ success: true, data: {} });
  })
);

module.exports = router;
