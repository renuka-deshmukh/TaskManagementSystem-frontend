import React, { createContext, useState, useEffect } from "react";
import { registerUser, loginUser } from "../api/userApi";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loggedUser, setLoggedUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedUser");
    if (storedUser) setLoggedUser(JSON.parse(storedUser));
  }, []);

  const register = async (name, email, password) => {
    try {
      const res = await registerUser({ name, email, password });
      return res.data.msg;
    } catch (err) {
      console.error(err);
      return err.response?.data?.msg || "Registration failed ❌";
    }
  };

 

const login = async (email, password) => {
  try {
    const res = await loginUser({ email, password });

    if (res.data.success) {
      // ✅ Store token and user info
      localStorage.setItem("token", res.data.token);
      localStorage.setItem(
        "loggedUser",
        JSON.stringify({ email, name: res.data.name, user_id: res.data.user_id })
      );

      setLoggedUser({ email, name: res.data.name, user_id: res.data.user_id });

      // ✅ Return full response to handle in Login.jsx
      return res;
    }

    return res; // even if not successful
  } catch (err) {
    console.error(err);
    return { data: { success: false, msg: "Login failed ❌" } };
  }
};

  const logout = () => {
    setLoggedUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("loggedUser");
  };

  return (
    <AuthContext.Provider value={{ loggedUser, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
