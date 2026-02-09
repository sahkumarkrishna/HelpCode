import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ProfileIcon from "../pages/ProfileIcon";
import { useState, useEffect } from "react";
import { FaCode, FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const checkLogin = () => {
      setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    };
    checkLogin();
    window.addEventListener("storage", checkLogin);
    return () => window.removeEventListener("storage", checkLogin);
  }, [location]);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "AI Chat", path: "/ai-chat" },
    { name: "Code Review", path: "/CodeReview" },
    { name: "DSA Helper", path: "/dsa-helper" },
    { name: "Login", path: "/login" },
    { name: "Signup", path: "/signup" },
  ];

  return (
    <motion.nav
      className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/10 backdrop-blur-xl shadow-2xl border-b border-white/10"
          : "bg-transparent backdrop-blur-md"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group z-50">
          <motion.div
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-yellow-400 to-pink-500 p-2 rounded-lg shadow-lg"
          >
            <FaCode className="text-gray-900 text-lg sm:text-xl" />
          </motion.div>
          <span className="text-lg sm:text-xl md:text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-pink-500 group-hover:from-pink-500 group-hover:to-yellow-400 transition-all duration-300">
            HelpCode AI
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
          {navItems
            .filter((item) => {
              if (isLoggedIn && (item.name === "Login" || item.name === "Signup")) return false;
              if (!isLoggedIn && !["Home", "About", "Login", "Signup"].includes(item.name)) return false;
              return true;
            })
            .map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link
                  to={item.path}
                  className={`flex items-center gap-2 text-white font-semibold hover:text-yellow-400 transition-all duration-300 px-3 lg:px-4 py-2 rounded-lg hover:bg-white/10 ${
                    location.pathname === item.path ? "bg-white/10 text-yellow-400" : ""
                  }`}
                >
                  <span className="text-sm lg:text-base">{item.name}</span>
                </Link>
              </motion.div>
            ))}

          {isLoggedIn && <ProfileIcon />}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-3">
          {isLoggedIn ? (
            <ProfileIcon />
          ) : (
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white text-xl p-2 rounded-lg hover:bg-white/10 transition"
            >
              {mobileMenuOpen ? <FaTimes /> : <FaBars />}
            </motion.button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white/10 backdrop-blur-xl border-t border-white/10 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-3">
              {navItems
                .filter((item) => {
                  if (isLoggedIn && (item.name === "Login" || item.name === "Signup")) return false;
                  if (!isLoggedIn && !["Home", "About", "Login", "Signup"].includes(item.name)) return false;
                  return true;
                })
                .map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 text-white font-semibold text-base px-4 py-3 rounded-lg hover:bg-white/10 hover:text-yellow-400 transition ${
                        location.pathname === item.path ? "bg-white/10 text-yellow-400" : ""
                      }`}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
