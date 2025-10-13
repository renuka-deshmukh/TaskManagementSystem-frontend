// src/components/LandingPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import "./LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <div className="content-box">
        <FaRegHeart size={60} className="icon mb-4" />
        <h1 className="title mb-3">Simplify Your Day with ToDo's</h1>
        <p className="description mb-5">
          “The secret of getting ahead is getting started.”  
          <br /> Stay organized, track your tasks, and achieve your goals effortlessly.
        </p>
        <div className="button-group">
          <button className="btn primary-btn" onClick={() => navigate("/login")}>
            Login
          </button>
          <button className="btn secondary-btn" onClick={() => navigate("/register")}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
