import React from "react";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { Link } from "react-router-dom";
import { FaCode, FaRocket } from "react-icons/fa";

export default function HeroSection() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen px-6 text-center relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -top-40 -left-40 w-96 h-96 bg-purple-500 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute -bottom-40 -right-40 w-96 h-96 bg-pink-500 rounded-full blur-3xl"
        />
      </div>

      {/* Primary Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-6 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full text-white font-semibold shadow-lg border border-white/20"
      >
        ✨ The Best Coding Buddy You Have
      </motion.div>

      {/* Main Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight"
      >
        <span className="text-white">Solve, Optimize & </span>
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 animate-pulse">
          Review
        </span>
        <br />
        <span className="text-white">Your Code</span>
      </motion.h1>

      {/* Subheading */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="text-base md:text-lg max-w-3xl mb-10 text-gray-200 leading-relaxed"
      >
        Supercharged by AI, crafted for developers. Refactor, analyze, and debug code with intelligent assistance — all in one seamless platform.
      </motion.p>

      {/* Info Box with Typewriter */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="bg-gray-900/80 backdrop-blur-xl text-left font-mono text-sm md:text-base text-green-400 px-8 py-6 rounded-2xl shadow-2xl w-full max-w-3xl mx-auto border border-green-500/30"
      >
        <Typewriter
          words={[
            "// 💡 Quick Tech Facts:",
            "💡 Java: Write once, run anywhere!",
            "💡 Go: Lightweight concurrency with goroutines.",
            "💡 Python: Great for prototyping and readability.",
            "💡 C++: High performance with low-level control.",
            "💡 JavaScript: Async via event loop.",
          ]}
          loop={true}
          cursor
          cursorStyle="_"
          typeSpeed={65}
          deleteSpeed={40}
          delaySpeed={2000}
        />
      </motion.div>
    </section>
  );
}
