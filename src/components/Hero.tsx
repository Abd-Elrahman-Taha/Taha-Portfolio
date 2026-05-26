import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronDown, ArrowRight, Play } from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      delay,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  }),
};

interface FloatingShapeProps {
  className?: string;
  delay?: number;
  duration?: number;
  children: React.ReactNode;
}

function FloatingShape({ className = "", delay = 0, duration = 6, children }: FloatingShapeProps) {
  return (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
      animate={{ y: [0, -18, 0], rotate: [0, 3, -3, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.getElementById(href.replace("#", ""))?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "#090b0e" }}
    >
      {/* Deep layered background */}
      <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(0,204,184,0.12) 0%, transparent 60%)",
      }} />
      <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse 60% 50% at 80% 80%, rgba(6,182,212,0.05) 0%, transparent 50%)",
      }} />
      <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse 50% 40% at 10% 60%, rgba(0,204,184,0.04) 0%, transparent 50%)",
      }} />

      {/* Blueprint grid */}
      <div className="absolute inset-0 blueprint-grid opacity-100" />

      {/* Moving grid animation */}
      <div
        className="absolute inset-0 blueprint-grid-dense opacity-30"
        style={{ animation: "grid-move 25s linear infinite" }}
      />

      {/* Top fade for navbar blend */}
      <div className="absolute top-0 left-0 right-0 h-48"
        style={{ background: "linear-gradient(180deg, #090b0e 0%, transparent 100%)" }}
      />

      {/* Ambient orbs */}
      <div className="orb-teal w-[600px] h-[600px] top-[-150px] left-1/2 -translate-x-1/2" />
      <div className="orb-cyan w-[400px] h-[400px] bottom-[10%] right-[-100px]" />

      {/* Floating Civil Engineering Blueprint Vectors */}
      <FloatingShape className="top-[10%] left-[5%] opacity-30 hidden xl:block" delay={0} duration={28}>
        <svg width="220" height="220" viewBox="0 0 220 220" fill="none" className="text-teal-500/60">
          <circle cx="110" cy="110" r="90" stroke="currentColor" strokeWidth="0.5" strokeDasharray="5 5" />
          <circle cx="110" cy="110" r="50" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="110" cy="110" r="20" stroke="currentColor" strokeWidth="0.5" fill="currentColor" fillOpacity="0.04" />
          <line x1="110" y1="10" x2="110" y2="210" stroke="currentColor" strokeWidth="0.4" />
          <line x1="10" y1="110" x2="210" y2="110" stroke="currentColor" strokeWidth="0.4" />
          <line x1="46.5" y1="46.5" x2="173.5" y2="173.5" stroke="currentColor" strokeWidth="0.3" strokeDasharray="3 6" />
          <line x1="173.5" y1="46.5" x2="46.5" y2="173.5" stroke="currentColor" strokeWidth="0.3" strokeDasharray="3 6" />
          <text x="120" y="55" fill="currentColor" fontSize="7" fontFamily="monospace">E 450,230.12</text>
          <text x="120" y="66" fill="currentColor" fontSize="7" fontFamily="monospace">N 2,674,891.84</text>
          <text x="120" y="77" fill="currentColor" fontSize="7" fontFamily="monospace">ZONE 37R</text>
        </svg>
      </FloatingShape>

      <FloatingShape className="top-[15%] right-[6%] opacity-25 hidden lg:block" delay={5} duration={32}>
        <svg width="260" height="190" viewBox="0 0 260 190" fill="none" className="text-turquoise-400/50">
          <rect x="20" y="20" width="90" height="90" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" />
          <rect x="150" y="20" width="90" height="90" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" />
          <rect x="60" y="58" width="14" height="14" fill="currentColor" fillOpacity="0.4" />
          <rect x="190" y="58" width="14" height="14" fill="currentColor" fillOpacity="0.4" />
          <line x1="65" y1="155" x2="195" y2="155" stroke="currentColor" strokeWidth="0.5" />
          <line x1="65" y1="148" x2="65" y2="162" stroke="currentColor" strokeWidth="0.5" />
          <line x1="195" y1="148" x2="195" y2="162" stroke="currentColor" strokeWidth="0.5" />
          <text x="130" y="146" fill="currentColor" fontSize="8" fontFamily="monospace" textAnchor="middle">14.50 m</text>
          <text x="65" y="44" fill="currentColor" fontSize="7" fontFamily="monospace" textAnchor="middle">COL C1</text>
          <text x="195" y="44" fill="currentColor" fontSize="7" fontFamily="monospace" textAnchor="middle">COL C2</text>
        </svg>
      </FloatingShape>

      <FloatingShape className="bottom-[20%] left-[10%] opacity-25 hidden lg:block" delay={10} duration={35}>
        <svg width="210" height="130" viewBox="0 0 210 130" fill="none" className="text-teal-400/50">
          <line x1="10" y1="110" x2="200" y2="110" stroke="currentColor" strokeWidth="0.5" />
          <line x1="10" y1="110" x2="105" y2="22" stroke="currentColor" strokeWidth="0.8" />
          <line x1="105" y1="22" x2="200" y2="110" stroke="currentColor" strokeWidth="0.8" />
          <line x1="105" y1="22" x2="105" y2="110" stroke="currentColor" strokeWidth="0.4" strokeDasharray="3 3" />
          <line x1="55" y1="66" x2="55" y2="110" stroke="currentColor" strokeWidth="0.4" strokeDasharray="2 4" />
          <line x1="155" y1="66" x2="155" y2="110" stroke="currentColor" strokeWidth="0.4" strokeDasharray="2 4" />
          <polygon points="5,118 10,110 15,118" stroke="currentColor" strokeWidth="0.5" fill="none" />
          <circle cx="200" cy="114" r="4" stroke="currentColor" strokeWidth="0.5" fill="none" />
          <text x="110" y="18" fill="currentColor" fontSize="7" fontFamily="monospace">P = 250 kN</text>
          <text x="32" y="122" fill="currentColor" fontSize="6" fontFamily="monospace">L/4</text>
          <text x="73" y="122" fill="currentColor" fontSize="6" fontFamily="monospace">L/4</text>
          <text x="118" y="122" fill="currentColor" fontSize="6" fontFamily="monospace">L/4</text>
          <text x="160" y="122" fill="currentColor" fontSize="6" fontFamily="monospace">L/4</text>
        </svg>
      </FloatingShape>

      <FloatingShape className="bottom-[18%] right-[18%] opacity-30 hidden md:block" delay={7} duration={22}>
        <svg width="110" height="110" viewBox="0 0 110 110" fill="none" className="text-cyan-400/50">
          <line x1="10" y1="55" x2="100" y2="55" stroke="currentColor" strokeWidth="0.4" />
          <polygon points="55,55 43,30 67,30" fill="currentColor" fillOpacity="0.25" />
          <polygon points="55,55 43,30 67,30" stroke="currentColor" strokeWidth="0.5" fill="none" />
          <text x="55" y="24" fill="currentColor" fontSize="7" fontFamily="monospace" textAnchor="middle">+32.650m</text>
          <text x="55" y="72" fill="currentColor" fontSize="6" fontFamily="monospace" textAnchor="middle">T.B.M #04</text>
          <circle cx="55" cy="55" r="3" fill="currentColor" fillOpacity="0.6" />
        </svg>
      </FloatingShape>

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        {/* Overline Badge */}
        <motion.div
          custom={0}
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-8"
        >
          <span className="section-badge">
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ background: "#00ccb8", boxShadow: "0 0 8px rgba(0,204,184,0.8)" }}
            />
            Civil Engineering Portfolio · 30+ Years Experience
          </span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          custom={0.15}
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="font-heading font-black mb-6 leading-[0.92] tracking-[-0.04em]"
          style={{ fontSize: "clamp(3.5rem, 10vw, 8rem)" }}
        >
          <span style={{
            background: "linear-gradient(180deg, #ffffff 0%, rgba(240,240,240,0.85) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            Eng. Taha
          </span>
          <br />
          <span style={{
            background: "linear-gradient(135deg, #00e8d5 0%, #00ccb8 40%, #00f5e5 80%, #22d3ee 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            textShadow: "none",
            filter: "drop-shadow(0 0 40px rgba(0,204,184,0.4))",
          }}>
            Mohamed
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.div
          custom={0.3}
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-4"
        >
          <p
            className="text-xl md:text-2xl lg:text-3xl font-heading font-bold tracking-tight"
            style={{
              background: "linear-gradient(90deg, #00e8d5, #00ccb8, #22d3ee)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Senior Civil Engineer & Project Management Expert
          </p>
        </motion.div>

        {/* Description */}
        <motion.p
          custom={0.45}
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-base md:text-lg lg:text-xl font-sans font-light max-w-2xl mx-auto leading-relaxed mb-10"
          style={{ color: "rgba(158,158,158,0.9)" }}
        >
          30+ Years Delivering Landmark Infrastructure Projects Across
          Saudi Arabia & Egypt — Valued at Over{" "}
          <span style={{ color: "#00ccb8", fontWeight: 600 }}>1 Billion SAR</span>
        </motion.p>

        {/* Stats row */}
        <motion.div
          custom={0.55}
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-wrap justify-center gap-8 mb-12"
        >
          {[
            { value: "30+", label: "Years" },
            { value: "100+", label: "Projects" },
            { value: "1B+", label: "SAR Managed" },
            { value: "50+", label: "Teams Led" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <span
                className="font-heading font-black text-3xl leading-none"
                style={{
                  background: "linear-gradient(135deg, #00e8d5, #00ccb8)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  filter: "drop-shadow(0 0 12px rgba(0,204,184,0.4))",
                }}
              >
                {stat.value}
              </span>
              <span className="text-xs font-medium uppercase tracking-[0.15em] mt-1" style={{ color: "rgba(117,117,117,0.9)" }}>
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          custom={0.65}
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#projects"
            onClick={(e) => handleScrollTo(e, "#projects")}
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-xl font-heading font-bold text-sm transition-all duration-300 active:scale-[0.98]"
            style={{
              background: "linear-gradient(135deg, #00ccb8, #00e8d5)",
              color: "#090b0e",
              padding: "1rem 2rem",
              boxShadow: "0 0 40px rgba(0,204,184,0.35), 0 8px 30px rgba(0,0,0,0.4)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = "0 0 70px rgba(0,204,184,0.55), 0 12px 40px rgba(0,0,0,0.5)";
              (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = "0 0 40px rgba(0,204,184,0.35), 0 8px 30px rgba(0,0,0,0.4)";
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            }}
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.15), transparent)" }}
            />
            <span className="relative z-10">View Projects</span>
            <ArrowRight size={16} strokeWidth={2.5} className="relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
          </a>

          <a
            href="#contact"
            onClick={(e) => handleScrollTo(e, "#contact")}
            className="group inline-flex items-center gap-3 rounded-xl font-heading font-bold text-sm transition-all duration-300 active:scale-[0.98]"
            style={{
              background: "rgba(0,204,184,0.06)",
              border: "1px solid rgba(0,204,184,0.3)",
              color: "#00ccb8",
              padding: "1rem 2rem",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "rgba(0,204,184,0.12)";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,204,184,0.6)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 0 30px rgba(0,204,184,0.2)";
              (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "rgba(0,204,184,0.06)";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,204,184,0.3)";
              (e.currentTarget as HTMLElement).style.boxShadow = "none";
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            }}
          >
            <Play size={14} strokeWidth={2.5} className="transition-transform duration-300 group-hover:scale-110" />
            Explore Career
          </a>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <span
          className="text-[10px] font-semibold uppercase tracking-[0.3em]"
          style={{ color: "rgba(117,117,117,0.7)" }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="relative flex items-center justify-center w-8 h-8 rounded-full"
          style={{
            border: "1px solid rgba(0,204,184,0.25)",
            background: "rgba(0,204,184,0.05)",
          }}
        >
          <ChevronDown size={14} strokeWidth={2} style={{ color: "rgba(0,204,184,0.7)" }} />
        </motion.div>
      </motion.div>
    </section>
  );
}
