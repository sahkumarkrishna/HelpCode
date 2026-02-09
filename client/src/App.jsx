import { Routes, Route } from "react-router-dom";

import MainLayout from "./Layout/MainLayout";
import NavbarOnlyLayout from "./Layout/NavbarOnlyLayout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "../NotFound";
import Home from "./pages/Home";
import About from "./pages/About";


import CodeReview from "./pages/CodeEditor";
import DSAHelper from "./pages/DSAHelper";
import AIChat from "./pages/AIChat";
import DebugMode from "./pages/DebugMode";
import APIGenerator from "./pages/APIGenerator";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";
import ImageAnalyzer from "./pages/ImageAnalyzer";
import Dashboard from "./pages/Dashboard";
import AITools from "./pages/AITools";
import Profile from "./pages/Profile";

import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <Routes>
      {/* Home page with navbar + footer */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
      </Route>

      {/* Public routes without navbar */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/about" element={<About />} />

      {/* Protected routes without navbar */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ai-tools" element={<AITools />} />
        <Route path="/CodeReview" element={<CodeReview />} />
        <Route path="/dsa-helper" element={<DSAHelper />} />
        <Route path="/ai-chat" element={<AIChat />} />
        <Route path="/debug" element={<DebugMode />} />
        <Route path="/api-generator" element={<APIGenerator />} />
        <Route path="/resume-analyzer" element={<ResumeAnalyzer />} />
        <Route path="/image-analyzer" element={<ImageAnalyzer />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
