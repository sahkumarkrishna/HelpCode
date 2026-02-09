import { useState, useEffect, useRef } from "react";
import axiosInstance from "../utils/axios";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { FaMicrophone, FaMicrophoneSlash, FaVolumeUp, FaBars } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import API_ENDPOINTS from "../config/api";

const AIChat = () => {
  const navigate = useNavigate();
  const [conversations, setConversations] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [aiMode, setAiMode] = useState("assistant");
  const [isListening, setIsListening] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    loadConversations();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const loadConversations = async () => {
    try {
      const { data } = await axiosInstance.get(API_ENDPOINTS.CHAT.CONVERSATIONS);
      setConversations(data);
      if (data.length > 0) loadChat(data[0]._id);
    } catch (error) {
      console.error("Error loading conversations:", error);
    }
  };

  const loadChat = async (chatId) => {
    try {
      const { data } = await axiosInstance.get(API_ENDPOINTS.CHAT.GET_CHAT(chatId));
      setActiveChat(chatId);
      setMessages(data.messages || []);
    } catch (error) {
      console.error("Error loading chat:", error);
    }
  };

  const createNewChat = async () => {
    try {
      const { data } = await axiosInstance.post(API_ENDPOINTS.CHAT.NEW_CHAT, { title: "New Chat" });
      setConversations([data, ...conversations]);
      setActiveChat(data._id);
      setMessages([]);
      setSidebarOpen(false);
    } catch (error) {
      console.error("Error creating chat:", error);
    }
  };

  const deleteChat = async (chatId) => {
    try {
      await axiosInstance.delete(API_ENDPOINTS.CHAT.DELETE_CHAT(chatId));
      setConversations(conversations.filter(c => c._id !== chatId));
      if (activeChat === chatId) {
        setActiveChat(null);
        setMessages([]);
      }
    } catch (error) {
      console.error("Error deleting chat:", error);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = { role: "user", content: input };
    setMessages([...messages, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const { data } = await axiosInstance.post(API_ENDPOINTS.CHAT.MESSAGE,
        { chatId: activeChat, message: input, mode: aiMode }
      );
      setMessages([...messages, userMsg, { role: "assistant", content: data.response }]);
    } catch (error) {
      const errorMsg = error.response?.status === 429
        ? "Error: ⚠️ Rate limit exceeded. Please wait 1-2 minutes."
        : "Error: " + error.message;
      setMessages([...messages, userMsg, { role: "assistant", content: errorMsg }]);
    } finally {
      setLoading(false);
    }
  };

  const startVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert("Voice input not supported in this browser. Use Chrome.");
      return;
    }
    const recognition = new webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;
    
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);
    
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setIsListening(false);
    };
    
    recognition.start();
  };

  const stopVoiceInput = () => {
    setIsListening(false);
  };

  const speakText = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-72 sm:w-96 h-72 sm:h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-72 sm:w-96 h-72 sm:h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Mobile Sidebar Toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="md:hidden fixed top-20 left-4 z-50 bg-blue-500 hover:bg-blue-600 p-3 rounded-full shadow-lg transition"
      >
        <FaBars className="text-white font-bold" />
      </button>

      {/* Sidebar - Hidden on mobile, visible on md+ */}
      <div className={`${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 fixed md:relative w-48 lg:w-64 h-full bg-gray-800/30 backdrop-blur-xl border-r border-gray-700/50 flex-col z-40 transition-transform duration-300 flex`}>
        <div className="p-3 lg:p-4">
          <button onClick={createNewChat} className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 py-2 lg:py-3 rounded-xl text-sm lg:text-base font-semibold transition shadow-lg hover:shadow-blue-500/50 flex items-center justify-center gap-2">
            <span className="text-xl">+</span> New Chat
          </button>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {conversations.map(conv => (
            <div key={conv._id} className={`p-2 lg:p-3 mx-2 mb-2 rounded-xl cursor-pointer transition-all flex justify-between items-center ${
              activeChat === conv._id ? 'bg-blue-500/20 border border-blue-500/50' : 'hover:bg-gray-700/50'
            }`}>
              <span onClick={() => loadChat(conv._id)} className="flex-1 truncate text-xs lg:text-sm">{conv.title}</span>
              <button onClick={() => deleteChat(conv._id)} className="text-red-400 hover:text-red-300 ml-2 text-lg">×</button>
            </div>
          ))}
        </div>
        <div className="p-3 lg:p-4 border-t border-gray-700/50">
          <label className="text-xs text-gray-400 mb-2 block">AI Mode:</label>
          <select value={aiMode} onChange={(e) => setAiMode(e.target.value)} className="w-full bg-gray-900/50 border border-gray-600 p-2 rounded-xl text-xs lg:text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition">
            <option value="assistant">💬 Assistant</option>
            <option value="tutor">📚 Tutor</option>
            <option value="interviewer">👔 Interviewer</option>
            <option value="coder">💻 Coding Assistant</option>
          </select>
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
          <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-white hover:text-blue-400 transition font-bold">
            <IoMdArrowRoundBack className="text-2xl font-bold" /> Back
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6 custom-scrollbar">
          {messages.map((msg, idx) => (
            <div key={idx} className={`mb-3 sm:mb-4 ${msg.role === 'user' ? 'text-right' : ''}`}>
              <div className={`inline-block max-w-full sm:max-w-[85%] lg:max-w-3xl p-3 sm:p-4 rounded-2xl shadow-lg ${
                msg.role === 'user' 
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600' 
                  : 'bg-gray-800/50 backdrop-blur-xl border border-gray-700/50'
              }`}>
                {msg.role === 'assistant' ? (
                  <div className="text-sm sm:text-base">
                    <ReactMarkdown
                      components={{
                        code({ node, inline, className, children, ...props }) {
                          const match = /language-(\w+)/.exec(className || "");
                          return !inline && match ? (
                            <div className="relative my-4 overflow-x-auto">
                              <SyntaxHighlighter style={vscDarkPlus} language={match[1]} PreTag="div" {...props}>
                                {String(children).replace(/\n$/, "")}
                              </SyntaxHighlighter>
                              <button onClick={() => copyToClipboard(String(children))} className="absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 px-2 sm:px-3 py-1 rounded-lg text-xs transition">
                                Copy
                              </button>
                            </div>
                          ) : (
                            <code className={`${className} bg-gray-900/50 px-2 py-1 rounded text-xs sm:text-sm`} {...props}>{children}</code>
                          );
                        }
                      }}
                    >
                      {msg.content}
                    </ReactMarkdown>
                    <button onClick={() => speakText(msg.content)} className="mt-2 text-xs text-gray-400 hover:text-white flex items-center gap-1 transition">
                      <FaVolumeUp className="font-bold" /> Speak
                    </button>
                  </div>
                ) : (
                  <p className="text-white text-sm sm:text-base">{msg.content}</p>
                )}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex items-center gap-3 text-gray-400 text-sm sm:text-base">
              <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-t-2 border-blue-500"></div>
              <span>AI is thinking...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={sendMessage} className="p-2 sm:p-3 lg:p-4 border-t border-gray-700/50 bg-gray-800/30 backdrop-blur-xl">
          <div className="flex gap-1 sm:gap-2">
            <button 
              type="button" 
              onClick={isListening ? stopVoiceInput : startVoiceInput} 
              className={`px-2 sm:px-3 lg:px-4 py-2 rounded-xl transition shadow-lg ${
                isListening 
                  ? 'bg-red-500 animate-pulse hover:bg-red-600' 
                  : 'bg-gray-700 hover:bg-gray-600'
              }`}
              title={isListening ? "Stop recording" : "Start voice input"}
            >
              {isListening ? <FaMicrophoneSlash className="text-base sm:text-lg lg:text-xl font-bold" /> : <FaMicrophone className="text-base sm:text-lg lg:text-xl font-bold" />}
            </button>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-gray-900/50 border border-gray-600 rounded-xl px-3 sm:px-4 py-2 text-sm sm:text-base text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <button type="submit" disabled={loading} className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 px-3 sm:px-4 lg:px-6 py-2 rounded-xl text-sm sm:text-base font-semibold disabled:opacity-50 transition shadow-lg hover:shadow-blue-500/50">
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AIChat;
