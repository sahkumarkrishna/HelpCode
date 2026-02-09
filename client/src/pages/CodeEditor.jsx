import { useState, useEffect, useRef } from "react";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import "highlight.js/styles/github-dark.css";
import axios from "axios";
import { motion } from "framer-motion";
import { FaPaperPlane, FaSpinner, FaUser, FaRobot, FaPaperclip, FaImage, FaPlus, FaBars } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axios";
import API_ENDPOINTS from "../config/api";

const CodeEditor = () => {
  const navigate = useNavigate();
  const placeholder = `Ask me anything about code...`;

  const [code, setCode] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const newChat = () => {
    setMessages([]);
    setCode("");
    setSelectedFile(null);
    setSidebarOpen(false);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCode(event.target.result);
        setSelectedFile(file.name);
      };
      reader.readAsText(file);
    }
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file.name);
      setCode(`[Image: ${file.name}]`);
    }
  };

  const reviewCode = async () => {
    const token = localStorage.getItem("token");
    if (!code.trim()) return;

    if (!token) {
      setMessages((prev) => [
        ...prev,
        { type: "user", content: code, fileName: selectedFile },
        { type: "bot", content: "⚠️ You need to log in first." },
      ]);
      setCode("");
      setSelectedFile(null);
      return;
    }

    const userMessage = { type: "user", content: code, fileName: selectedFile };
    setMessages((prev) => [...prev, userMessage]);
    setCode("");
    setSelectedFile(null);
    setLoading(true);

    try {
      const response = await axiosInstance.post(
        API_ENDPOINTS.CODE_REVIEW,
        { code: userMessage.content }
      );

      const result = response.data.review || "✅ No issues found.";

      setMessages((prev) => [...prev, { type: "bot", content: result.toString() }]);
    } catch (error) {
      console.error("Review API Error:", error.response || error);
      const errorMsg = error.response?.status === 429
        ? "⚠️ Rate limit exceeded. Please wait 1-2 minutes and try again."
        : "❌ Error fetching review. Please try again.";
      setMessages((prev) => [
        ...prev,
        { type: "bot", content: errorMsg },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && e.ctrlKey) {
      reviewCode();
    }
  };

  return (
    <div className="h-screen flex bg-gradient-to-br from-gray-900 via-yellow-900 to-gray-900 text-white overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-72 sm:w-96 h-72 sm:h-96 bg-yellow-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-72 sm:w-96 h-72 sm:h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Mobile Sidebar Toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="md:hidden fixed top-20 left-4 z-50 bg-yellow-500 hover:bg-yellow-600 p-3 rounded-full shadow-lg transition"
      >
        <FaBars className="text-gray-900 font-bold" />
      </button>

      {/* Sidebar */}
      <div className={`${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 fixed md:relative w-64 h-full bg-gray-800/30 backdrop-blur-xl border-r border-gray-700/50 flex flex-col z-40 transition-transform duration-300`}>
        <div className="p-3 lg:p-4">
          <button
            onClick={newChat}
            className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 py-2 lg:py-3 rounded-xl text-sm lg:text-base font-semibold transition shadow-lg hover:shadow-yellow-500/50 flex items-center justify-center gap-2"
          >
            <FaPlus className="font-bold" /> New Chat
          </button>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar p-3">
          <p className="text-xs text-gray-400 text-center">Chat history will appear here</p>
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Chat Area */}
      <div className="flex-1 flex flex-col relative z-10 w-full">
        {/* Back Button */}
        <div className="p-3 sm:p-4 border-b border-gray-700/50 bg-gray-800/30 backdrop-blur-xl">
          <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-white hover:text-yellow-400 transition font-bold">
            <IoMdArrowRoundBack className="text-2xl font-bold" /> Back
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6 custom-scrollbar">
          <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
            {messages.length === 0 && (
              <div className="text-center text-white mt-10 sm:mt-20">
                <FaRobot className="text-5xl sm:text-6xl mx-auto mb-4 text-yellow-400 font-bold" />
                <p className="text-lg sm:text-xl">How can I help you with your code today?</p>
              </div>
            )}

            {messages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className={`flex gap-2 sm:gap-4 ${msg.type === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.type === "bot" && (
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center flex-shrink-0">
                    <FaRobot className="text-gray-900 text-xs sm:text-sm font-bold" />
                  </div>
                )}

                <div
                  className={`max-w-full sm:max-w-[85%] lg:max-w-[80%] rounded-2xl px-3 sm:px-5 py-3 sm:py-4 ${
                    msg.type === "user"
                      ? "bg-gradient-to-r from-yellow-600 to-orange-600 text-white"
                      : "bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 text-gray-100"
                  }`}
                >
                  {msg.fileName && (
                    <div className="flex items-center gap-2 mb-2 text-xs text-gray-300 bg-black/20 px-2 sm:px-3 py-1 rounded-lg">
                      <FaPaperclip className="font-bold" />
                      <span className="truncate font-bold">{msg.fileName}</span>
                    </div>
                  )}

                  {msg.type === "user" ? (
                    <pre className="whitespace-pre-wrap font-mono text-xs sm:text-sm break-words">{msg.content}</pre>
                  ) : (
                    <div className="prose prose-invert prose-sm max-w-none text-xs sm:text-sm">
                      <Markdown rehypePlugins={[rehypeHighlight]} remarkPlugins={[remarkGfm]}>
                        {msg.content}
                      </Markdown>
                    </div>
                  )}
                </div>

                {msg.type === "user" && (
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-yellow-600 flex items-center justify-center flex-shrink-0">
                    <FaUser className="text-white text-xs sm:text-sm font-bold" />
                  </div>
                )}
              </motion.div>
            ))}

            {loading && (
              <div className="flex gap-2 sm:gap-4 justify-start">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center">
                  <FaRobot className="text-gray-900 text-xs sm:text-sm font-bold" />
                </div>
                <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl px-3 sm:px-5 py-3 sm:py-4">
                  <div className="flex items-center gap-2 text-gray-400 text-xs sm:text-sm">
                    <FaSpinner className="animate-spin font-bold" />
                    <span>Thinking...</span>
                  </div>
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>
        </div>

        <div className="bg-gray-800/30 backdrop-blur-xl border-t border-gray-700/50 p-2 sm:p-3 lg:p-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-1 sm:gap-2 bg-gray-900/50 border border-yellow-500/50 rounded-full px-2 sm:px-4 py-1.5 sm:py-2">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept=".js,.jsx,.ts,.tsx,.py,.java,.cpp,.c,.html,.css,.json"
                className="hidden"
              />
              
              <input
                type="file"
                ref={imageInputRef}
                onChange={handleImageSelect}
                accept="image/*"
                className="hidden"
              />

              <div className="flex items-center gap-1 sm:gap-2">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="text-gray-400 hover:text-white p-1 transition"
                  title="Upload file"
                >
                  <FaPaperclip size={14} className="sm:w-[16px] sm:h-[16px] font-bold" />
                </button>

                <button 
                  onClick={() => imageInputRef.current?.click()}
                  className="text-gray-400 hover:text-white p-1 transition"
                  title="Upload image"
                >
                  <FaImage size={14} className="sm:w-[16px] sm:h-[16px] font-bold" />
                </button>
              </div>

              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder={selectedFile ? `File: ${selectedFile}` : placeholder}
                className="flex-1 bg-transparent outline-none text-white text-xs sm:text-sm placeholder-gray-400"
              />

              <button
                onClick={reviewCode}
                disabled={loading || !code.trim()}
                className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-gray-900 disabled:opacity-50 flex-shrink-0 transition shadow-lg hover:shadow-yellow-500/50"
              >
                {loading ? <FaSpinner className="animate-spin text-xs sm:text-sm font-bold" /> : <FaPaperPlane size={12} className="sm:w-[14px] sm:h-[14px] font-bold" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
