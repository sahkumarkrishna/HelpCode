import { useState, useEffect } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export default function FeaturesSection() {
  const features = [
    {
      title: "AI-Powered Code Assistance",
      description:
        "Receive instant code solutions, suggestions, and improvements with AI.",
      icon: "🤖",
    },
    {
      title: "Real-Time Code Reviews",
      description:
        "Get in-depth code reviews instantly to improve your coding quality.",
      icon: "📝",
    },
    {
      title: "Optimized Coding Practices",
      description:
        "Learn optimal ways to write code with expert insights and tips.",
      icon: "⚙️",
    },
    {
      title: "Completely Free",
      description:
        "Full access at zero cost — no hidden fees, no subscriptions. Just pure coding power, instantly available.",
      icon: "💸",
    },
    {
      title: "Advanced Debugging Tools",
      description:
        "Use advanced tools to track and fix errors effectively and efficiently.",
      icon: "🐞",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % features.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + features.length) % features.length);
  };

  // ✅ Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <section className="py-16">
      <div className="max-w-5xl mx-auto px-6 text-center">
        {/* Title */}
        <h2 className="text-3xl font-bold text-yellow-400">Key Features</h2>
        <p className="text-gray-300 mt-3 text-base sm:text-lg">
          Explore how HelpCode enhances your development workflow. From AI
          assistance to debugging, every feature is built to help you code
          smarter and faster.
        </p>

        {/* Carousel */}
        <div className="relative mt-12 flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="p-8 w-full sm:w-3/4 lg:w-2/3 rounded-lg border shadow-lg"
            >
              <div className="text-5xl">{features[currentIndex].icon}</div>
              <h3 className="text-2xl font-semibold mt-4">
                {features[currentIndex].title}
              </h3>
              <p className="text-white mt-2 text-sm sm:text-base">
                {features[currentIndex].description}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Arrows with motion */}
          <motion.button
            whileHover={{ scale: 1.2, backgroundColor: "rgba(255,255,255,0.1)" }}
            whileTap={{ scale: 0.9 }}
            onClick={prevSlide}
            className="absolute left-2 sm:left-[-3rem] border rounded-full p-4 shadow-md transition"
          >
            <FiArrowLeft size={24} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.2, backgroundColor: "rgba(255,255,255,0.1)" }}
            whileTap={{ scale: 0.9 }}
            onClick={nextSlide}
            className="absolute right-2 sm:right-[-3rem] border rounded-full p-4 shadow-md transition"
          >
            <FiArrowRight size={24} />
          </motion.button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-6 space-x-2">
          {features.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition ${
                index === currentIndex ? "bg-yellow-400" : "bg-gray-500"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
