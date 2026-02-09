import { useState } from "react";
import axiosInstance from "../utils/axios";
import ReactMarkdown from "react-markdown";
import { FaImage, FaUpload, FaEye } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import API_ENDPOINTS from "../config/api";

const ImageAnalyzer = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [prompt, setPrompt] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const analyzeImage = async () => {
    if (!image) return;
    setLoading(true);
    setAnalysis("");

    const formData = new FormData();
    formData.append("image", image);
    formData.append("prompt", prompt || "Describe this image in detail");

    try {
      const { data } = await axiosInstance.post(API_ENDPOINTS.VISION.ANALYZE, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setAnalysis(data.analysis);
    } catch (error) {
      const errorMsg = error.response?.status === 429
        ? "Error: ⚠️ Rate limit exceeded. Please wait 1-2 minutes and try again."
        : "Error: " + (error.response?.data?.message || error.message);
      setAnalysis(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white p-4 sm:p-6">
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
            <FaImage className="text-6xl bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent font-bold" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            AI Image Analyzer
          </h1>
          <p className="text-gray-300 text-sm sm:text-base">Powered by Gemini Vision AI</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 shadow-2xl">
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-600 hover:border-purple-500 rounded-2xl p-8 text-center transition-all cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  {preview ? (
                    <img src={preview} alt="Preview" className="max-h-64 mx-auto rounded-xl shadow-lg" />
                  ) : (
                    <>
                      <FaUpload className="text-6xl mx-auto mb-4 text-purple-400 font-bold" />
                      <p className="text-lg mb-2">Upload an image</p>
                      <p className="text-sm text-gray-400">PNG, JPG, JPEG, GIF</p>
                    </>
                  )}
                </label>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium mb-2">
                  <FaEye className="text-purple-400 font-bold" />
                  What do you want to know?
                </label>
                <input
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g., Explain this code screenshot"
                  className="w-full bg-gray-900/50 border border-gray-600 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                />
              </div>

              <button 
                onClick={analyzeImage} 
                disabled={!image || loading} 
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 py-3 rounded-xl font-semibold disabled:opacity-50 transition flex items-center justify-center gap-2 shadow-lg hover:shadow-purple-500/50"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></div>
                    Analyzing...
                  </>
                ) : (
                  <>
                    <FaEye className="font-bold" /> Analyze Image
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 shadow-2xl overflow-auto max-h-[calc(100vh-150px)] custom-scrollbar">
            {loading && (
              <div className="flex flex-col items-center justify-center h-full">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-500 mb-4"></div>
                <p className="text-gray-400">Analyzing image...</p>
              </div>
            )}
            {analysis && !loading && (
              <div className="prose prose-invert max-w-none">
                <ReactMarkdown>{analysis}</ReactMarkdown>
              </div>
            )}
            {!analysis && !loading && (
              <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <FaImage className="text-6xl mb-4 opacity-20 font-bold" />
                <p>Upload an image to get AI analysis...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageAnalyzer;
