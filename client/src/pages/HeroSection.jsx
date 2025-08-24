import React from "react";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";

export default function HeroSection() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
      {/* Primary Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-2 px-4 py-2 bg-purple-300/40 rounded-full text-purple-900 font-medium"
      >
        The Best Coding Buddy You Have
      </motion.div>

    
      {/* Main Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl md:text-6xl font-extrabold mb-3"
      >
        Solve, Optimize &{" "}
        <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-yellow-400">
          Review
        </span>{" "}
        Your Code
      </motion.h1>

      {/* Subheading */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="text-lg md:text-xl max-w-2xl mb-8 opacity-90"
      >
        Supercharged by AI, crafted for developers. Refactor, analyze, and debug code with intelligent assistance — all in one seamless platform.
      </motion.p>

      {/* Info Box with Typewriter */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="bg-[#0D1B2A] text-left font-mono text-sm md:text-base text-green-400 px-6 py-4 mt-6 rounded-lg shadow-md w-full max-w-2xl mx-auto border border-[#1A2B3C]"
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
