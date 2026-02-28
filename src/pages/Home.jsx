import React from "react";
import { useEventStore } from "../store/useEventStore";
import HeroSection from "../components/HeroSection";
import EventCategories from "../components/EventCategories";
import EventDetails from "../components/EventDetails";
import PaymentSection from "../components/PaymentSection";
import RegistrationForm from "../components/RegistrationForm";
import StatusChecker from "../components/StatusChecker";
import LoadingSkeleton from "../components/LoadingSkeleton";
import { motion, AnimatePresence } from "framer-motion";
import { WifiOff, RefreshCw, ExternalLink, AlertTriangle } from "lucide-react";

// ✅ GET BACKEND URL FROM ENV
const BACKEND_URL = import.meta.env.VITE_API_BASE_URL || "https://techfusion-backend-production.up.railway.app/api";

// ✅ SCROLL TO TOP BUTTON COMPONENT
function ScrollToTopButton() {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-gradient-to-r from-cyber-blue to-cyber-purple flex items-center justify-center shadow-lg shadow-cyber-blue/25 hover:shadow-cyber-blue/40 transition-shadow"
        >
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export default function Home() {
  const { event, loading, error } = useEventStore();

  // ✅ LOADING STATE
  if (loading) {
    return <LoadingSkeleton />;
  }

  // ✅ ERROR STATE WITH RETRY
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-20">
        {/* Background Effects */}
        <div className="fixed inset-0 bg-void-black">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-500/5 rounded-full blur-[200px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="relative z-10 glass-strong rounded-3xl p-8 sm:p-10 text-center max-w-lg w-full"
        >
          {/* Animated Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-red-500/20 to-orange-500/20 flex items-center justify-center border border-red-500/20"
          >
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <WifiOff className="w-10 h-10 text-red-500" />
            </motion.div>
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-display text-2xl sm:text-3xl font-bold text-white mb-3"
          >
            Connection Error
          </motion.h2>

          {/* Error Message */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="font-body text-white/60 mb-6 text-sm leading-relaxed"
          >
            {error}
          </motion.p>

          {/* Backend Status */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-6 p-4 rounded-xl bg-white/5 border border-white/10"
          >
            <p className="text-xs text-white/40 mb-2 font-heading uppercase tracking-wider">
              Backend URL
            </p>
            <code className="text-xs text-cyber-blue font-mono break-all">
              {BACKEND_URL.replace("/api", "")}
            </code>
          </motion.div>

          {/* Troubleshooting */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-6 text-left"
          >
            <p className="text-xs text-white/50 font-heading uppercase tracking-wider mb-3 flex items-center gap-2">
              <AlertTriangle className="w-3 h-3" />
              Possible Issues
            </p>
            <ul className="space-y-2 text-xs text-white/40">
              {[
                "Backend server might be sleeping (Railway cold start ~30s)",
                "CORS policy not configured for your domain",
                "Backend deployment failed or crashed",
                "Network/firewall blocking the connection",
              ].map((issue, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + i * 0.1 }}
                  className="flex items-start gap-2"
                >
                  <span className="text-cyber-blue mt-0.5">•</span>
                  {issue}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <motion.button
              onClick={() => window.location.reload()}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="btn-primary flex-1 flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Retry Connection
            </motion.button>

            <motion.button
              onClick={() => window.open(`${BACKEND_URL}/event`, "_blank")}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="btn-secondary flex-1 flex items-center justify-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              Test Backend
            </motion.button>
          </motion.div>

          {/* Help Text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-xs text-white/30 mt-6"
          >
            If the issue persists, contact your backend developer
          </motion.p>

          {/* Dev Mode Indicator */}
          {import.meta.env.DEV && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="mt-4 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20"
            >
              <p className="text-xs text-yellow-500/80 font-mono">
                🔧 Dev Mode: Check console for detailed error logs
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    );
  }

  // ✅ SAFETY CHECK
  if (!event) return null;

  // ✅ MAIN CONTENT
  return (
    <AnimatePresence mode="wait">
      <motion.main
        key="home-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        {/* Hero Section */}
        <HeroSection event={event} />

        {/* Categories */}
        <EventCategories />

        {/* Event Details */}
        <EventDetails event={event} />

        {/* Payment Section */}
        <PaymentSection event={event} />

        {/* Registration Form */}
        <RegistrationForm event={event} />

        {/* Status Checker */}
        <StatusChecker />

        {/* Scroll to Top Button */}
        <ScrollToTopButton />
      </motion.main>
    </AnimatePresence>
  );
}