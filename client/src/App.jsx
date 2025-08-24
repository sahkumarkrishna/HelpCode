import { Routes, Route } from "react-router-dom";

import MainLayout from "./Layout/MainLayout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "../NotFound";
import Home from "./pages/Home";
import About from "./pages/About";


import CodeReview from "./pages/CodeEditor";
import Profile from "./pages/Profile";

import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <Routes>
      {/* Public routes with layout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Route>

      {/* Public routes without layout */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/profile" element={<Profile />} />
 
        <Route path="/CodeReview" element={<CodeReview />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
