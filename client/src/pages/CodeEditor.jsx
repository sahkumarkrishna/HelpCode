import { useState, useEffect } from "react";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import "prismjs/components/prism-javascript";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import "highlight.js/styles/github-dark.css";
import axios from "axios";

const CODE_BRO_API = import.meta.env.VITE_REVIEW_API;

const CodeEditor = () => {
  const placeholder = `// Enter your code / problem name / leetcode - question number`;
  const [code, setCode] = useState(placeholder);
  const [hasTyped, setHasTyped] = useState(false);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // Highlight code on every change
  useEffect(() => {
    prism.highlightAll();
  }, [code]);

  const handleCodeChange = (newCode) => {
    if (!hasTyped && newCode !== placeholder) {
      setHasTyped(true);
    }
    setCode(newCode);
  };

  const handleFocus = () => {
    if (!hasTyped && code === placeholder) {
      setHasTyped(true);
      setCode("");
    }
  };

  const clearCode = () => {
    setCode("");
    setHasTyped(true);
    setReview("");
  };

  const reviewCode = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);
    setReview("");

    if (!token) {
      setReview("⚠️ You need to log in first.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${CODE_BRO_API}/code`,
        { code },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      const result =
        response.data.result ||
        response.data.output ||
        response.data ||
        "✅ No issues found.";

      setReview(result.toString());
    } catch (error) {
      console.error("Review API Error:", error.response || error);
      setReview("❌ Error fetching review. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-4 py-10 sm:px-6 sm:py-12 text-white">
      <main className="max-w-7xl mx-auto flex flex-col gap-16">
        {/* Code Editor Section */}
        <section className="p-6 sm:p-10 rounded-3xl transition-all duration-300 shadow-2xl border border-[#334155]">
          <h2 className="text-2xl font-bold text-yellow-400 mb-6 sm:mb-8 tracking-wide">
            ✍️ Write Your Code
          </h2>

          <Editor
            value={code}
            onValueChange={handleCodeChange}
            onFocus={() => {
              handleFocus();
              setIsFocused(true);
            }}
            onBlur={() => setIsFocused(false)}
            highlight={(code) =>
              prism.highlight(code, prism.languages.javascript, "javascript")
            }
            padding={20}
            style={{
              fontFamily: '"Fira Code", monospace',
              fontSize: 16,
              minHeight: "400px",
              backgroundColor: "#0f172a",
              color: "#e0e0e0",
              borderRadius: "12px",
              boxShadow: isFocused
                ? "0 0 10px 2px #facc15"
                : "0 4px 15px rgba(0, 0, 0, 0.25)",
              border: `1px solid ${isFocused ? "#facc15" : "#334155"}`,
              overflow: "auto",
              whiteSpace: "pre-wrap",
              lineHeight: "1.6",
              outline: "none",
              transition: "box-shadow 0.3s ease, border-color 0.3s ease",
            }}
            className="w-full rounded-xl"
          />

          <div className="flex justify-between mt-8 sm:mt-10">
            <button
              onClick={clearCode}
              disabled={loading}
              className="bg-gray-600 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-xl shadow-md hover:bg-gray-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              🧹 Clear Code
            </button>

            <button
              onClick={reviewCode}
              disabled={loading || !hasTyped || !code.trim()}
              className="bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-500 text-[#001F3F] font-bold px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-xl shadow-xl hover:scale-105 hover:from-pink-500 hover:to-yellow-400 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Reviewing..." : "🚀 Review Code"}
            </button>
          </div>
        </section>

        {/* Review Output Section */}
        <section className="bg-[#002b5c]/80 backdrop-blur-md p-10 rounded-3xl shadow-2xl border border-[#004080] transition-all duration-300">
          <h2 className="text-2xl font-bold text-yellow-400 mb-8 tracking-wide">
            ✅ Review Output
          </h2>

          {loading ? (
            <div className="flex justify-center items-center py-16">
              <div className="w-14 h-14 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div
              className="text-[#f5f5dc] leading-relaxed prose prose-invert max-w-none text-lg tracking-wide whitespace-pre-wrap"
              style={{ whiteSpace: "pre-wrap" }}
            >
              <Markdown
                rehypePlugins={[rehypeHighlight]}
                remarkPlugins={[remarkGfm]}
              >
                {(review || "").trim()}
              </Markdown>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default CodeEditor;
