import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Globe, ShieldCheck, Cpu, Lightbulb, ArrowUpRight, Zap } from "lucide-react";

const categories = [
  {
    icon: Globe,
    title: "Web & Mobile",
    subtitle: "Development",
    desc: "Build innovative web apps, mobile solutions, and full-stack projects that solve real problems",
    color: "#00d4ff",
    gradient: "from-cyber-blue/20 to-cyber-blue/5",
    features: ["React / Next.js", "Flutter / React Native", "Full Stack"],
  },
  {
    icon: ShieldCheck,
    title: "Cyber",
    subtitle: "Security",
    desc: "Present security tools, ethical hacking solutions, and defense systems for the digital age",
    color: "#a855f7",
    gradient: "from-cyber-purple/20 to-cyber-purple/5",
    features: ["Penetration Testing", "Cryptography", "Network Security"],
  },
  {
    icon: Cpu,
    title: "IoT &",
    subtitle: "Robotics",
    desc: "Showcase hardware-software integration, smart devices, and automation systems",
    color: "#ec4899",
    gradient: "from-cyber-pink/20 to-cyber-pink/5",
    features: ["Arduino / RPi", "Embedded Systems", "Automation"],
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    subtitle: "in IT",
    desc: "AI, Machine Learning, Blockchain, Cloud — push the boundaries of technology",
    color: "#10b981",
    gradient: "from-cyber-green/20 to-cyber-green/5",
    features: ["AI / ML", "Blockchain", "Cloud Computing"],
  },
];

function CategoryCard({ category, index }) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotX = ((y - centerY) / centerY) * -10;
    const rotY = ((x - centerX) / centerX) * 10;
    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const { icon: Icon, title, subtitle, desc, color, gradient, features } = category;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: "transform 0.1s ease-out",
      }}
      className="group relative"
    >
      {/* Glow Effect */}
      <div
        className="absolute -inset-0.5 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"
        style={{ background: `linear-gradient(135deg, ${color}40, transparent)` }}
      />

      {/* Card */}
      <div className="relative glass-strong rounded-3xl p-8 sm:p-10 border border-white/5 group-hover:border-white/10 transition-all duration-500 h-full">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center border border-white/5`}
          >
            <Icon className="w-8 h-8" style={{ color }} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileHover={{ opacity: 1, scale: 1 }}
            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center"
          >
            <ArrowUpRight className="w-5 h-5 text-white/50" />
          </motion.div>
        </div>

        {/* Title */}
        <h3 className="font-display text-2xl sm:text-3xl font-bold mb-1">
          <span className="text-white">{title}</span>
          <br />
          <span style={{ color }}>{subtitle}</span>
        </h3>

        {/* Description */}
        <p className="font-body text-white/40 text-sm sm:text-base mt-4 mb-6 leading-relaxed">
          {desc}
        </p>

        {/* Features */}
        <div className="flex flex-wrap gap-2">
          {features.map((feature, i) => (
            <motion.span
              key={feature}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="px-3 py-1.5 rounded-full text-xs font-heading font-medium bg-white/3 border border-white/5 text-white/50 hover:text-white hover:border-white/20 transition-all"
            >
              {feature}
            </motion.span>
          ))}
        </div>

        {/* Bottom Glow */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
        />

        {/* Sparkle Effect */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileHover={{ opacity: 1, scale: 1 }}
          className="absolute top-4 right-4"
        >
          <Zap className="w-4 h-4" style={{ color }} />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function EventCategories() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="categories" ref={ref} className="section relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-void-black via-void-deep to-void-black" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyber-purple/5 rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="inline-block font-heading text-sm tracking-[0.3em] uppercase text-cyber-purple/60 mb-4">
            Choose Your Domain
          </span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="text-white">Event </span>
            <span className="text-gradient">Categories</span>
          </h2>
          <p className="font-body text-white/40 max-w-xl mx-auto text-base sm:text-lg">
            Four exciting domains to showcase your skills. Pick your arena and compete for glory.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {categories.map((category, i) => (
            <CategoryCard key={category.title} category={category} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}