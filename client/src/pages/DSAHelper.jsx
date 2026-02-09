import { useState } from "react";
import axiosInstance from "../utils/axios";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { FaRocket, FaCode, FaBrain } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import API_ENDPOINTS from "../config/api";

const DSAHelper = () => {
  const navigate = useNavigate();
  const [problem, setProblem] = useState("");
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("java");
  const [solution, setSolution] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSolution("");

    try {
      const prompt = code 
        ? `Problem: ${problem}\n\nMy Code (${language}):\n${code}\n\nPlease review and provide step-by-step solution.`
        : `Problem: ${problem}\n\nPlease provide step-by-step solution in ${language}.`;

      const { data } = await axiosInstance.post(API_ENDPOINTS.DSA.SOLVE, { code: prompt });
      setSolution(data.solution);
    } catch (error) {
      const msg = error.response?.data?.message || "Failed to get solution";
      setSolution(error.response?.status === 429
        ? "⚠️ **Rate Limit Exceeded**\n\nThe AI service is temporarily rate-limited. Please wait 1-2 minutes and try again.\n\nTip: Gemini API free tier has request limits."
        : "❌ Error: " + msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white p-4 sm:p-6">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Back Button */}
        <button onClick={() => navigate('/dashboard')} className="mb-4 flex items-center gap-2 text-white hover:text-purple-400 transition font-bold">
          <IoMdArrowRoundBack className="text-2xl font-bold" /> Back
        </button>

        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl mb-4">
            <FaBrain className="text-6xl bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent font-bold" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            DSA Helper Mode
          </h1>
          <p className="text-gray-300 text-sm sm:text-base">Get step-by-step solutions for Data Structures & Algorithms</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium mb-2">
                  <FaCode className="text-purple-400 font-bold" />
                  Problem Statement *
                </label>
                <textarea
                  value={problem}
                  onChange={(e) => setProblem(e.target.value)}
                  placeholder="Describe the DSA problem..."
                  className="w-full h-32 bg-gray-900/50 border border-gray-600 rounded-xl p-3 text-white focus:ring-2 focus:ring-purple-500 focus:outline-none transition"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Your Code (Optional)</label>
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Paste your code here for review..."
                  className="w-full h-48 bg-gray-900/50 border border-gray-600 rounded-xl p-3 text-white font-mono text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Language</label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full bg-gray-900/50 border border-gray-600 rounded-xl p-3 text-white focus:ring-2 focus:ring-purple-500 focus:outline-none transition"
                >
                  <option value="java">Java</option>
                  <option value="python">Python</option>
                  <option value="cpp">C++</option>
                  <option value="javascript">JavaScript</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 rounded-xl transition disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg hover:shadow-purple-500/50"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></div>
                    Analyzing...
                  </>
                ) : (
                  <>
                    <FaRocket className="font-bold" /> Get Solution
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Output Section */}
          <div className="bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 shadow-2xl overflow-auto max-h-[calc(100vh-200px)] custom-scrollbar">
            {loading && (
              <div className="flex flex-col items-center justify-center h-full">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-500 mb-4"></div>
                <p className="text-gray-400">Analyzing your problem...</p>
              </div>
            )}
            
            {solution && !loading && (
              <div className="prose prose-invert max-w-none">
                <ReactMarkdown
                  components={{
                    code({ node, inline, className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || "");
                      return !inline && match ? (
                        <SyntaxHighlighter
                          style={vscDarkPlus}
                          language={match[1]}
                          PreTag="div"
                          {...props}
                        >
                          {String(children).replace(/\n$/, "")}
                        </SyntaxHighlighter>
                      ) : (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      );
                    },
                  }}
                >
                  {solution}
                </ReactMarkdown>
              </div>
            )}

            {!solution && !loading && (
              <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <FaBrain className="text-6xl mb-4 opacity-20 font-bold" />
                <p>Your step-by-step solution will appear here...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DSAHelper;
