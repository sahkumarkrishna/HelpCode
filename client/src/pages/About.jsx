import React from "react";
import { motion } from "framer-motion";
import aboutImage from "../assets/AI.png"; // Ensure path is correct
import { Link } from "react-router-dom";

export default function AboutSection() {
  return (
    <section className="text-white  px-6 py-16">
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-12">

        {/* Text Content */}
        <div className="md:w-1/2 text-left space-y-6">
          <h2 className="text-4xl font-bold leading-tight">
            <span className="text-yellow-400">About</span>{" "}
            <span className="text-white">HelpCode</span>
          </h2>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <p className="text-lg opacity-90">
              HelpCode is your intelligent AI-powered coding companion built to guide,
              optimize, and review your code — whenever you need it.
            </p>
            <p className="text-base opacity-80">
              Whether you’re just starting your journey or you're a seasoned engineer,
              HelpCode provides real-time assistance that improves the way you code and learn.
            </p>
            <p className="text-base opacity-80">
              Our platform offers AI-powered reviews, debugging, and optimization tips for
              JavaScript, Python, Java, C++, and more.
            </p>
            <p className="text-base opacity-80">
              Think of HelpCode as your 24/7 coding mentor — ready to explain, fix, and
              improve your work.
            </p>
          </motion.div>

          {/* Button */}
          <Link to="/codereview">
            <motion.button
              className="mt-4 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-lg shadow-md"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Get Started
            </motion.button>
          </Link>

        </div>

        {/* Image Content with Animation */}
        <motion.div
          className="md:w-1/2"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.img
            src={aboutImage}
            alt="AI helping a developer"
            className="rounded-xl w-full shadow-lg"
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 200 }}
          />
        </motion.div>
      </div>
    </section>
  );
}
