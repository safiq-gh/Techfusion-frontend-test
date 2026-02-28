import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Zap, Mail, Phone, MapPin, Instagram, Twitter,
  Linkedin, Github, Heart, ArrowUpRight, Send,
} from "lucide-react";

// ✅ IMPORT ENV CONFIG
import env from "../config/env";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Categories", href: "#categories" },
  { name: "Details", href: "#details" },
  { name: "Register", href: "#register" },
  { name: "Status", href: "#status" },
];

// ✅ USE SOCIAL LINKS FROM ENV
const socialLinks = [
  { icon: Instagram, href: env.social.instagram, label: "Instagram", color: "#E4405F" },
  { icon: Twitter, href: env.social.twitter, label: "Twitter", color: "#1DA1F2" },
  { icon: Linkedin, href: env.social.linkedin, label: "LinkedIn", color: "#0A66C2" },
  { icon: Github, href: env.social.github, label: "GitHub", color: "#ffffff" },
];

// ✅ USE CONTACT INFO FROM ENV
const contactInfo = [
  { icon: Mail, text: env.contact.email, href: `mailto:${env.contact.email}` },
  { icon: Phone, text: env.contact.phone, href: `tel:${env.contact.phone.replace(/\s/g, "")}` },
  { icon: MapPin, text: env.contact.address, href: "#" },
];

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer ref={ref} className="relative overflow-hidden border-t border-white/5">
      {/* Background */}
      <div className="absolute inset-0 bg-void-black" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyber-blue/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyber-purple/5 rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("#home");
              }}
              className="inline-flex items-center gap-3 mb-6 group"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-cyber-blue/20 blur-xl rounded-full group-hover:bg-cyber-blue/40 transition-all" />
                <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-cyber-blue to-cyber-purple flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                {/* ✅ USE APP NAME FROM ENV */}
                <span className="font-display font-bold text-xl">
                  <span className="text-gradient">TECH</span>
                  <span className="text-white">FUSION</span>
                </span>
                <p className="text-xs text-white/30 tracking-widest">2026 EDITION</p>
              </div>
            </a>

            {/* ✅ USE APP TAGLINE FROM ENV */}
            <p className="font-body text-white/40 text-sm leading-relaxed mb-6">
              {env.app.tagline}. Organized by the Department of Information Technology.
              Showcase your innovations and compete for exciting prizes.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, href, label, color }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center hover:border-white/20 transition-all group"
                  aria-label={label}
                >
                  <Icon className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="font-heading font-semibold text-white mb-6 uppercase tracking-wider text-sm">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.05 }}
                >
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="font-body text-white/40 hover:text-cyber-blue transition-colors flex items-center gap-2 group text-sm"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-cyber-blue transition-colors" />
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="font-heading font-semibold text-white mb-6 uppercase tracking-wider text-sm">
              Contact Us
            </h4>
            <ul className="space-y-4">
              {contactInfo.map(({ icon: Icon, text, href }, i) => (
                <motion.li
                  key={text}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.05 }}
                >
                  <a href={href} className="flex items-start gap-3 group">
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-cyber-blue/10 transition-colors">
                      <Icon className="w-4 h-4 text-white/40 group-hover:text-cyber-blue transition-colors" />
                    </div>
                    <span className="font-body text-white/40 text-sm group-hover:text-white/70 transition-colors pt-1">
                      {text}
                    </span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="font-heading font-semibold text-white mb-6 uppercase tracking-wider text-sm">
              Stay Updated
            </h4>
            <p className="font-body text-white/40 text-sm mb-4">
              Subscribe to get the latest updates about {env.app.name}
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-cyber-blue/50 transition-colors"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 rounded-xl bg-gradient-to-r from-cyber-blue to-cyber-purple flex items-center justify-center"
              >
                <Send className="w-5 h-5 text-white" />
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="font-body text-white/30 text-sm flex items-center gap-1"
          >
            Made with <Heart className="w-4 h-4 text-red-500 inline" /> by Department of IT
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
            className="font-body text-white/30 text-sm"
          >
            © {new Date().getFullYear()} {env.app.name}. All rights reserved.
          </motion.p>

          {/* Back to Top */}
          <motion.button
            onClick={scrollToTop}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            whileHover={{ scale: 1.1, y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:border-cyber-blue/30 hover:bg-cyber-blue/10 transition-all group"
          >
            <svg
              className="w-5 h-5 text-white/40 group-hover:text-cyber-blue transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </motion.button>
        </div>

        {/* ✅ DEV MODE: Version Info */}
        {env.app.isDev && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 pt-4 border-t border-white/5 text-center"
          >
            <p className="text-xs text-white/20 font-mono">
              v{env.app.version} | {env.app.mode} mode | API: {env.api.baseURL.substring(0, 30)}...
            </p>
          </motion.div>
        )}
      </div>
    </footer>
  );
}