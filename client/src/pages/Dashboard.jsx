import { Link, useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";

const Dashboard = () => {
  const navigate = useNavigate();
  const features = [
    { name: "AI Chat", path: "/ai-chat", icon: "💬", color: "from-blue-500 to-cyan-500", desc: "Chat with AI Assistant", gradient: "bg-gradient-to-br from-blue-500/20 to-cyan-500/20" },
    { name: "Code Review", path: "/CodeReview", icon: "📝", color: "from-yellow-500 to-orange-500", desc: "Get code feedback", gradient: "bg-gradient-to-br from-yellow-500/20 to-orange-500/20" },
    { name: "DSA Helper", path: "/dsa-helper", icon: "🧠", color: "from-purple-500 to-pink-500", desc: "Solve DSA problems", gradient: "bg-gradient-to-br from-purple-500/20 to-pink-500/20" },
    { name: "AI Tools", path: "/ai-tools", icon: "🚀", color: "from-green-500 to-teal-500", desc: "More AI Features", gradient: "bg-gradient-to-br from-green-500/20 to-teal-500/20" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <button onClick={() => navigate('/')} className="mb-4 flex items-center gap-2 text-white hover:text-yellow-400 transition font-bold">
          <IoMdArrowRoundBack className="text-2xl font-bold" /> Back to Home
        </button>

        <h1 className="text-5xl font-bold mb-4 text-center bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
          🚀 HelpCode AI Dashboard
        </h1>
        <p className="text-center text-gray-300 mb-12 text-lg">Choose a tool to get started</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 px-4 sm:px-0">
          {features.map((feature) => (
            <Link
              key={feature.path}
              to={feature.path}
              className="group relative overflow-hidden bg-gray-800/30 backdrop-blur-xl rounded-2xl p-4 sm:p-6 lg:p-8 border border-gray-700/50 hover:border-gray-500 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20"
            >
              <div className={`absolute inset-0 ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              <div className="relative z-10">
                <div className={`text-5xl sm:text-6xl lg:text-7xl mb-4 sm:mb-6 transform group-hover:scale-110 transition-transform duration-500`}>
                  {feature.icon}
                </div>
                <h3 className={`text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-3 bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`}>{feature.name}</h3>
                <p className="text-gray-400 text-xs sm:text-sm group-hover:text-gray-300 transition-colors">{feature.desc}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700">
          <h2 className="text-2xl font-bold mb-4">✨ Features Overview</h2>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h3 className="font-semibold text-yellow-400 mb-2">💬 Chat Features:</h3>
              <ul className="space-y-1 text-gray-300">
                <li>✓ Multiple conversations</li>
                <li>✓ Voice input/output</li>
                <li>✓ AI personality modes</li>
                <li>✓ Markdown & code highlighting</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-green-400 mb-2">👨‍💻 Developer Tools:</h3>
              <ul className="space-y-1 text-gray-300">
                <li>✓ AI-powered debugging</li>
                <li>✓ CRUD API generator</li>
                <li>✓ DSA step-by-step solutions</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-blue-400 mb-2">📂 File Support:</h3>
              <ul className="space-y-1 text-gray-300">
                <li>✓ Image analysis (Gemini Vision)</li>
                <li>✓ Resume analyzer</li>
                <li>✓ PDF/Doc support</li>
                <li>✓ Drag & drop upload</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-purple-400 mb-2">🎯 Smart Features:</h3>
              <ul className="space-y-1 text-gray-300">
                <li>✓ Code review with AI</li>
                <li>✓ Real-time syntax highlighting</li>
                <li>✓ Copy code functionality</li>
                <li>✓ Multi-language support</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
