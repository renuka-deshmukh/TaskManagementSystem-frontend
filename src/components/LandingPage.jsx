import React from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import "./LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container d-flex flex-column justify-content-center align-items-center text-center text-white">
      <div className="content-box p-4 rounded-4 shadow-lg bg-opacity">
        <FaCheckCircle size={60} className="mb-3" />
        <h1 className="fw-bold mb-3">Organize Your Day with ToDoPro ✨</h1>
        <p className="lead mb-4">
          “The secret of getting ahead is getting started.”  
          <br /> Stay productive, track tasks, and achieve your goals effortlessly.
        </p>
        <div className="d-flex gap-3 justify-content-center">
          <button
            className="btn btn-light px-4 py-2 fw-semibold"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
          <button
            className="btn btn-outline-light px-4 py-2 fw-semibold"
            onClick={() => navigate("/register")}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
