import { useState } from "react";
import axiosInstance from "../utils/axios";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { FaBug, FaCode, FaTools } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import API_ENDPOINTS from "../config/api";

const DebugMode = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [solution, setSolution] = useState("");
  const [loading, setLoading] = useState(false);

  const debugCode = async () => {
    setLoading(true);
    setSolution("");
    try {
      const { data } = await axiosInstance.post(API_ENDPOINTS.DEBUG.FIX, { code, error });
      setSolution(data.solution);
    } catch (err) {
      const msg = err.response?.data?.message || err.message;
      setSolution(err.response?.status === 429 
        ? "⚠️ **Rate Limit Exceeded**\n\nThe AI service is temporarily rate-limited. Please wait 1-2 minutes and try again.\n\nTip: Gemini API free tier has request limits."
        : "❌ Error: " + msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-gray-900 text-white p-4 sm:p-6">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-red-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Back Button */}
        <button onClick={() => navigate('/dashboard')} className="mb-4 flex items-center gap-2 text-white hover:text-red-400 transition font-bold">
          <IoMdArrowRoundBack className="text-2xl font-bold" /> Back
        </button>

        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-2xl mb-4">
            <FaBug className="text-6xl bg-gradient-to-r from-red-400 to-orange-500 bg-clip-text text-transparent font-bold" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-2 bg-gradient-to-r from-red-400 to-orange-500 bg-clip-text text-transparent">
            Debug Mode
          </h1>
          <p className="text-gray-300 text-sm sm:text-base">AI-powered bug detection and fixing</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 shadow-2xl">
              <label className="flex items-center gap-2 text-sm font-medium mb-2">
                <FaCode className="text-red-400 font-bold" />
                Your Code:
              </label>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Paste your buggy code..."
                className="w-full h-64 bg-gray-900/50 border border-gray-600 rounded-xl p-4 text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition"
              />
            </div>

            <div className="bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 shadow-2xl">
              <label className="flex items-center gap-2 text-sm font-medium mb-2">
                <FaBug className="text-orange-400 font-bold" />
                Error Message:
              </label>
              <textarea
                value={error}
                onChange={(e) => setError(e.target.value)}
                placeholder="Paste the error message..."
                className="w-full h-32 bg-gray-900/50 border border-gray-600 rounded-xl p-4 text-red-400 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition"
              />
            </div>

            <button 
              onClick={debugCode} 
              disabled={loading} 
              className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 py-3 rounded-xl font-semibold disabled:opacity-50 transition flex items-center justify-center gap-2 shadow-lg hover:shadow-red-500/50"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></div>
                  Analyzing...
                </>
              ) : (
                <>
                  <FaTools className="font-bold" /> Fix Bug
                </>
              )}
            </button>
          </div>

          <div className="bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 shadow-2xl overflow-auto max-h-[calc(100vh-150px)] custom-scrollbar">
            {loading && (
              <div className="flex flex-col items-center justify-center h-full">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-red-500 mb-4"></div>
                <p className="text-gray-400">Analyzing your code...</p>
              </div>
            )}
            {solution && !loading && (
              <ReactMarkdown
                components={{
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "");
                    return !inline && match ? (
                      <SyntaxHighlighter style={vscDarkPlus} language={match[1]} PreTag="div" {...props}>
                        {String(children).replace(/\n$/, "")}
                      </SyntaxHighlighter>
                    ) : (
                      <code className={className} {...props}>{children}</code>
                    );
                  }
                }}
              >
                {solution}
              </ReactMarkdown>
            )}
            {!solution && !loading && (
              <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <FaBug className="text-6xl mb-4 opacity-20 font-bold" />
                <p>Solution will appear here...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DebugMode;
