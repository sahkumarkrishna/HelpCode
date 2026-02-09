import { useState } from "react";
import axiosInstance from "../utils/axios";
import ReactMarkdown from "react-markdown";
import { FaFileAlt, FaUpload, FaCheckCircle } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import API_ENDPOINTS from "../config/api";

const ResumeAnalyzer = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const analyzeResume = async () => {
    if (!file) return;
    setLoading(true);
    setFeedback("");

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const { data } = await axiosInstance.post(API_ENDPOINTS.RESUME.ANALYZE, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setFeedback(data.feedback);
    } catch (error) {
      const errorMsg = error.response?.status === 429
        ? "Error: ⚠️ Rate limit exceeded. Please wait 1-2 minutes and try again."
        : "Error: " + (error.response?.data?.message || error.message);
      setFeedback(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-gray-900 text-white p-4 sm:p-6">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Back Button */}
        <button onClick={() => navigate('/dashboard')} className="mb-4 flex items-center gap-2 text-white hover:text-green-400 transition font-bold">
          <IoMdArrowRoundBack className="text-2xl font-bold" /> Back
        </button>

        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-2xl mb-4">
            <FaFileAlt className="text-6xl bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent font-bold" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-2 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            AI Resume Analyzer
          </h1>
          <p className="text-gray-300 text-sm sm:text-base">Get professional feedback on your resume</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 shadow-2xl">
            <div className="space-y-6">
              <div className="border-2 border-dashed border-gray-600 hover:border-green-500 rounded-2xl p-8 text-center transition-all cursor-pointer">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                  id="resume-upload"
                />
                <label htmlFor="resume-upload" className="cursor-pointer">
                  <FaUpload className="text-6xl mx-auto mb-4 text-green-400 font-bold" />
                  <p className="text-lg mb-2">Drop your resume here or click to upload</p>
                  <p className="text-sm text-gray-400">Supports PDF, DOC, DOCX</p>
                </label>
                {file && (
                  <div className="mt-4 flex items-center justify-center gap-2 text-green-400">
                    <FaCheckCircle className="font-bold" />
                    <span>{file.name}</span>
                  </div>
                )}
              </div>

              <button 
                onClick={analyzeResume} 
                disabled={!file || loading} 
                className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 py-3 rounded-xl font-semibold disabled:opacity-50 transition flex items-center justify-center gap-2 shadow-lg hover:shadow-green-500/50"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></div>
                    Analyzing...
                  </>
                ) : (
                  <>
                    <FaFileAlt className="font-bold" /> Analyze Resume
                  </>
                )}
              </button>

              <div className="bg-gray-900/50 rounded-xl p-4 text-sm">
                <h3 className="font-semibold mb-2 text-green-400">What we analyze:</h3>
                <ul className="space-y-1 text-gray-300">
                  <li>✓ Format & Structure</li>
                  <li>✓ Content Quality</li>
                  <li>✓ Keywords & ATS Optimization</li>
                  <li>✓ Grammar & Spelling</li>
                  <li>✓ Improvement Suggestions</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 shadow-2xl overflow-auto max-h-[calc(100vh-150px)] custom-scrollbar">
            {loading && (
              <div className="flex flex-col items-center justify-center h-full">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-500 mb-4"></div>
                <p className="text-gray-400">Analyzing your resume...</p>
              </div>
            )}
            {feedback && !loading && (
              <div className="prose prose-invert max-w-none">
                <ReactMarkdown>{feedback}</ReactMarkdown>
              </div>
            )}
            {!feedback && !loading && (
              <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <FaFileAlt className="text-6xl mb-4 opacity-20 font-bold" />
                <p>Upload your resume to get AI-powered feedback...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeAnalyzer;
