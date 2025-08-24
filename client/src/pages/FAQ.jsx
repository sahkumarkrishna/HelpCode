import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "What is HelpCode?",
    answer:
      "HelpCode is an AI-powered coding assistant that helps solve DSA-related problems by providing efficient, optimal solutions with time and space complexity analysis. It assists with clarifying problems, identifying edge cases, and offering well-explained solutions for competitive programming and coding interviews.",
  },
  {
    question: "How does the AI code assistant work?",
    answer:
      "The AI code assistant analyzes your code and suggests improvements, optimizations, and provides solutions to common coding problems.",
  },
  {
    question: "Can I integrate HelpCode into my current coding environment?",
    answer:
      "Currently, integration with your coding environment is not supported. But you may see it in next update.",
  },
  {
    question: "Is HelpCode free to use?",
    answer: "Yes, HelpCode is completely free to use.",
  },
  {
    question: "What languages does HelpCode support?",
    answer:
      "It supports Java, JavaScript, C++, Python and many more popular languages.",
  },
];

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className=" text-white py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-400">
          Frequently Asked Questions
        </h2>

        <div className="space-y-5">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="border border-gray-700 rounded-xl p-5 transition-all duration-200"
            >
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleAnswer(index)}
              >
                <h3 className="text-lg md:text-xl font-semibold">
                  {faq.question}
                </h3>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="text-yellow-400" />
                </motion.div>
              </div>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="overflow-hidden mt-3"
                  >
                    <p className="text-base text-gray-300">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQs;
