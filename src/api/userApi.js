import axiosInstance from "./api";

// Register
export const registerUser = (userData) =>
  axiosInstance.post("/users/register", userData);

// Login
export const loginUser = (credentials) =>
  axiosInstance.post("/users/login", credentials);

// ✅ Get User Info by ID
export const getUserInfoById = (userId) =>
  axiosInstance.get(`/users/getUserInfo/${userId}`);
