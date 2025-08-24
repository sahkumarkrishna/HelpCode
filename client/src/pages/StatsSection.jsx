import { motion } from "framer-motion";

export default function StatsSection() {
  const stats = [
    { value: "5k+", label: "Problems Solved" },
    { value: "3k+", label: "LeetCode Questions Reviewed" },
    { value: "15k+", label: "Code Optimizations" },
    { value: "98%", label: "Success Rate" },
  ];

  return (
    <section className="py-16">
      <div className="max-w-5xl mx-auto px-6 sm:px-12 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-center">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <h3 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              {stat.value}
            </h3>
            <p className="text-gray-400 mt-2 text-sm sm:text-base">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
