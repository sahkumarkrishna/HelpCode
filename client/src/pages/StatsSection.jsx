import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

function AnimatedCounter({ value, label, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.8 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      whileHover={{ scale: 1.1, y: -10 }}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-pink-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300" />
      <div className="relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 shadow-2xl">
        <motion.h3
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.5, delay: index * 0.15 + 0.3, type: "spring" }}
          className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent mb-3"
        >
          {value}
        </motion.h3>
        <p className="text-gray-300 font-medium text-base md:text-lg">
          {label}
        </p>
      </div>
    </motion.div>
  );
}

export default function StatsSection() {
  const stats = [
    { value: "5k+", label: "Problems Solved" },
    { value: "3k+", label: "LeetCode Questions Reviewed" },
    { value: "15k+", label: "Code Optimizations" },
    { value: "98%", label: "Success Rate" },
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-pink-500">Impact</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Trusted by thousands of developers worldwide to improve their coding skills
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <AnimatedCounter key={i} value={stat.value} label={stat.label} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
