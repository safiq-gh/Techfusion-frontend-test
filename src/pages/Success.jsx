import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, Copy, ArrowLeft, Sparkles, Calendar, Mail, Clock } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Success() {
  const { id } = useParams();
  const [copied, setCopied] = useState(false);

  const copyId = () => {
    navigator.clipboard.writeText(id);
    setCopied(true);
    toast.success("Registration ID copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  const steps = [
    { icon: Clock, title: "Verification", desc: "Payment will be verified within 24 hours" },
    { icon: Mail, title: "Confirmation", desc: "You'll receive an email confirmation" },
    { icon: Calendar, title: "Event Day", desc: "Join us on 8th April 2026" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-24">
      <div className="fixed inset-0 bg-void-black">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-cyber-green/10 rounded-full blur-[200px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="relative z-10 w-full max-w-lg"
      >
        <div className="glass-strong rounded-4xl p-10 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="relative inline-block mb-8"
          >
            <div className="absolute inset-0 bg-cyber-green/20 rounded-full blur-3xl" />
            <div className="relative w-24 h-24 rounded-full bg-linear-to-br from-cyber-green/20 to-emerald-500/20 flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-cyber-green" />
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-cyber-green" />
              <h1 className="font-display text-2xl font-bold text-gradient">Registration Submitted!</h1>
            </div>
            <p className="font-body text-white/40 mb-8">Your registration is pending verification.</p>

            <div className="mb-8 p-6 rounded-2xl bg-white/2 border border-white/5">
              <p className="font-heading text-xs text-white/30 uppercase tracking-wider mb-3">
                Your Registration ID
              </p>
              <div className="flex items-center justify-center gap-3">
                <code className="font-mono text-2xl text-cyber-blue tracking-wider">{id}</code>
                <motion.button
                  onClick={copyId}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:border-cyber-blue/30 transition-colors"
                >
                  <Copy className={`w-4 h-4 ${copied ? "text-cyber-green" : "text-white/50"}`} />
                </motion.button>
              </div>
            </div>

            <div className="space-y-3 mb-8">
              {steps.map(({ icon: Icon, title, desc }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + i * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-xl bg-white/1 text-left"
                >
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-cyber-blue" />
                  </div>
                  <div>
                    <p className="font-heading font-medium text-white text-sm">{title}</p>
                    <p className="font-body text-white/30 text-xs">{desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/" className="flex-1">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full btn-secondary flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Home
                </motion.button>
              </Link>
              <Link to="/#status" className="flex-1">
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full btn-primary">
                  <span>Check Status</span>
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}