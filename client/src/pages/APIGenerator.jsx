import { useState } from "react";
import axiosInstance from "../utils/axios";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { FaBolt, FaServer, FaCopy } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import API_ENDPOINTS from "../config/api";

const APIGenerator = () => {
  const navigate = useNavigate();
  const [modelName, setModelName] = useState("");
  const [fields, setFields] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [loading, setLoading] = useState(false);

  const generateAPI = async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.post(API_ENDPOINTS.GENERATOR.API, { modelName, fields });
      setGeneratedCode(data.code);
    } catch (error) {
      const errorMsg = error.response?.status === 429
        ? "Error: ⚠️ Rate limit exceeded. Please wait 1-2 minutes and try again."
        : "Error: " + (error.response?.data?.message || error.message);
      setGeneratedCode(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(generatedCode);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white p-4 sm:p-6">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Back Button */}
        <button onClick={() => navigate('/dashboard')} className="mb-4 flex items-center gap-2 text-white hover:text-blue-400 transition font-bold">
          <IoMdArrowRoundBack className="text-2xl font-bold" /> Back
        </button>

        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl mb-4">
            <FaBolt className="text-6xl bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent font-bold" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">
            API Generator
          </h1>
          <p className="text-gray-300 text-sm sm:text-base">Generate Express CRUD APIs instantly</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 shadow-2xl">
            <div className="space-y-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium mb-2">
                  <FaServer className="text-blue-400 font-bold" />
                  Model Name:
                </label>
                <input
                  value={modelName}
                  onChange={(e) => setModelName(e.target.value)}
                  placeholder="e.g., User, Product, Post"
                  className="w-full bg-gray-900/50 border border-gray-600 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Fields (comma-separated):</label>
                <textarea
                  value={fields}
                  onChange={(e) => setFields(e.target.value)}
                  placeholder="e.g., name:String, email:String, age:Number"
                  className="w-full h-48 bg-gray-900/50 border border-gray-600 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>

              <button 
                onClick={generateAPI} 
                disabled={loading} 
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 py-3 rounded-xl font-semibold disabled:opacity-50 transition flex items-center justify-center gap-2 shadow-lg hover:shadow-blue-500/50"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></div>
                    Generating...
                  </>
                ) : (
                  <>
                    <FaBolt className="font-bold" /> Generate CRUD API
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Generated Code:</h3>
              {generatedCode && (
                <button onClick={copyCode} className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg flex items-center gap-2 transition">
                  <FaCopy className="font-bold" /> Copy
                </button>
              )}
            </div>
            <div className="overflow-auto max-h-[calc(100vh-250px)] custom-scrollbar">
              {loading && (
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 mb-4"></div>
                  <p className="text-gray-400">Generating API...</p>
                </div>
              )}
              {generatedCode && !loading && (
                <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
                  {generatedCode}
                </SyntaxHighlighter>
              )}
              {!generatedCode && !loading && (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                  <FaServer className="text-6xl mb-4 opacity-20 font-bold" />
                  <p>Generated API code will appear here...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default APIGenerator;
