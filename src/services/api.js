import axios from "axios";

// ✅ GET FROM ENVIRONMENT VARIABLES
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
const API_TIMEOUT = Number(import.meta.env.VITE_API_TIMEOUT) || 15000;

// ✅ LOG CONFIGURATION (ONLY IN DEVELOPMENT)
if (import.meta.env.DEV) {
  console.log("🔧 API Configuration:");
  console.log("  Base URL:", API_BASE_URL);
  console.log("  Timeout:", API_TIMEOUT + "ms");
  console.log("  Mode:", import.meta.env.MODE);
}

const API = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ REQUEST INTERCEPTOR
API.interceptors.request.use(
  (config) => {
    if (import.meta.env.DEV) {
      console.log("📤 Request:", config.method?.toUpperCase(), config.url);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ✅ RESPONSE INTERCEPTOR
API.interceptors.response.use(
  (response) => {
    if (import.meta.env.DEV) {
      console.log("📥 Response:", response.config.url, response.status);
    }
    return response;
  },
  (error) => {
    console.error("❌ API Error:", error);

    // Handle different error types
    if (error.code === "ECONNABORTED") {
      return Promise.reject({
        message: "Request timeout. Server is taking too long to respond.",
        status: 408,
        type: "TIMEOUT",
      });
    }

    if (error.code === "ERR_NETWORK") {
      return Promise.reject({
        message: "Network error. Backend server might be unreachable.",
        status: 503,
        type: "NETWORK",
      });
    }

    if (!error.response) {
      return Promise.reject({
        message: "No response from server. Check your connection.",
        status: 0,
        type: "NO_RESPONSE",
      });
    }

    const message =
      error.response?.data?.error?.message ||
      error.response?.data?.message ||
      error.message ||
      "Something went wrong.";

    return Promise.reject({
      message,
      status: error.response?.status || 500,
      type: "API_ERROR",
      data: error.response?.data,
    });
  }
);

// ✅ API ENDPOINTS
export const healthCheck = () => API.get("/health");
export const getEvent = () => API.get("/event");
export const checkEmail = (email) =>
  API.get(`/register/check?email=${encodeURIComponent(email)}`);
export const registerUser = (data) => API.post("/register", data);
export const checkStatus = (id) => API.get(`/register/${id}`);

// ✅ EXPORT CONFIG
export const apiConfig = {
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  mode: import.meta.env.MODE,
  dev: import.meta.env.DEV,
};

export default API;