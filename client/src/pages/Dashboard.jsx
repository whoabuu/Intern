import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Trash2, PlusCircle } from "lucide-react";

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [formData, setFormData] = useState({ carModel: "", date: "" });

  // Fetch Bookings
  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(
        "http://localhost:5000/api/v1/bookings",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setBookings(data);
    } catch (err) {
      toast.error("Failed to fetch bookings");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Create Booking
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:5000/api/v1/bookings", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Booking Added");
      setFormData({ carModel: "", date: "" });
      fetchBookings();
    } catch (err) {
      toast.error("Error adding booking");
    }
  };

  // Delete Booking
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/v1/bookings/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Booking Deleted");
      fetchBookings();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Vehicle Maintenance Dashboard</h1>

      {/* Create Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-zinc-900 p-6 rounded-lg mb-8 flex gap-4 items-end"
      >
        <div className="flex-1">
          <label className="block text-gray-400 text-sm mb-1">Car Model</label>
          <input
            type="text"
            placeholder="e.g. Tesla Model 3"
            className="w-full bg-zinc-800 p-2 rounded text-white border border-zinc-700"
            value={formData.carModel}
            onChange={(e) =>
              setFormData({ ...formData, carModel: e.target.value })
            }
            required
          />
        </div>
        <div className="flex-1">
          <label className="block text-gray-400 text-sm mb-1">
            Service Date
          </label>
          <input
            type="date"
            className="w-full bg-zinc-800 p-2 rounded text-white border border-zinc-700"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-orange-500 hover:bg-orange-600 px-6 py-2 rounded text-white flex items-center gap-2"
        >
          <PlusCircle size={18} /> Add
        </button>
      </form>

      {/* List View */}
      <div className="space-y-4">
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="bg-zinc-900 p-4 rounded-lg flex justify-between items-center border border-zinc-800 hover:border-orange-500/50 transition-colors"
          >
            <div>
              <h3 className="font-bold text-lg">{booking.carModel}</h3>
              <p className="text-gray-400 text-sm">
                {booking.date} •{" "}
                <span className="text-yellow-500">{booking.status}</span>
              </p>
            </div>
            <button
              onClick={() => handleDelete(booking._id)}
              className="text-red-500 hover:bg-red-500/10 p-2 rounded"
            >
              <Trash2 size={20} />
            </button>
          </div>
        ))}
        {bookings.length === 0 && (
          <p className="text-center text-gray-500">No bookings found.</p>
        )}
      </div>
    </div>
  );
};
export default Dashboard;
