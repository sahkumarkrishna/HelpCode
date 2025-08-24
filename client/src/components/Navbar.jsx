// src/components/Navbar.jsx
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import ProfileIcon from "../pages/ProfileIcon"; // ✅ correct import
import { useState, useEffect } from "react";

const Navbar = () => {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login state
  useEffect(() => {
    const checkLogin = () => {
      setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    };

    checkLogin(); // check on mount & location change

    window.addEventListener("storage", checkLogin); // listen to storage events

    return () => window.removeEventListener("storage", checkLogin);
  }, [location]);

  const navItems = [
    { name: "Login", path: "/login" },
    { name: "Signup", path: "/signup" },
  ];

  return (
    <motion.nav
      className="w-full shadow-lg backdrop-blur-md fixed top-0 left-0 z-50 bg-gradient-to-r from-indigo-500 to-pink-600"
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-white hover:text-yellow-300 transition"
        >
          HelpCode
        </Link>

        <div className="flex items-center space-x-6">
          {navItems
            .filter((item) => !(isLoggedIn && (item.name === "Login" || item.name === "Signup")))
            .map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.1, y: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link
                  to={item.path}
                  className="text-white font-medium hover:text-yellow-300 transition"
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}

          {/* ✅ Only show ProfileIcon when logged in */}
          {isLoggedIn && <ProfileIcon />}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
