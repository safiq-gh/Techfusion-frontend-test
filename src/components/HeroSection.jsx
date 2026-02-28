import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { gsap } from "gsap";
import { Calendar, MapPin, Trophy, Users, Sparkles, ArrowRight } from "lucide-react";
import ParticlesBg from "./ParticlesBg";
import CursorGlow from "./CursorGlow";

// ✅ IMPORT ENV CONFIG
import env from "../config/env";

const stats = [
  { value: "₹1L+", label: "Prize Pool", icon: Trophy },
  { value: "200+", label: "Participants", icon: Users },
  { value: "4", label: "Categories", icon: Sparkles },
  { value: "1", label: "Epic Day", icon: Calendar },
];

export default function HeroSection({ event }) {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  const smoothMouseX = useSpring(0, { stiffness: 50, damping: 20 });
  const smoothMouseY = useSpring(0, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 30;
      const y = (clientY / innerHeight - 0.5) * 30;
      smoothMouseX.set(x);
      smoothMouseY.set(y);
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [smoothMouseX, smoothMouseY]);

  // GSAP Title Animation
  useEffect(() => {
    // ✅ SKIP ANIMATIONS IF DISABLED
    if (!env.features.animations) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-letter",
        {
          opacity: 0,
          y: 100,
          rotateX: -90,
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1.2,
          stagger: 0.03,
          ease: "expo.out",
        }
      );

      gsap.fromTo(
        ".hero-subtitle",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, delay: 0.8, ease: "power3.out" }
      );

      gsap.fromTo(
        ".hero-cta",
        { opacity: 0, y: 30, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, delay: 1.2, ease: "back.out(1.7)" }
      );

      gsap.fromTo(
        ".hero-stat",
        { opacity: 0, y: 50, rotateY: -20 },
        { opacity: 1, y: 0, rotateY: 0, duration: 0.8, stagger: 0.1, delay: 1.5, ease: "power2.out" }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollToRegister = () => {
    document.querySelector("#register")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToDetails = () => {
    document.querySelector("#details")?.scrollIntoView({ behavior: "smooth" });
  };

  const titleChars = "TECHFUSION".split("");
  const subtitle = env.app.tagline; // ✅ USE FROM ENV

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Effects - ✅ CONDITIONAL */}
      {env.features.particles && <ParticlesBg />}
      <div className="absolute inset-0 bg-grid opacity-20" />

      {/* Animated Gradient Orbs */}
      <motion.div
        style={{ x: smoothMouseX, y: smoothMouseY }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-blue/20 rounded-full blur-[120px] pointer-events-none"
      />
      <motion.div
        style={{ x: smoothMouseX, y: smoothMouseY }}
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyber-purple/20 rounded-full blur-[120px] pointer-events-none"
        transition={{ delay: 0.2 }}
      />

      {/* Main Content */}
      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        {/* Year Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 mb-8"
        >
          <Sparkles className="w-4 h-4 text-cyber-blue" />
          <span className="font-heading text-sm tracking-widest text-white/70">2026 EDITION</span>
        </motion.div>

        {/* Main Title */}
        <h1
          ref={titleRef}
          className="font-display font-black text-[clamp(3rem,12vw,10rem)] leading-none mb-6 perspective-1000"
          style={{
            background: "linear-gradient(135deg, #00d4ff 0%, #a855f7 50%, #ec4899 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "0 0 80px rgba(0,212,255,0.3)",
          }}
        >
          {titleChars.map((char, i) => (
            <span
              key={i}
              className="hero-letter inline-block hover:scale-110 transition-transform duration-300"
              style={{ display: "inline-block" }}
            >
              {char}
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <motion.p className="hero-subtitle font-heading text-lg sm:text-xl md:text-2xl text-white/50 mb-12 tracking-wider">
          {env.features.animations ? (
            subtitle.split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 + i * 0.02 }}
                className="inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))
          ) : (
            subtitle
          )}
        </motion.p>

        {/* Info Pills - ✅ USE ENV FALLBACKS */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-12 hero-cta">
          {[
            { icon: Calendar, text: event?.date || env.event.date, color: "cyber-blue" },
            { icon: MapPin, text: event?.venue || env.event.venue, color: "cyber-purple" },
            { icon: Trophy, text: `₹${event?.registration_fee ?? env.event.defaultFee} Entry`, color: "cyber-green" },
            { icon: Users, text: `${event?.slots_available ?? env.event.defaultSlots} Slots`, color: "cyber-orange" },
          ].map(({ icon: Icon, text, color }, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group px-4 sm:px-6 py-3 rounded-full glass border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Icon className={`w-4 h-4 text-${color} group-hover:scale-110 transition-transform`} />
                <span className="font-heading text-xs sm:text-sm text-white/70 group-hover:text-white transition-colors">
                  {text}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 hero-cta">
          <motion.button
            onClick={scrollToRegister}
            disabled={event && !event.registration_open}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary group relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="relative z-10 flex items-center gap-2 px-8 py-4">
              {event && !event.registration_open ? "Registrations Closed" : "Register Now"}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-cyber-purple to-cyber-pink opacity-0 group-hover:opacity-100 transition-opacity"
              layoutId="buttonGlow"
            />
          </motion.button>

          <motion.button
            onClick={scrollToDetails}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-secondary px-8 py-4"
          >
            <span className="flex items-center gap-2">
              Explore Categories
              <Sparkles className="w-4 h-4" />
            </span>
          </motion.button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {stats.map(({ value, label, icon: Icon }, i) => (
            <motion.div
              key={label}
              whileHover={{ y: -8, scale: 1.02 }}
              className="hero-stat glass-strong rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-all duration-500 group"
            >
              <Icon className="w-8 h-8 text-cyber-blue mx-auto mb-3 group-hover:scale-110 group-hover:rotate-12 transition-all" />
              <div className="font-display text-3xl font-black text-gradient mb-1">{value}</div>
              <p className="font-heading text-xs text-white/40 uppercase tracking-wider">{label}</p>
            </motion.div>
          ))}
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:block"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2 cursor-pointer"
            onClick={scrollToDetails}
          >
            <motion.div className="w-1.5 h-1.5 rounded-full bg-cyber-blue" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* ✅ DEV MODE DEBUG */}
      {env.app.isDev && env.features.debugMode && (
        <div className="fixed bottom-4 right-4 glass-strong rounded-xl p-3 text-xs font-mono z-50">
          <p className="text-white/40">Backend: {env.api.baseURL}</p>
          <p className="text-white/30">Slots: {event?.slots_available || "N/A"}</p>
        </div>
      )}
    </section>
  );
}