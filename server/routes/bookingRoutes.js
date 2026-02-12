import express from "express";
import Booking from "../models/bookingModels.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get All Bookings (Read)
router.get("/", protect, async (req, res) => {
  try {
    // If admin, see all. If user, see only theirs.
    const query = req.user.role === "admin" ? {} : { user: req.user.id };
    const bookings = await Booking.find(query);
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create Booking (Create)
router.post("/", protect, async (req, res) => {
  try {
    const newBooking = await Booking.create({ ...req.body, user: req.user.id });
    res.status(201).json(newBooking);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete Booking (Delete)
router.delete("/:id", protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Ensure user owns the booking or is admin
    if (booking.user.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(401).json({ message: "Not authorized" });
    }

    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: "Booking deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
