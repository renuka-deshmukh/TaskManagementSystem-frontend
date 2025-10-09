import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { Mail, Lock, LogIn } from "lucide-react";

const Login = ({ setIsLoggedIn }) => {  // ✅ Accept prop
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const inputRef = useRef();
  const navigate = useNavigate();
  const { loggedUser, login } = useContext(AuthContext);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  function handleLogin(e) {
    e.preventDefault();
    try {
      const msg = login(email, password);

      if (msg.includes("successful")) { // ✅ Ensure correct success check
        alert(msg);
        setIsLoggedIn(true); // ✅ Update parent state
        navigate("/dashboard");
      } else {
        alert("Invalid credentials ❌");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4 rounded-4" style={{ width: "400px" }}>
        {/* Heading */}
        <h2 className="text-center mb-4 fw-bold text-primary">
          <LogIn size={28} className="me-2" />
          Welcome Back
        </h2>
        <p className="text-center text-muted mb-4">
          Login to continue 🧑‍💻
        </p>

        {/* Form */}
        <form onSubmit={handleLogin}>
          {/* Email */}
          <div className="mb-3">
            <label className="form-label fw-semibold">
              <Mail size={18} className="me-2 text-primary" />
              Email Address
            </label>
            <input
              ref={inputRef}
              type="email"
              className="form-control rounded-3"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label fw-semibold">
              <Lock size={18} className="me-2 text-primary" />
              Password
            </label>
            <input
              type="password"
              className="form-control rounded-3"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 rounded-3 fw-semibold"
          >
            Login
          </button>
        </form>

        <div className="text-center my-3 text-muted">or</div>
        <div className="text-center">
          <span className="small">Don't have an account? </span>
          <Link
            to="/register"
            className="fw-semibold text-primary text-decoration-none"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
