// AuthProvider.js
import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loggedUser, setLoggedUser] = useState(null);

  // Load logged user from localStorage on refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("loggedUser");
    if (storedUser) {
      setLoggedUser(JSON.parse(storedUser));
    }
  }, []);

  // Register user
  const register = (name, email, password) => {
    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.some((u) => u.email === email)) {
      return "User already exists ❌";
    }

    const newUser = { name, email, password }; // ✅ save name also
    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));
    return "Registration successful ✅";
  };


  // Login user
  const login = (email, password) => {
    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.length === 0) {
      return "No registered users found. Please register first ❌";
    }

    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      setLoggedUser(foundUser);
      localStorage.setItem("loggedUser", JSON.stringify(foundUser));
      return "Login successful ✅";   // always return message
    }

    return null; // invalid credentials
  };

  // Logout user
  const logout = () => {
    setLoggedUser(null);
    localStorage.removeItem("loggedUser");
  };

  return (
    <AuthContext.Provider value={{ loggedUser, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
