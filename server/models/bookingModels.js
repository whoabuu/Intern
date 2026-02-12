import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  carModel: { type: String, required: true },
  date: { type: String, required: true },
  status: { type: String, default: "Pending" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export default mongoose.model("Booking", BookingSchema);
