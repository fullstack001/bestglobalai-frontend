import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_PORT, // Replace with your API base URL
  timeout: 300000, // Optional: Timeout for requests (in milliseconds)
  headers: {
    "Content-Type": "application/json", // Default headers
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Add authorization token or other custom logic
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors globally
    if (error.response?.status === 401) {
      console.error("Unauthorized. Redirecting to login.");
      // Redirect to login or handle logout
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
