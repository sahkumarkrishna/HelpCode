import React from "react";
import { motion } from "framer-motion";
import aboutImage from "../assets/AI.png";
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

export default function AboutSection() {
  const highlights = [
    "AI-Powered Code Reviews",
    "Real-Time Debugging",
    "Multi-Language Support",
    "24/7 Coding Mentor"
  ];

  return (
    <section className="text-white px-6 py-20 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-16 relative z-10">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2 text-left space-y-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-5xl md:text-6xl font-extrabold leading-tight mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">About</span>{" "}
              <span className="text-white">HelpCode</span>
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-lg md:text-xl text-gray-200 leading-relaxed"
          >
            HelpCode is your intelligent AI-powered coding companion built to guide,
            optimize, and review your code — whenever you need it.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-base md:text-lg text-gray-300"
          >
            Whether you're just starting your journey or you're a seasoned engineer,
            HelpCode provides real-time assistance that improves the way you code and learn.
          </motion.p>

          {/* Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-2 gap-4 py-4"
          >
            {highlights.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + idx * 0.1 }}
                className="flex items-center gap-2"
              >
                <FaCheckCircle className="text-green-400 text-xl" />
                <span className="text-white font-medium">{item}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Button */}
          <Link to="/codereview">
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
              className="mt-6 px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-bold rounded-xl shadow-2xl text-lg"
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(251, 191, 36, 0.4)" }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started →
            </motion.button>
          </Link>
        </motion.div>

        {/* Image Content with Animation */}
        <motion.div
          className="md:w-1/2"
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.div
            whileHover={{ scale: 1.05, rotate: 2 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-3xl blur-2xl opacity-30" />
            <img
              src={aboutImage}
              alt="AI helping a developer"
              className="rounded-3xl w-full shadow-2xl relative z-10 border-4 border-white/10"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
