import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import TaskForm from "./components/TaskForm";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LandingPage from "./components/LandingPage";
import { AuthProvider } from "./context/AuthProvider";
import { useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <AuthProvider>
        {/* ✅ Show Navbar only when logged in */}
        {isLoggedIn && <Navbar />}

        <Routes>
          {/* Landing Page (default) */}
          <Route path="/" element={<LandingPage />} />

          {/* Auth Routes */}
          <Route
            path="/login"
            element={<Login setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path="/register" element={<Register />} />

          {/* ✅ Protected Routes */}
          <Route
            path="/dashboard"
            element={isLoggedIn ? <Home /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/add-task"
            element={isLoggedIn ? <TaskForm /> : <Navigate to="/login" replace />}
          />

          {/* Catch-all fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
