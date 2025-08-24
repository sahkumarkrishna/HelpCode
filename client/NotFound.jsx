import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 px-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center p-10 bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl max-w-lg"
      >
        {/* Icon */}
        <motion.div
          initial={{ rotate: -20 }}
          animate={{ rotate: [ -20, 20, -20 ] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex justify-center mb-4"
        >
          <FaExclamationTriangle className="text-red-500 text-7xl drop-shadow-lg" />
        </motion.div>

        {/* Heading */}
        <h1 className="text-7xl font-extrabold text-red-600 mb-3">404</h1>
        <p className="text-lg text-gray-700 mb-6">
          Oops! The page you’re looking for doesn’t exist or has been moved.
        </p>

        {/* Button */}
        <Link
          to="/"
          className="px-8 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white font-semibold rounded-full shadow-md hover:scale-110 transform transition-all duration-300 inline-flex items-center gap-2"
        >
          <span>🏠 Go Back Home</span>
        </Link>
      </motion.div>
    </div>
  );
}
