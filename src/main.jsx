import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#1a1a2e",
            color: "#fff",
            border: "1px solid rgba(0,240,255,0.2)",
            borderRadius: "12px",
            backdropFilter: "blur(20px)",
          },
          success: {
            iconTheme: { primary: "#00ff88", secondary: "#0a0a0f" },
          },
          error: {
            iconTheme: { primary: "#ff4444", secondary: "#0a0a0f" },
          },
        }}
      />
      <App />
    </BrowserRouter>
  </React.StrictMode>
);