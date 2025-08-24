import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Aman Gupta",
    gender: "Male",
    img: "https://randomuser.me/api/portraits/men/12.jpg",
    text: "This compiler is lightning fast 🚀. I use it daily for quick coding practice.",
    rating: 5,
  },
  {
    name: "Rohit Kumar",
    gender: "Male",
    img: "https://randomuser.me/api/portraits/men/24.jpg",
    text: "Super helpful tool for debugging snippets. Could add more language support though.",
    rating: 4,
  },
  {
    name: "Meena Patel",
    gender: "Female",
    img: "https://randomuser.me/api/portraits/women/19.jpg",
    text: "The clean UI and real-time output feels just like coding on my laptop IDE ✨.",
    rating: 5,
  },
  {
    name: "Aarav Singh",
    gender: "Male",
    img: "https://randomuser.me/api/portraits/men/45.jpg",
    text: "Great for practicing algorithms and quick experiments. Super smooth experience!",
    rating: 4,
  },
  {
    name: "Priya Verma",
    gender: "Female",
    img: "https://randomuser.me/api/portraits/women/30.jpg",
    text: "Perfect for beginners 🧑‍💻. The autocompletion helps me write code faster.",
    rating: 4,
  },
  {
    name: "Karan Mehta",
    gender: "Male",
    img: "https://randomuser.me/api/portraits/men/52.jpg",
    text: "Saved me so much time in college projects. Reliable and easy to use 👌.",
    rating: 5,
  },
];

export default function FeedbackSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-16">
      <h2 className="text-3xl sm:text-4xl font-extrabold text-center  mb-12">
        🚀 What Users Say
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05, rotate: 1 }}
            className=" rounded-2xl shadow-md p-6 hover:shadow-xl transition"
          >
            {/* User Info */}
            <div className="flex items-center gap-4 mb-4">
              <motion.img
                src={t.img}
                alt={t.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-white"
                whileHover={{ rotate: 10, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 200 }}
              />
              <div>
                <h3 className="font-semibold text-white">{t.name}</h3>
                <p className="text-gray-300 text-sm">{t.gender}</p>
              </div>
            </div>

            {/* Feedback */}
            <p className="text-gray-200 mb-4">{t.text}</p>

            {/* Rating */}
            <motion.div
              className="flex text-yellow-400 text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + i * 0.15 }}
            >
              {Array.from({ length: 5 }).map((_, idx) => (
                <motion.span
                  key={idx}
                  whileHover={{ scale: 1.3 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {idx < t.rating ? "★" : "☆"}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
