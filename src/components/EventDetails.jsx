import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Calendar, Clock, MapPin, Users, Trophy,
  GraduationCap, School, Sparkles, Zap,
} from "lucide-react";
import { useEventStore } from "../store/useEventStore";

export default function EventDetails() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { event } = useEventStore();

  const details = [
    { icon: Calendar, label: "Date", value: "8th April 2026", color: "#00d4ff" },
    { icon: Clock, label: "Time", value: "9 AM - 5 PM", color: "#a855f7" },
    { icon: MapPin, label: "Venue", value: "IT Auditorium", color: "#ec4899" },
    { icon: Users, label: "Slots Left", value: event?.slots_available ?? 156, color: "#10b981" },
  ];

  return (
    <section id="details" ref={ref} className="section relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-void-black" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-cyber-purple/5 blur-[200px]" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block font-heading text-sm tracking-[0.3em] uppercase text-cyber-blue/60 mb-4">
            Mark Your Calendar
          </span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold">
            <span className="text-white">Event </span>
            <span className="text-gradient">Details</span>
          </h2>
        </motion.div>

        {/* Info Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {details.map(({ icon: Icon, label, value, color }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: 0.3 + i * 0.1, type: "spring", stiffness: 200 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="relative group p-6 rounded-3xl bg-white/2 border border-white/5 hover:border-white/10 transition-all duration-500"
            >
              {/* Glow */}
              <div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity"
                style={{ background: `${color}20` }}
              />

              <div className="relative">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.6 }}
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
                  style={{ background: `${color}10` }}
                >
                  <Icon className="w-6 h-6" style={{ color }} />
                </motion.div>
                <p className="font-heading text-xs text-white/30 uppercase tracking-wider mb-1">
                  {label}
                </p>
                <p className="font-display font-bold text-xl text-white">{value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* College */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="p-8 rounded-3xl bg-white/2 border border-white/5 text-center group"
          >
            <GraduationCap className="w-10 h-10 text-cyber-blue mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <p className="font-heading text-sm text-white/30 uppercase tracking-wider mb-2">
              College Students
            </p>
            <div className="font-display text-4xl font-black text-white mb-1">
              ₹{event?.entry_fee ?? 100}
            </div>
            <p className="font-body text-white/20 text-sm">per person</p>
          </motion.div>

          {/* Prize Pool (Featured) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            whileHover={{ y: -8, scale: 1.05 }}
            className="relative p-8 rounded-3xl overflow-hidden text-center group"
          >
            {/* Animated Border */}
            <div className="absolute inset-0 rounded-3xl p-[1px] bg-gradient-to-r from-cyber-blue via-cyber-purple to-cyber-pink">
              <div className="w-full h-full rounded-3xl bg-void-deep" />
            </div>

            <div className="relative z-10">
              {/* Glow Effect */}
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-cyber-yellow/20 rounded-full blur-3xl"
              />

              <Trophy className="w-12 h-12 text-cyber-yellow mx-auto mb-4 relative z-10 group-hover:scale-110 group-hover:rotate-12 transition-all" />
              <p className="font-heading text-sm text-cyber-yellow/60 uppercase tracking-wider mb-2">
                Total Prize Pool
              </p>
              <div className="font-display text-5xl font-black mb-1" style={{
                background: "linear-gradient(135deg, #ffd700, #ffed4e)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
                ₹1 LAKH
              </div>
              <p className="font-body text-white/30 text-sm mb-4">across categories</p>

              <div className="flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4 text-cyber-yellow/50" />
                <span className="text-xs text-white/30">Exciting prizes await</span>
                <Sparkles className="w-4 h-4 text-cyber-yellow/50" />
              </div>
            </div>
          </motion.div>

          {/* School */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.7 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="p-8 rounded-3xl bg-white/2 border border-white/5 text-center group"
          >
            <School className="w-10 h-10 text-cyber-green mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <p className="font-heading text-sm text-white/30 uppercase tracking-wider mb-2">
              School Students
            </p>
            <div className="font-display text-4xl font-black text-cyber-green mb-1">
              FREE
            </div>
            <p className="font-body text-white/20 text-sm">no entry fee</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}