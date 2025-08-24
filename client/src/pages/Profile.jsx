import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const API_URL = import.meta.env.VITE_USER_API;
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("New Password and Confirm Password do not match!");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You are not logged in. Please login again.");
      return;
    }

    // Optional: log the token for debugging
    // console.log("Token being sent:", token);

    try {
      setLoading(true);

      const { data } = await axios.put(
        `${API_URL}/update-profile`,
        { currentPassword, password: newPassword, confirmPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(data.message);
      setNewPassword("");
      setConfirmPassword("");
      setCurrentPassword("");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 backdrop-blur-lg border border-white/30"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6 drop-shadow-md">
          Update Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <motion.div whileFocus={{ scale: 1.02 }} className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700">New Password</label>
            <input
              type="password"
              placeholder="New Password"
              className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </motion.div>

          <motion.div whileFocus={{ scale: 1.02 }} className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700">Confirm New Password</label>
            <input
              type="password"
              placeholder="Confirm New Password"
              className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </motion.div>

          <motion.div whileFocus={{ scale: 1.02 }} className="flex flex-col">
            <label className="mb-1 font-medium text-red-600">Current Password *</label>
            <input
              type="password"
              placeholder="Enter Current Password"
              className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 transition"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl shadow-lg hover:from-purple-700 hover:to-pink-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Updating..." : "Update Password"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Profile;