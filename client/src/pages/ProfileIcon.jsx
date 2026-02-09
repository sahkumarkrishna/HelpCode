import { useState, useRef, useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import { FiLogOut } from "react-icons/fi";
import { FaRocket } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";
import API_ENDPOINTS from "../config/api";

export default function ProfileIcon() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Logout API call
  const handleLogout = async () => {
    try {
      // Call backend logout endpoint
      await axios.post(API_ENDPOINTS.AUTH.LOGOUT, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // if using JWT
        },
      });

      // Clear localStorage
      localStorage.removeItem("token"); // JWT or auth token
      localStorage.setItem("isLoggedIn", "false");
      window.dispatchEvent(new Event("storage")); // notify Navbar

      toast.success("Logged out successfully");
      setOpen(false);
      navigate("/");
    } catch (error) {
      console.error("Logout Error:", error);
      toast.error("Logout failed. Try again.");
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-center p-2 rounded-full hover:bg-white/20 transition"
      >
        <CgProfile className="text-white" size={32} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -5 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-56 bg-white/10 backdrop-blur-xl shadow-xl rounded-xl border border-white/20 p-2 z-50 max-h-96 overflow-y-auto custom-scrollbar"
          >
            <Link
              to="/dashboard"
              className="flex items-center gap-3 px-4 py-2 rounded-lg transition text-white hover:bg-white/10 text-sm"
              onClick={() => setOpen(false)}
            >
              <FaRocket size={16} /> Dashboard
            </Link>

            <Link
              to="/profile"
              className="flex items-center gap-3 px-4 py-2 rounded-lg transition text-white hover:bg-white/10 text-sm"
              onClick={() => setOpen(false)}
            >
              <CgProfile size={18} /> Profile
            </Link>


            <hr className="my-2 border-white/20" />

            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 px-4 py-2 rounded-lg transition text-red-400 hover:bg-red-500/20 text-sm"
            >
              <FiLogOut size={18} /> Logout
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
