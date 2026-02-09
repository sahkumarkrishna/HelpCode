import { Link } from "react-router-dom";

const AITools = () => {
  const tools = [
    { name: "Debug Mode", path: "/debug", icon: "🐛", color: "from-red-500 to-orange-500", desc: "AI fixes your bugs instantly" },
    { name: "API Generator", path: "/api-generator", icon: "⚡", color: "from-indigo-500 to-blue-500", desc: "Generate CRUD APIs" },
    { name: "Resume Analyzer", path: "/resume-analyzer", icon: "📄", color: "from-green-400 to-blue-500", desc: "Get resume feedback" },
    { name: "Image Analyzer", path: "/image-analyzer", icon: "🖼️", color: "from-purple-400 to-pink-500", desc: "AI Vision analysis" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <Link to="/dashboard" className="inline-block mb-6 text-gray-400 hover:text-white transition">
          ← Back to Dashboard
        </Link>
        
        <h1 className="text-5xl font-bold mb-4 text-center bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
          🚀 AI Tools
        </h1>
        <p className="text-center text-gray-300 mb-12 text-lg">Advanced AI-powered developer tools</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 px-4 sm:px-0">
          {tools.map((tool) => (
            <Link
              key={tool.path}
              to={tool.path}
              className="group relative overflow-hidden bg-gray-800/30 backdrop-blur-xl rounded-2xl p-4 sm:p-6 lg:p-8 border border-gray-700/50 hover:border-gray-500 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20"
            >
              <div className="relative z-10">
                <div className="text-5xl sm:text-6xl lg:text-7xl mb-4 sm:mb-6 transform group-hover:scale-110 transition-transform duration-500">
                  {tool.icon}
                </div>
                <h3 className={`text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-3 bg-gradient-to-r ${tool.color} bg-clip-text text-transparent`}>
                  {tool.name}
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm group-hover:text-gray-300 transition-colors">{tool.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AITools;
