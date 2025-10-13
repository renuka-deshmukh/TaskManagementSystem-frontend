import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import TaskForm from "./components/TaskForm";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LandingPage from "./components/LandingPage";
import { AuthProvider, AuthContext } from "./context/AuthProvider";
import { useContext } from "react";

function AppRoutes() {
  const { loggedUser } = useContext(AuthContext);

  return (
    <>
      {loggedUser && <Navbar />}

      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* <Route path="/login" element={loggedUser ? <Navigate to="/dashboard" /> : <Login />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={loggedUser ? <Home /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/add-task"
          element={loggedUser ? <TaskForm /> : <Navigate to="/dashboard" replace />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
