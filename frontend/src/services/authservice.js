import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

export const signupUser = async (userData) => {
  const response = await axios.post(`${API_URL}/signup`, userData, {
    withCredentials: true,
  });

  return response.data;
};

export const loginUser = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData, {
    withCredentials: true,
  });

  return response.data;
};

export const logoutUser = async () => {
  const response = await axios.post(
    `${API_URL}/logout`,
    {},
    {
      withCredentials: true,
    }
  );

  return response.data;
};

export const getCurrentUser = async () => {
  const response = await axios.get("http://localhost:5000/api/user/me", {
    withCredentials: true,
  });

  return response.data;
};

export const updateProfile = async (userData) => {
  const response = await axios.put(
    "http://localhost:5000/api/user/profile",
    userData,
    {
      withCredentials: true,
    }
  );

  return response.data;
};