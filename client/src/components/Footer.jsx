import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Footer = () => {
  const socialLinks = [
    { icon: <FaFacebookF size={20} />, url: "#" },
    { icon: <FaTwitter size={20} />, url: "#" },
    { icon: <FaLinkedinIn size={20} />, url: "#" },
    { icon: <FaGithub size={20} />, url: "#" },
  ];

  return (
    <footer className="bg-gradient-to-r from-indigo-600 to-pink-600 text-white py-8 mt-10">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold mb-2">HelpCode</h2>
          <p className="text-sm opacity-80">
            HelpCode <br />
            Your AI-powered coding companion for smart, efficient, and clean
            development.
          </p>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-yellow-300 transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-yellow-300 transition">
                Login
              </Link>
            </li>
            <li>
              <Link to="/signup" className="hover:text-yellow-300 transition">
                Signup
              </Link>
            </li>
          </ul>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <p className="mb-3">Email: kumarkrishna9801552@gmail.com</p>
          <div className="flex space-x-4">
            {socialLinks.map((s, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.3, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
              >
                <Link to={s.url} className="hover:text-yellow-300 transition">
                  {s.icon}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mt-8 border-t border-white/20 pt-4 text-center text-sm opacity-80"
      >
        © {new Date().getFullYear()} HelpCode. All rights reserved.
      </motion.div>
    </footer>
  );
};

export default Footer;
