import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Success from "./pages/Success";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import CursorGlow from "./components/CursorGlow";
import SmoothScroll from "./components/SmoothScroll";

// ✅ IMPORT ENV CONFIG
import env from "./config/env";
import { getEvent } from "./services/api";
import { useEventStore } from "./store/useEventStore";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const setEvent = useEventStore((state) => state.setEvent);
  const setLoading = useEventStore((state) => state.setLoading);
  const setError = useEventStore((state) => state.setError);
  const [retryCount, setRetryCount] = useState(0);

  // ✅ FETCH EVENT DATA WITH RETRY LOGIC
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        setError(null);

        if (env.app.isDev) {
          console.log("📡 Fetching event data from:", env.api.baseURL);
        }

        const res = await getEvent();

        if (env.app.isDev) {
          console.log("✅ Event data received:", res.data);
        }

        if (res.data.success) {
          setEvent(res.data.data);
        } else {
          setError("Failed to load event data");
        }
      } catch (err) {
        console.error("❌ API Error:", err);

        // ✅ RETRY LOGIC FOR RAILWAY COLD STARTS
        if (retryCount < env.api.retryAttempts && (err.type === "NETWORK" || err.status === 503)) {
          console.log(`🔄 Retrying... (${retryCount + 1}/${env.api.retryAttempts})`);
          setRetryCount((prev) => prev + 1);
          setTimeout(() => {
            fetchEvent();
          }, env.api.retryDelay);
        } else {
          setError(err.message || "Unable to connect to backend server.");
        }
      }
    };

    fetchEvent();
  }, [setEvent, setLoading, setError]);

  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-void-black overflow-hidden">
        {/* ✅ CONDITIONAL RENDERING BASED ON FEATURE FLAGS */}
        {env.features.customCursor && <CustomCursor />}
        {env.features.customCursor && <CursorGlow />}

        <ScrollToTop />
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/success/:id" element={<Success />} />
        </Routes>

        <Footer />

        {/* ✅ DEBUG MODE INDICATOR */}
        {env.app.isDev && env.features.debugMode && (
          <div className="fixed bottom-4 left-4 z-50 glass-strong rounded-xl p-3 text-xs font-mono">
            <p className="text-cyber-blue">🔧 Debug Mode Active</p>
            <p className="text-white/40">API: {env.api.baseURL}</p>
          </div>
        )}
      </div>
    </SmoothScroll>
  );
}

export default App;