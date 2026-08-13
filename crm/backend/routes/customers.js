const express = require("express");
const router = express.Router();
const Customer = require("../models/Customer");
const { asyncHandler } = require("../middleware/errorHandler");

// GET /api/customers
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const customers = await Customer.find().sort({ createdAt: -1 });
    res.json({ success: true, count: customers.length, data: customers });
  })
);

// GET /api/customers/:id
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      res.status(404);
      throw new Error("Customer not found");
    }
    res.json({ success: true, data: customer });
  })
);

// POST /api/customers
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const customer = await Customer.create(req.body);
    res.status(201).json({ success: true, data: customer });
  })
);

// PUT /api/customers/:id
router.put(
  "/:id",
  asyncHandler(async (req, res) => {
    const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!customer) {
      res.status(404);
      throw new Error("Customer not found");
    }
    res.json({ success: true, data: customer });
  })
);

// DELETE /api/customers/:id
router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if (!customer) {
      res.status(404);
      throw new Error("Customer not found");
    }
    res.json({ success: true, data: {} });
  })
);

module.exports = router;
