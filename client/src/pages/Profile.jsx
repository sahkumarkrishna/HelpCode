import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FaLock, FaShieldAlt, FaArrowRight } from "react-icons/fa";

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
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-20 left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], rotate: [0, -90, 0] }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute bottom-20 right-20 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl p-10 border border-white/20 relative z-10"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-block p-4 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-full mb-4"
          >
            <FaShieldAlt className="text-4xl text-gray-900" />
          </motion.div>
          <h2 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-pink-500 mb-2">
            Update Password
          </h2>
          <p className="text-gray-300">Keep your account secure</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* New Password */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="relative"
          >
            <FaLock className="absolute left-4 top-4 text-gray-400" />
            <input
              type="password"
              placeholder="New Password"
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all backdrop-blur-md"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </motion.div>

          {/* Confirm New Password */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="relative"
          >
            <FaLock className="absolute left-4 top-4 text-gray-400" />
            <input
              type="password"
              placeholder="Confirm New Password"
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all backdrop-blur-md"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </motion.div>

          {/* Current Password */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="relative"
          >
            <FaLock className="absolute left-4 top-4 text-red-400" />
            <input
              type="password"
              placeholder="Current Password"
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 text-white placeholder-gray-400 border border-red-400/30 focus:outline-none focus:ring-2 focus:ring-red-400 transition-all backdrop-blur-md"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
            <p className="text-red-400 text-xs mt-2">* Required for verification</p>
          </motion.div>

          {/* Submit Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(251, 191, 36, 0.4)" }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 text-gray-900 font-bold rounded-xl shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <span>Updating...</span>
            ) : (
              <>
                Update Password <FaArrowRight />
              </>
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Profile;
