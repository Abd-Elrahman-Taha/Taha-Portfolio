import { useState, useMemo } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Landmark, Hotel, HardHat, Home, MapPin, ChevronDown } from "lucide-react";

type Category = "Educational" | "Government" | "Hospitality" | "Infrastructure" | "Residential";

interface Project {
  id: number;
  name: string;
  value: number;
  category: Category;
  location: string;
}

const projects: Project[] = [
  { id: 1, name: "Female Medical Colleges Complex", value: 123_560_100, category: "Educational", location: "Dammam, Saudi Arabia" },
  { id: 2, name: "Refugee Shelter City", value: 249_000_000, category: "Government", location: "Jazan, Saudi Arabia" },
  { id: 3, name: "College of Basic Medical Sciences", value: 98_945_373, category: "Educational", location: "Dammam, Saudi Arabia" },
  { id: 4, name: "Clinical Pharmacy College", value: 83_057_521, category: "Educational", location: "Dammam, Saudi Arabia" },
  { id: 5, name: "Family & Community Medicine Building", value: 68_212_217, category: "Educational", location: "Dammam, Saudi Arabia" },
  { id: 6, name: "Student Housing Phase 5", value: 53_761_587, category: "Residential", location: "Dammam, Saudi Arabia" },
  { id: 7, name: "Al Qasr Hotel Finishing", value: 50_141_061, category: "Hospitality", location: "Jazan, Saudi Arabia" },
  { id: 8, name: "Jazan Corniche Boulevard Phase 2", value: 44_247_465, category: "Infrastructure", location: "Jazan, Saudi Arabia" },
  { id: 9, name: "Shrimp Processing Factories", value: 40_000_000, category: "Infrastructure", location: "Saudi Arabia" },
  { id: 10, name: "Computer Center — University of Dammam", value: 38_757_592, category: "Educational", location: "Dammam, Saudi Arabia" },
  { id: 11, name: "University Fencing & Gates", value: 37_861_533, category: "Infrastructure", location: "Dammam, Saudi Arabia" },
  { id: 12, name: "University Housing Infrastructure", value: 36_995_597, category: "Infrastructure", location: "Dammam, Saudi Arabia" },
  { id: 13, name: "HQ Admin Building — Jazan Dev Co.", value: 35_000_000, category: "Government", location: "Jazan, Saudi Arabia" },
  { id: 14, name: "Jazan Hot Springs Tourism Resort", value: 34_000_000, category: "Hospitality", location: "Jazan, Saudi Arabia" },
  { id: 15, name: "Research Centers Complex", value: 33_661_997, category: "Educational", location: "Dammam, Saudi Arabia" },
];

const filterTabs: Array<"All" | Category> = ["All", "Educational", "Government", "Hospitality", "Infrastructure", "Residential"];

