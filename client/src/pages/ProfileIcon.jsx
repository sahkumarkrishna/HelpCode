// src/pages/ProfileIcon.jsx
import { useState, useRef, useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import { FiLogOut, FiClock } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";

const API_URL = import.meta.env.VITE_USER_API; // Make sure this points to your backend

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
      await axios.post(`${API_URL}/logout`, {}, {
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
        className="flex items-center justify-center p-2 rounded-full hover:bg-gray-100 transition"
      >
        <CgProfile className="text-gray-700" size={32} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -5 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-48  shadow-xl rounded-xl border p-2 z-50"
          >
            <Link
              to="/profile"
              className="flex items-center gap-3 px-4 py-2 rounded-lg transition text-white hover:text-gray-400 hover:text-lg"
              onClick={() => setOpen(false)}
            >
              <CgProfile size={18} /> Profile
            </Link>


            <hr className="my-2 border-gray-200" />

            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 px-4 py-2 rounded-lg  transition text-red-400 hover:text-lg"
            >
              <FiLogOut size={18} /> Logout
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
