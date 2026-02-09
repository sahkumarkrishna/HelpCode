import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub, FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Footer = () => {
  const socialLinks = [
    { icon: <FaFacebookF size={20} />, url: "#", color: "hover:bg-blue-600" },
    { icon: <FaTwitter size={20} />, url: "#", color: "hover:bg-sky-500" },
    { icon: <FaLinkedinIn size={20} />, url: "#", color: "hover:bg-blue-700" },
    { icon: <FaGithub size={20} />, url: "#", color: "hover:bg-gray-800" },
  ];

  return (
    <footer className="bg-gray-900/90 backdrop-blur-xl text-white py-12 mt-20 border-t border-white/10">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Brand Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-pink-500 mb-4">
            HelpCode
          </h2>
          <p className="text-gray-300 leading-relaxed">
            Your AI-powered coding companion for smart, efficient, and clean development. 
            Code better, learn faster.
          </p>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-xl font-bold mb-4 text-yellow-400">Quick Links</h3>
          <ul className="space-y-3">
            {[
              { name: "Home", path: "/" },
              { name: "Login", path: "/login" },
              { name: "Signup", path: "/signup" },
            ].map((link, i) => (
              <motion.li key={i} whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                <Link
                  to={link.path}
                  className="text-gray-300 hover:text-yellow-400 transition-colors duration-300 flex items-center gap-2"
                >
                  <span className="text-yellow-400">→</span> {link.name}
                </Link>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-xl font-bold mb-4 text-yellow-400">Connect With Us</h3>
          <p className="text-gray-300 mb-4">
            📧 kumarkrishna9801552@gmail.com
          </p>
          <div className="flex gap-4">
            {socialLinks.map((s, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Link
                  to={s.url}
                  className={`w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white transition-all duration-300 ${s.color}`}
                >
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
        className="mt-12 pt-8 border-t border-white/10 text-center"
      >
        <p className="text-gray-400 flex items-center justify-center gap-2">
          © {new Date().getFullYear()} HelpCode. Made with <FaHeart className="text-red-500 animate-pulse" /> by Developers
        </p>
      </motion.div>
    </footer>
  );
};

export default Footer;