const formatValue = (v: number): string => {
  if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(1)}M`;
  return v.toLocaleString("en-US");
};

const categoryIcon: Record<Category, React.ElementType> = {
  Educational: GraduationCap,
  Government: Landmark,
  Hospitality: Hotel,
  Infrastructure: HardHat,
  Residential: Home,
};

const categoryTheme: Record<Category, { gradient: string; iconColor: string; badgeBg: string; borderColor: string; glowColor: string; drawingColor: string }> = {
  Educational: {
    gradient: "linear-gradient(135deg, rgba(0,204,184,0.18) 0%, rgba(0,204,184,0.04) 100%)",
    iconColor: "#00ccb8",
    badgeBg: "rgba(0,204,184,0.15)",
    borderColor: "rgba(0,204,184,0.25)",
    glowColor: "rgba(0,204,184,0.3)",
    drawingColor: "rgba(0,204,184,0.2)",
  },
  Government: {
    gradient: "linear-gradient(135deg, rgba(99,102,241,0.18) 0%, rgba(99,102,241,0.04) 100%)",
    iconColor: "#818cf8",
    badgeBg: "rgba(99,102,241,0.15)",
    borderColor: "rgba(99,102,241,0.25)",
    glowColor: "rgba(99,102,241,0.3)",
    drawingColor: "rgba(99,102,241,0.2)",
  },
  Hospitality: {
    gradient: "linear-gradient(135deg, rgba(245,158,11,0.18) 0%, rgba(245,158,11,0.04) 100%)",
    iconColor: "#fbbf24",
    badgeBg: "rgba(245,158,11,0.15)",
    borderColor: "rgba(245,158,11,0.25)",
    glowColor: "rgba(245,158,11,0.3)",
    drawingColor: "rgba(245,158,11,0.2)",
  },
  Infrastructure: {
    gradient: "linear-gradient(135deg, rgba(34,197,94,0.18) 0%, rgba(34,197,94,0.04) 100%)",
    iconColor: "#4ade80",
    badgeBg: "rgba(34,197,94,0.15)",
    borderColor: "rgba(34,197,94,0.25)",
    glowColor: "rgba(34,197,94,0.3)",
    drawingColor: "rgba(34,197,94,0.2)",
  },
  Residential: {
    gradient: "linear-gradient(135deg, rgba(168,85,247,0.18) 0%, rgba(168,85,247,0.04) 100%)",
    iconColor: "#c084fc",
    badgeBg: "rgba(168,85,247,0.15)",
    borderColor: "rgba(168,85,247,0.25)",
    glowColor: "rgba(168,85,247,0.3)",
    drawingColor: "rgba(168,85,247,0.2)",
  },
};

function ArchitecturalDrawing({ category }: { category: Category }) {
  const color = categoryTheme[category].drawingColor;
  switch (category) {
    case "Educational":
      return (
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 300 160" fill="none">
          <line x1="10" y1="140" x2="290" y2="140" stroke={color} strokeWidth="0.6" />
          <rect x="50" y="50" width="80" height="90" stroke={color} strokeWidth="0.6" />
          <rect x="130" y="80" width="120" height="60" stroke={color} strokeWidth="0.6" />
          <polygon points="50,50 90,20 130,50" stroke={color} strokeWidth="0.6" fill="none" />
          <text x="265" y="47" fill={color} fontSize="6" fontFamily="monospace">EL +15.00</text>
          <text x="265" y="77" fill={color} fontSize="6" fontFamily="monospace">EL +9.00</text>
          <text x="150" y="155" fill={color} fontSize="6" fontFamily="monospace" textAnchor="middle">24.00 m</text>
        </svg>
      );
    case "Government":
      return (
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 300 160" fill="none">
          <circle cx="150" cy="80" r="55" stroke={color} strokeWidth="0.6" strokeDasharray="3 3" />
          <circle cx="150" cy="80" r="35" stroke={color} strokeWidth="0.6" />
          <line x1="150" y1="15" x2="150" y2="145" stroke={color} strokeWidth="0.5" />
          <line x1="85" y1="80" x2="215" y2="80" stroke={color} strokeWidth="0.5" />
          <rect x="120" y="55" width="60" height="50" stroke={color} strokeWidth="0.5" strokeDasharray="2 2" />
          <text x="155" y="32" fill={color} fontSize="6" fontFamily="monospace">R = 35.00</text>
        </svg>
      );
    case "Hospitality":
      return (
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 300 160" fill="none">
          <path d="M 30,120 Q 150,20 270,120" stroke={color} strokeWidth="0.8" />
          <path d="M 30,135 Q 150,35 270,135" stroke={color} strokeWidth="0.5" strokeDasharray="2 2" />
          <text x="150" y="58" fill={color} fontSize="6" fontFamily="monospace" textAnchor="middle">R_CURVE = 120.00</text>
        </svg>
      );
    case "Infrastructure":
      return (
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 300 160" fill="none">
          <line x1="20" y1="110" x2="280" y2="110" stroke={color} strokeWidth="1" />
          <line x1="20" y1="100" x2="280" y2="100" stroke={color} strokeWidth="0.5" />
          <rect x="60" y="110" width="16" height="35" stroke={color} strokeWidth="0.5" />
          <rect x="142" y="110" width="16" height="35" stroke={color} strokeWidth="0.5" />
          <rect x="224" y="110" width="16" height="35" stroke={color} strokeWidth="0.5" />
          <text x="150" y="92" fill={color} fontSize="6" fontFamily="monospace" textAnchor="middle">BRIDGE PROFILE SECT C-C</text>
        </svg>
      );
    case "Residential":
      return (
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 300 160" fill="none">
          <rect x="40" y="30" width="220" height="100" stroke={color} strokeWidth="0.6" />
          <line x1="110" y1="30" x2="110" y2="130" stroke={color} strokeWidth="0.5" />
          <line x1="180" y1="30" x2="180" y2="130" stroke={color} strokeWidth="0.5" />
          <line x1="45" y1="40" x2="255" y2="40" stroke={color} strokeWidth="0.3" strokeDasharray="5 2" />
          <text x="150" y="24" fill={color} fontSize="6" fontFamily="monospace" textAnchor="middle">FOUNDATION ANCHOR PLAN</text>
        </svg>
      );
    default:
      return null;
  }
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const Icon = categoryIcon[project.category];
  const theme = categoryTheme[project.category];

  return (
    <motion.article
      layout
      custom={index}
      initial={{ opacity: 0, y: 40, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.94 }}
      transition={{ delay: index * 0.06, duration: 0.5, ease: "easeOut" }}
      className="group relative rounded-2xl overflow-hidden cursor-default"
      style={{
        background: 'linear-gradient(180deg, rgba(22,25,32,0.95) 0%, rgba(14,16,22,0.98) 100%)',
        border: '1px solid rgba(255,255,255,0.05)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
        transition: 'all 0.4s ease',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = theme.borderColor;
        el.style.boxShadow = `0 20px 60px rgba(0,0,0,0.6), 0 0 40px ${theme.glowColor}15, inset 0 1px 0 rgba(255,255,255,0.06)`;
        el.style.transform = 'translateY(-6px)';
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = 'rgba(255,255,255,0.05)';
        el.style.boxShadow = '0 4px 24px rgba(0,0,0,0.4)';
        el.style.transform = 'translateY(0)';
      }}
    >
      {/* Header area */}
      <div
        className="relative h-44 flex items-center justify-center overflow-hidden"
        style={{ background: theme.gradient }}
      >
        {/* Architectural drawing */}
        <ArchitecturalDrawing category={project.category} />

        {/* Dense grid overlay */}
        <div className="absolute inset-0 bg-grid-fine opacity-60" />

        {/* Fade to card body */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, transparent 40%, rgba(14,16,22,0.9) 100%)' }}
        />

        {/* Category icon */}
        <div
          className="relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-400"
          style={{
            background: 'rgba(9,11,14,0.7)',
            backdropFilter: 'blur(12px)',
            border: `1px solid ${theme.borderColor}`,
            boxShadow: `0 4px 20px rgba(0,0,0,0.5)`,
          }}
        >
          <Icon className="w-7 h-7" strokeWidth={1.5} style={{ color: theme.iconColor }} />
        </div>

        {/* Category badge */}
        <span
          className="absolute top-3.5 right-3.5 z-10 px-2.5 py-1 rounded-lg text-xs font-bold"
          style={{
            background: theme.badgeBg,
            border: `1px solid ${theme.borderColor}`,
            color: theme.iconColor,
            backdropFilter: 'blur(8px)',
          }}
        >
          {project.category}
        </span>
      </div>

      {/* Card body */}
      <div className="p-5 md:p-6">
        <h3
          className="font-heading font-bold text-base md:text-lg leading-snug mb-3 line-clamp-2"
          style={{ color: 'rgba(240,240,240,0.95)' }}
        >
          {project.name}
        </h3>

        {/* Value badge */}
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg mb-3"
          style={{
            background: 'linear-gradient(135deg, rgba(0,204,184,0.12), rgba(0,204,184,0.05))',
            border: '1px solid rgba(0,204,184,0.2)',
          }}
        >
          <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'rgba(0,204,184,0.7)' }}>SAR</span>
          <span className="font-heading font-black text-lg leading-none" style={{ color: '#00e8d5' }}>
            {formatValue(project.value)}
          </span>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2" style={{ color: 'rgba(117,117,117,0.8)' }}>
          <MapPin className="w-3.5 h-3.5 flex-shrink-0" strokeWidth={1.5} />
          <span className="text-xs font-medium">{project.location}</span>
        </div>
      </div>

      {/* Hover glow bottom line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-400"
        style={{ background: `linear-gradient(90deg, transparent, ${theme.glowColor}, transparent)` }}
      />
    </motion.article>
  );
}

function FilterBar({ active, onChange }: { active: string; onChange: (tab: string) => void }) {
  return (
    <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-14">
      {filterTabs.map((tab) => {
        const isActive = active === tab;
        return (
          <button
            key={tab}
            onClick={() => onChange(tab)}
            className="relative px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 cursor-pointer"
            style={{
              background: isActive
                ? 'linear-gradient(135deg, #00ccb8, #00e8d5)'
                : 'rgba(22,25,32,0.8)',
              color: isActive ? '#090b0e' : 'rgba(158,158,158,0.8)',
              border: `1px solid ${isActive ? 'transparent' : 'rgba(255,255,255,0.06)'}`,
              boxShadow: isActive ? '0 0 30px rgba(0,204,184,0.4)' : 'none',
            }}
            onMouseEnter={(e) => {
              if (!isActive) {
                (e.currentTarget as HTMLElement).style.color = 'rgba(220,220,220,0.9)';
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,204,184,0.15)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                (e.currentTarget as HTMLElement).style.color = 'rgba(158,158,158,0.8)';
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.06)';
              }
            }}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
}

function Projects() {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [showAll, setShowAll] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const filtered = useMemo(
    () => activeFilter === "All" ? projects : projects.filter((p) => p.category === activeFilter),
    [activeFilter]
  );

  const visible = showAll ? filtered : filtered.slice(0, 6);
  const hasMore = filtered.length > 6 && !showAll;

  const handleFilterChange = (tab: string) => {
    setActiveFilter(tab);
    setShowAll(false);
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #090b0e 0%, #0c0e14 100%)' }}
    >
      {/* Top separator */}
      <div className="absolute top-0 left-0 right-0 section-separator" />

      {/* Background */}
      <div className="absolute inset-0 blueprint-grid opacity-40 pointer-events-none" />
      <div
        className="absolute top-1/3 left-0 w-[600px] h-[600px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(0,204,184,0.04) 0%, transparent 60%)',
          filter: 'blur(80px)',
        }}
      />
      <div
        className="absolute bottom-1/4 right-0 w-[500px] h-[500px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(6,182,212,0.03) 0%, transparent 60%)',
          filter: 'blur(80px)',
        }}
      />

      <div className="section-container relative z-10">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-14"
        >
          <span className="section-badge mb-6 inline-flex">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
            Portfolio
          </span>
          <h2
            className="font-heading font-black mb-5 leading-[0.95] tracking-[-0.03em]"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
          >
            <span style={{
              background: 'linear-gradient(135deg, #ffffff 0%, rgba(200,200,200,0.85) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Mega{' '}</span>
            <span style={{
              background: 'linear-gradient(135deg, #00e8d5, #00ccb8, #00f5e5)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 20px rgba(0,204,184,0.35))',
            }}>Projects</span>
          </h2>
          <p
            className="max-w-2xl mx-auto text-base md:text-lg font-sans font-light"
            style={{ color: 'rgba(117,117,117,0.85)' }}
          >
            Landmark projects spanning educational, governmental, hospitality, and infrastructure sectors
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <FilterBar active={activeFilter} onChange={handleFilterChange} />
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          <AnimatePresence mode="popLayout">
            {visible.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </AnimatePresence>
        </div>

        {/* Load More */}
        <AnimatePresence>
          {hasMore && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="flex justify-center mt-12"
            >
              <button
                onClick={() => setShowAll(true)}
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl text-sm font-bold transition-all duration-400"
                style={{
                  background: 'rgba(22,25,32,0.8)',
                  border: '1px solid rgba(0,204,184,0.15)',
                  color: 'rgba(158,158,158,0.9)',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.color = '#00ccb8';
                  el.style.borderColor = 'rgba(0,204,184,0.4)';
                  el.style.boxShadow = '0 0 30px rgba(0,204,184,0.12)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.color = 'rgba(158,158,158,0.9)';
                  el.style.borderColor = 'rgba(0,204,184,0.15)';
                  el.style.boxShadow = 'none';
                }}
              >
                Load More Projects
                <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5" strokeWidth={2} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom separator */}
      <div className="absolute bottom-0 left-0 right-0 section-separator" />
    </section>
  );
}

export default Projects;
