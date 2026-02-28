import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { checkStatus } from "../services/api";
import { useEventStore } from "../store/useEventStore";
import toast from "react-hot-toast";
import {
  Search, Loader2, Clock, CheckCircle2, XCircle,
  Hash, User, Mail, Layers, Sparkles, Phone,
  Building2, Calendar, ArrowRight, Copy, Check,
} from "lucide-react";

const statusConfig = {
  pending: {
    icon: Clock,
    color: "#f59e0b",
    bgColor: "rgba(245, 158, 11, 0.1)",
    borderColor: "rgba(245, 158, 11, 0.2)",
    title: "Verification Pending",
    desc: "Your payment is being verified. This usually takes 24-48 hours.",
    animation: {
      rotate: [0, 360],
      transition: { duration: 8, repeat: Infinity, ease: "linear" },
    },
  },
  confirmed: {
    icon: CheckCircle2,
    color: "#10b981",
    bgColor: "rgba(16, 185, 129, 0.1)",
    borderColor: "rgba(16, 185, 129, 0.2)",
    title: "Registration Confirmed!",
    desc: "Congratulations! You're all set for TECHFUSION'26.",
    animation: {
      scale: [1, 1.2, 1],
      transition: { duration: 0.5 },
    },
  },
  rejected: {
    icon: XCircle,
    color: "#ef4444",
    bgColor: "rgba(239, 68, 68, 0.1)",
    borderColor: "rgba(239, 68, 68, 0.2)",
    title: "Registration Rejected",
    desc: "Payment verification failed. Please contact support.",
    animation: {
      x: [-5, 5, -5, 5, 0],
      transition: { duration: 0.5 },
    },
  },
};

export default function StatusChecker() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { registrationId } = useEventStore();

  const [searchId, setSearchId] = useState(registrationId || "");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleCheck = async (e) => {
    e.preventDefault();

    if (!searchId.trim()) {
      toast.error("Please enter your Registration ID");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const res = await checkStatus(searchId.trim());
      setResult(res.data.data);
    } catch (err) {
      toast.error(err?.response?.data?.error?.message || "Registration not found");
    } finally {
      setLoading(false);
    }
  };

  const copyId = () => {
    navigator.clipboard.writeText(result?.registration_id);
    setCopied(true);
    toast.success("Registration ID copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  const status = result?.status;
  const config = statusConfig[status];

  return (
    <section id="status" ref={ref} className="section relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-void-black via-void-deep to-void-black" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyber-blue/5 rounded-full blur-[200px]" />

      <div className="relative z-10 max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <span className="inline-block font-heading text-sm tracking-[0.3em] uppercase text-cyber-green/60 mb-4">
            Track Your Application
          </span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            <span className="text-white">Check </span>
            <span className="text-gradient">Status</span>
          </h2>
          <p className="font-body text-white/40 max-w-lg mx-auto">
            Enter your registration ID to check your application status
          </p>
        </motion.div>

        {/* Search Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          onSubmit={handleCheck}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1 group">
              <input
                value={searchId}
                onChange={(e) => setSearchId(e.target.value.toUpperCase())}
                placeholder="Enter Registration ID (e.g., TF26-XXXXX)"
                className="input-field pl-12 pr-4 w-full font-mono tracking-wider group-hover:border-white/20 focus:border-cyber-blue/50"
              />
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-cyber-blue transition-colors">
                <Hash className="w-5 h-5" />
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              className="btn-primary px-8 py-4 flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span className="hidden sm:inline">Checking...</span>
                </>
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  <span className="hidden sm:inline">Check Status</span>
                </>
              )}
            </motion.button>
          </div>
        </motion.form>

        {/* Loading State */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="glass-strong rounded-3xl p-10 text-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 mx-auto mb-4 rounded-full border-2 border-cyber-blue/20 border-t-cyber-blue"
              />
              <p className="font-heading text-white/50">Searching for your registration...</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Result */}
        <AnimatePresence mode="wait">
          {result && config && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="glass-strong rounded-3xl overflow-hidden"
            >
              {/* Status Header */}
              <div
                className="p-8 text-center border-b"
                style={{
                  background: config.bgColor,
                  borderColor: config.borderColor,
                }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, ...config.animation }}
                  className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center"
                  style={{ background: `${config.color}15` }}
                >
                  <config.icon className="w-10 h-10" style={{ color: config.color }} />
                </motion.div>

                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="font-display text-2xl font-bold mb-2"
                  style={{ color: config.color }}
                >
                  {config.title}
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="font-body text-white/50 text-sm max-w-sm mx-auto"
                >
                  {config.desc}
                </motion.p>
              </div>

              {/* Details */}
              <div className="p-8 space-y-4">
                {/* Registration ID */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center justify-between p-4 rounded-xl bg-white/2 border border-white/5"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-cyber-blue/10 flex items-center justify-center">
                      <Hash className="w-5 h-5 text-cyber-blue" />
                    </div>
                    <div>
                      <p className="text-xs text-white/30 font-heading uppercase">Registration ID</p>
                      <p className="font-mono text-white font-medium">{result.registration_id}</p>
                    </div>
                  </div>
                  <motion.button
                    onClick={copyId}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-cyber-green" />
                    ) : (
                      <Copy className="w-4 h-4 text-white/50" />
                    )}
                  </motion.button>
                </motion.div>

                {/* Grid Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { icon: User, label: "Name", value: result.name },
                    { icon: Mail, label: "Email", value: result.email },
                    { icon: Phone, label: "Phone", value: result.phone },
                    { icon: Building2, label: "College", value: result.college },
                    { icon: Layers, label: "Category", value: result.category },
                    { icon: Calendar, label: "Applied On", value: new Date(result.created_at).toLocaleDateString() },
                  ].map(({ icon: Icon, label, value }, i) => (
                    value && (
                      <motion.div
                        key={label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + i * 0.05 }}
                        className="flex items-start gap-3 p-4 rounded-xl bg-white/2"
                      >
                        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                          <Icon className="w-4 h-4 text-white/40" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs text-white/30 font-heading uppercase">{label}</p>
                          <p className="text-white/80 text-sm truncate">{value}</p>
                        </div>
                      </motion.div>
                    )
                  ))}
                </div>

                {/* Confirmed Message */}
                {status === "confirmed" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="p-6 rounded-2xl bg-gradient-to-r from-cyber-green/10 to-emerald-500/10 border border-cyber-green/20 text-center mt-6"
                  >
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Sparkles className="w-5 h-5 text-cyber-green" />
                      <span className="font-display text-lg font-bold text-cyber-green">
                        See you at TECHFUSION'26!
                      </span>
                      <Sparkles className="w-5 h-5 text-cyber-green" />
                    </div>
                    <p className="text-white/40 text-sm">
                      8th April 2026 • IT Auditorium
                    </p>
                  </motion.div>
                )}

                {/* Rejected Help */}
                {status === "rejected" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="p-4 rounded-xl bg-red-500/5 border border-red-500/20 flex items-center gap-3"
                  >
                    <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-red-400" />
                    </div>
                    <div>
                      <p className="text-sm text-white/70">Need help?</p>
                      <a href="mailto:support@techfusion.com" className="text-cyber-blue text-sm hover:underline">
                        Contact Support →
                      </a>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Help Text */}
        {!result && !loading && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center text-white/30 text-sm mt-8"
          >
            Don't have a registration ID?{" "}
            <a href="#register" className="text-cyber-blue hover:underline">
              Register now
            </a>
          </motion.p>
        )}
      </div>
    </section>
  );
}