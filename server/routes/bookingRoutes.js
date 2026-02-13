import express from "express";
import Booking from "../models/bookingModels.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * components:
 * schemas:
 * Booking:
 * type: object
 * required:
 * - carModel
 * - date
 * properties:
 * carModel:
 * type: string
 * description: The model of the car (e.g., Tesla Model 3)
 * date:
 * type: string
 * format: date
 * description: Date of booking
 */

/**
 * @swagger
 * /bookings:
 * get:
 * summary: Get all bookings (User sees own, Admin sees all)
 * tags: [Bookings]
 * security:
 * - bearerAuth: []
 * responses:
 * 200:
 * description: List of bookings
 * content:
 * application/json:
 * schema:
 * type: array
 * items:
 * $ref: '#/components/schemas/Booking'
 * 401:
 * description: Unauthorized (Token missing/invalid)
 */
router.get("/", protect, async (req, res) => {
  try {
    let bookings;
    // Admin sees all, User sees only their own
    if (req.user.role === "admin") {
      bookings = await Booking.find().populate("user", "email username");
    } else {
      bookings = await Booking.find({ user: req.user.id });
    }
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /bookings:
 * post:
 * summary: Create a new booking
 * tags: [Bookings]
 * security:
 * - bearerAuth: []
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Booking'
 * responses:
 * 201:
 * description: The booking was successfully created
 * 400:
 * description: Bad request
 */
router.post("/", protect, async (req, res) => {
  try {
    // Save the user ID from the token into the booking
    const newBooking = await Booking.create({
      ...req.body,
      user: req.user.id,
    });
    res.status(201).json(newBooking);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * @swagger
 * /bookings/{id}:
 * delete:
 * summary: Delete a booking (Admin Only)
 * tags: [Bookings]
 * security:
 * - bearerAuth: []
 * parameters:
 * - in: path
 * name: id
 * schema:
 * type: string
 * required: true
 * description: The booking ID
 * responses:
 * 200:
 * description: The booking was deleted
 * 403:
 * description: Forbidden (Not an admin)
 * 404:
 * description: Booking not found
 */
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    await booking.deleteOne();
    res.status(200).json({ message: "Booking removed" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
