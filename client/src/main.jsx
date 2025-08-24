import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'  // ✅ Import Toaster
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      {/* ✅ Add Toaster here so it’s available globally */}
      <Toaster position="top-right" reverseOrder={false} />
    </BrowserRouter>
  </StrictMode>,
)
