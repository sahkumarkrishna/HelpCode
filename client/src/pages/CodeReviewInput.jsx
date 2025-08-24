import { useState, useEffect } from "react";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import "prismjs/components/prism-javascript";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from "axios";


const CODE_BRO_API = import.meta.env.VITE_REVIEW_API;

const CodeEditor = () => {
  const placeholder = `// Enter your code / problem name / leetcode - question number`;
  const [code, setCode] = useState(placeholder);
  const [hasTyped, setHasTyped] = useState(false);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    prism.highlightAll();
  }, [code]);

  const handleCodeChange = (newCode) => {
    if (!hasTyped && newCode !== placeholder) {
      setHasTyped(true);
      setCode(newCode);
    } else {
      setCode(newCode);
    }
  };

  const handleFocus = () => {
    if (!hasTyped && code === placeholder) {
      setHasTyped(true);
      setCode("");
    }
  };

  const reviewCode = async () => {
    setLoading(true);
    if (!token) {
      setReview("⚠️ You need to log in first.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${CODE_BRO_API}/review-code`,
        { code },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      setReview(response.data);
    } catch (error) {
      console.error("Error:", error.response || error);
      setReview("❌ Error fetching review. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D1B2A] to-[#001F3F] text-white px-4 py-10 sm:px-6 sm:py-12">
      <main className="max-w-7xl mx-auto flex flex-col gap-16">
        {/* Code Editor Section */}
        <section className="bg-[#002b5c]/80 backdrop-blur-md p-6 sm:p-10 rounded-3xl shadow-2xl border border-[#004080] transition-all duration-300">
          <h2 className="text-2xl font-bold text-yellow-400 mb-6 sm:mb-8 tracking-wide">
            ✍️ Write Your Code
          </h2>

          <Editor
            value={code}
            onValueChange={handleCodeChange}
            onFocus={handleFocus}
            highlight={(code) =>
              prism.highlight(code, prism.languages.javascript, "javascript")
            }
            padding={20}
            style={{
              fontFamily: '"Fira Code", monospace',
              fontSize: 16, // Normal text size
              minHeight: "400px", // Bigger editor height
              backgroundColor: "#011c3a",
              color: "#ffffff",
              borderRadius: "0.75rem",
              overflow: "auto",
              whiteSpace: "pre-wrap",
              lineHeight: "1.8",
            }}
            className="w-full rounded-xl"
          />

          <div className="flex justify-end mt-8 sm:mt-10">
            <button
              onClick={reviewCode}
              className="bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-500 text-[#001F3F] font-bold px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-xl shadow-xl hover:scale-105 hover:from-pink-500 hover:to-yellow-400 transition-all duration-300"
            >
              {loading ? "Reviewing..." : "🚀 Review Code"}
            </button>
          </div>
        </section>

        {/* Review Output Section */}
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
            <div className="text-[#f5f5dc] leading-relaxed prose prose-invert max-w-none text-lg tracking-wide">
              <Markdown rehypePlugins={[rehypeHighlight]}>
                {review.trim()}
              </Markdown>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default CodeEditor;
