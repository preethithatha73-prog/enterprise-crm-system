const express = require("express");
const router = express.Router();

const Deal = require("../models/Deal");
const { asyncHandler } = require("../middleware/errorHandler");

// GET /api/deals
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const deals = await Deal.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      count: deals.length,
      data: deals,
    });
  })
);

// GET /api/deals/:id
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const deal = await Deal.findById(req.params.id);

    if (!deal) {
      res.status(404);
      throw new Error("Deal not found");
    }

    res.json({
      success: true,
      data: deal,
    });
  })
);

// POST /api/deals
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const deal = await Deal.create(req.body);

    res.status(201).json({
      success: true,
      data: deal,
    });
  })
);

// PUT /api/deals/:id
router.put(
  "/:id",
  asyncHandler(async (req, res) => {
    const deal = await Deal.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!deal) {
      res.status(404);
      throw new Error("Deal not found");
    }

    res.json({
      success: true,
      data: deal,
    });
  })
);

// DELETE /api/deals/:id
router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const deal = await Deal.findByIdAndDelete(req.params.id);

    if (!deal) {
      res.status(404);
      throw new Error("Deal not found");
    }

    res.json({
      success: true,
      data: {},
    });
  })
);

module.exports = router;