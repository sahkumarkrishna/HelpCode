import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaArrowRight } from "react-icons/fa";
import toast from "react-hot-toast";
import axios from "axios";
import API_ENDPOINTS from "../config/api";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      toast.error("All fields are required!");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post(API_ENDPOINTS.AUTH.SIGNUP, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      });

      toast.success(data.message || "Signup Successful 🎉");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
      console.error("Signup Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen relative overflow-hidden py-12">
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
        initial={{ opacity: 0, y: -60, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md p-10 rounded-3xl shadow-2xl bg-white/10 backdrop-blur-2xl border border-white/20 relative z-10"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-pink-500 mb-2"
          >
            Create Account
          </motion.h2>
          <p className="text-gray-300">Join thousands of developers today</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="relative"
          >
            <FaUser className="absolute left-4 top-4 text-gray-400" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all backdrop-blur-md"
            />
          </motion.div>

          {/* Email */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="relative"
          >
            <FaEnvelope className="absolute left-4 top-4 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all backdrop-blur-md"
            />
          </motion.div>

          {/* Password */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="relative"
          >
            <FaLock className="absolute left-4 top-4 text-gray-400" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all backdrop-blur-md"
            />
          </motion.div>

          {/* Confirm Password */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="relative"
          >
            <FaLock className="absolute left-4 top-4 text-gray-400" />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all backdrop-blur-md"
            />
          </motion.div>

          {/* Submit */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(251, 191, 36, 0.4)" }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 text-gray-900 font-bold rounded-xl shadow-2xl hover:shadow-yellow-500/50 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <span>Signing up...</span>
            ) : (
              <>
                Sign Up <FaArrowRight />
              </>
            )}
          </motion.button>
        </form>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 text-center text-gray-300"
        >
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-yellow-400 font-semibold hover:text-yellow-300 transition-colors"
          >
            Login
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
}
