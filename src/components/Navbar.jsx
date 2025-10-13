import React, { useContext, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaPlusCircle,
  FaListUl,
  FaUserCircle,
  FaSignOutAlt,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import { AuthContext } from "../context/AuthProvider";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { loggedUser, logout } = useContext(AuthContext); // ✅ Access user + logout from context

  const [showMenu, setShowMenu] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // ✅ Handle logout
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div
      className="d-flex flex-column p-3 text-white shadow-lg"
      style={{
        width: "200px",
        height: "100vh",
        backgroundImage: darkMode
          ? "linear-gradient(135deg, #1a1a1a, #333)"
          : "linear-gradient(135deg, #035dbdff, #033e91ff)",
        position: "fixed",
        top: 0,
        left: 0,
        borderTopRightRadius: "10px",
        borderBottomRightRadius: "10px",
        transition: "background 0.3s",
      }}
    >
      {/* Logo */}
      <div className="d-flex align-items-center mb-4">
        <span className="fs-4 fw-bold text-white ms-2">Your ToDo's</span>
      </div>

      {/* Nav Links */}
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item mb-2">
          <Link
            to="/dashboard"
            className={`nav-link d-flex align-items-center rounded-3 ${location.pathname === "/dashboard" ? "active-link" : "text-white-50"
              }`}
          >
            <FaHome className="me-2" />
            Dashboard
          </Link>
        </li>

        <li className="nav-item mb-2">
          <Link
            to="/add-task"
            className={`nav-link d-flex align-items-center rounded-3 ${location.pathname === "/add-task" ? "active-link" : "text-white-50"
              }`}
          >
            <FaPlusCircle className="me-2" />
            Add Task
          </Link>
        </li>

        <li className="nav-item mb-2">
          <Link
            to="/display-tasks"
            className={`nav-link d-flex align-items-center rounded-3 ${location.pathname === "/display-tasks" ? "active-link" : "text-white-50"
              }`}
          >
            <FaListUl className="me-2" />
            Tasks
          </Link>
        </li>
      </ul>

      {/* --- User Profile Section --- */}
      <div className="mt-auto position-relative">
        <div
          className="d-flex align-items-center justify-content-between text-white py-2 px-2 rounded-3"
          style={{
            backgroundColor: "rgba(255,255,255,0.1)",
            cursor: "pointer",
          }}
          onClick={() => setShowMenu(!showMenu)}
        >
          <div className="d-flex align-items-center">
            <FaUserCircle size={25} className="me-2" />
            <span className="fw-semibold">
              {loggedUser?.name || "User"}
            </span>

          </div>
        </div>

        {/* Dropdown Menu */}
        {showMenu && (
          <div
            className="position-absolute start-0 end-0 bg-white text-dark shadow rounded-3 mt-2 p-2"
            style={{ bottom: "60px", zIndex: 10 }}
          >
            <button
              className="btn btn-light w-100 d-flex align-items-center justify-content-between mb-2 rounded-3"
              onClick={() => setDarkMode(!darkMode)}
            >
              <span className="fw-semibold">Theme</span>
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>

            {loggedUser ? (
              <button
                className="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center rounded-3"
                onClick={handleLogout}
              >
                <FaSignOutAlt className="me-2" />
                Logout
              </button>
            ) : (
              <button
                className="btn btn-outline-success w-100 d-flex align-items-center justify-content-center rounded-3"
                onClick={() => navigate("/login")}
              >
                <FaUserCircle className="me-2" />
                Login
              </button>
            )}
          </div>
        )}


        <div className="text-center text-white-50 small mt-3">
          © 2025 ToDo App
        </div>
      </div>

      {/* --- Styling --- */}
      <style>{`
        .nav-link {
          color: #fff;
          padding: 10px 12px;
          transition: background 0.3s;
        }
        .nav-link:hover {
          background-color: #1B263B;
          color: #fff;
        }
        .active-link {
          background-color: #1B263B !important;
          color: #fff !important;
        }
      `}</style>
    </div>
  );
};

export default Navbar;
