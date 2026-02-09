const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export const API_ENDPOINTS = {
  // Auth
  AUTH: {
    LOGIN: `${API_BASE_URL}/api/auth/login`,
    SIGNUP: `${API_BASE_URL}/api/auth/signup`,
    LOGOUT: `${API_BASE_URL}/api/auth/logout`,
  },
  
  // Code Review
  CODE_REVIEW: `${API_BASE_URL}/api/v1/review/code`,
  
  // DSA Helper
  DSA: {
    SOLVE: `${API_BASE_URL}/api/dsa/solve`,
  },
  
  // Chat
  CHAT: {
    CONVERSATIONS: `${API_BASE_URL}/api/chat/conversations`,
    GET_CHAT: (chatId) => `${API_BASE_URL}/api/chat/${chatId}`,
    NEW_CHAT: `${API_BASE_URL}/api/chat/new`,
    DELETE_CHAT: (chatId) => `${API_BASE_URL}/api/chat/${chatId}`,
    MESSAGE: `${API_BASE_URL}/api/chat/message`,
  },
  
  // Debug
  DEBUG: {
    FIX: `${API_BASE_URL}/api/debug/fix`,
  },
  
  // API Generator
  GENERATOR: {
    API: `${API_BASE_URL}/api/generator/api`,
  },
  
  // Resume Analyzer
  RESUME: {
    ANALYZE: `${API_BASE_URL}/api/resume/analyze`,
  },
  
  // Image Analyzer
  VISION: {
    ANALYZE: `${API_BASE_URL}/api/vision/analyze`,
  },
};

export default API_ENDPOINTS;
