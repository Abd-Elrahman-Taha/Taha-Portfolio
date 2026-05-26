import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  ClipboardCheck,
  Calculator,
  Ruler,
  CalendarDays,
  FileSearch,
  PenTool,
  CheckCircle,
  Sparkles,
} from 'lucide-react';

interface Skill {
  name: string;
  percentage: number;
  level: string;
}

interface Competency {
  title: string;
  description: string;
  icon: React.ElementType;
}

const circularSkills: Skill[] = [
  { name: 'AutoCAD', percentage: 95, level: 'Expert' },
  { name: 'Microsoft Project', percentage: 92, level: 'Expert' },
  { name: 'SAP2000', percentage: 90, level: 'Advanced' },
];

const barSkills: Skill[] = [
  { name: 'CSI Column', percentage: 88, level: 'Advanced' },
  { name: 'Microsoft Excel', percentage: 90, level: 'Expert' },
  { name: 'Microsoft Word', percentage: 85, level: 'Advanced' },
];

const competencies: Competency[] = [
  {
    title: 'Project Management',
    description: 'End-to-end oversight of large-scale construction projects',
    icon: ClipboardCheck,
  },
  {
    title: 'Quantity Surveying',
    description: 'Precise cost estimation and material quantification',
    icon: Calculator,
  },
  {
    title: 'Structural Design Review',
    description: 'Thorough analysis and validation of structural integrity',
    icon: Ruler,
  },
  {
    title: 'Construction Planning',
    description: 'Strategic scheduling and resource allocation',
    icon: CalendarDays,
  },
  {
    title: 'Tender Analysis',
    description: 'Comprehensive bid evaluation and contract assessment',
    icon: FileSearch,
  },
  {
    title: 'Workshop Drawings',
    description: 'Detailed fabrication and assembly documentation',
    icon: PenTool,
  },
];

const certifications = ['PMP Training', 'American Building Codes', 'Egyptian Building Codes'];

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.08,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

// ── Circular Skill ───────────────────────────────────────────────────────────

function CircularProgress({ skill, index }: { skill: Skill; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (skill.percentage / 100) * circumference;

  return (
    <motion.div
      ref={ref}
      custom={index}
      variants={fadeInUp}
      className="group flex flex-col items-center text-center gap-3 p-5 rounded-2xl cursor-default transition-all duration-400"
      style={{
        background: 'linear-gradient(135deg, rgba(22,25,32,0.9) 0%, rgba(14,16,22,0.95) 100%)',
        border: '1px solid rgba(255,255,255,0.05)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = 'rgba(0,204,184,0.25)';
        el.style.boxShadow = '0 8px 40px rgba(0,0,0,0.5), 0 0 30px rgba(0,204,184,0.08)';
        el.style.transform = 'translateY(-4px)';
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = 'rgba(255,255,255,0.05)';
        el.style.boxShadow = '0 4px 20px rgba(0,0,0,0.4)';
        el.style.transform = 'translateY(0)';
      }}
    >
      <div className="relative w-24 h-24">
        <svg className="w-full h-full transform -rotate-90">
          {/* Track */}
          <circle
            cx="48"
            cy="48"
            r={radius}
            fill="transparent"
            strokeWidth="5"
            style={{ stroke: 'rgba(28,31,36,0.9)' }}
          />
          {/* Progress */}
          <motion.circle
            cx="48"
            cy="48"
            r={radius}
            fill="transparent"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={isInView ? { strokeDashoffset } : { strokeDashoffset: circumference }}
            transition={{ duration: 1.4, ease: 'easeOut', delay: index * 0.1 }}
            style={{
              stroke: 'url(#tealGrad)',
              filter: 'drop-shadow(0 0 6px rgba(0,204,184,0.5))',
            }}
          />
          <defs>
            <linearGradient id="tealGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00ccb8" />
              <stop offset="100%" stopColor="#00f5e5" />
            </linearGradient>
          </defs>
        </svg>

        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="font-heading font-black text-xl leading-none"
            style={{
              background: 'linear-gradient(135deg, #00e8d5, #00ccb8)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {skill.percentage}%
          </span>
          <span className="text-[8px] font-bold uppercase tracking-wider mt-0.5" style={{ color: 'rgba(117,117,117,0.8)' }}>
            {skill.level}
          </span>
        </div>
      </div>

      <h4 className="font-heading font-bold text-sm text-white leading-tight">{skill.name}</h4>
    </motion.div>
  );
}

// ── Progress Bar ─────────────────────────────────────────────────────────────

function ProgressBar({ skill, index }: { skill: Skill; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      custom={index}
      variants={fadeInUp}
      className="space-y-2.5"
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold" style={{ color: 'rgba(200,200,200,0.9)' }}>
          {skill.name}
        </span>
        <div className="flex items-center gap-2">
          <span
            className="text-[10px] font-bold uppercase tracking-[0.12em] px-2 py-0.5 rounded"
            style={{
              background: 'rgba(0,204,184,0.08)',
              border: '1px solid rgba(0,204,184,0.15)',
              color: 'rgba(0,204,184,0.7)',
            }}
          >
            {skill.level}
          </span>
          <span
            className="font-heading font-black text-base"
            style={{ color: '#00ccb8' }}
          >
            {skill.percentage}%
          </span>
        </div>
      </div>

      {/* Track */}
      <div
        className="h-2 w-full rounded-full relative overflow-hidden"
        style={{
          background: 'rgba(22,25,32,0.9)',
          boxShadow: 'inset 0 1px 4px rgba(0,0,0,0.6)',
          border: '1px solid rgba(255,255,255,0.03)',
        }}
      >
        {/* Animated fill */}
        <motion.div
          className="h-full rounded-full relative"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.percentage}%` } : { width: 0 }}
          transition={{ type: 'spring', stiffness: 60, damping: 18, delay: index * 0.12 }}
          style={{
            background: 'linear-gradient(90deg, #00ccb8, #00f5e5)',
            boxShadow: '0 0 12px rgba(0,204,184,0.5)',
          }}
        >
          {/* Shimmer */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.25) 50%, transparent 100%)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 2s linear infinite',
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

// ── Competency Card ──────────────────────────────────────────────────────────

function CompetencyCard({ competency, index }: { competency: Competency; index: number }) {
  const Icon = competency.icon;

  return (
    <motion.div
      custom={index}
      variants={fadeInUp}
      className="group flex flex-col items-center text-center gap-3 p-5 rounded-2xl cursor-default transition-all duration-400"
      style={{
        background: 'linear-gradient(135deg, rgba(22,25,32,0.9) 0%, rgba(14,16,22,0.95) 100%)',
        border: '1px solid rgba(255,255,255,0.05)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = 'rgba(0,204,184,0.2)';
        el.style.boxShadow = '0 8px 40px rgba(0,0,0,0.5), 0 0 30px rgba(0,204,184,0.08)';
        el.style.transform = 'translateY(-4px)';
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = 'rgba(255,255,255,0.05)';
        el.style.boxShadow = '0 4px 20px rgba(0,0,0,0.4)';
        el.style.transform = 'translateY(0)';
      }}
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-400"
        style={{
          background: 'linear-gradient(135deg, rgba(0,204,184,0.12), rgba(0,204,184,0.04))',
          border: '1px solid rgba(0,204,184,0.2)',
        }}
      >
        <Icon className="w-5 h-5" strokeWidth={1.5} style={{ color: '#00ccb8' }} />
      </div>

      <div>
        <h4 className="font-heading font-bold text-sm text-white mb-1">{competency.title}</h4>
        <p className="text-xs font-sans leading-relaxed" style={{ color: 'rgba(117,117,117,0.8)' }}>
          {competency.description}
        </p>
      </div>
    </motion.div>
  );
}

// ── Main Component ───────────────────────────────────────────────────────────

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
      style={{ background: '#090b0e' }}
    >
      {/* Top separator */}
      <div className="absolute top-0 left-0 right-0 section-separator" />

      {/* Background */}
      <div className="absolute inset-0 blueprint-grid opacity-40 pointer-events-none" />
      <div
        className="absolute bottom-0 left-1/4 w-[700px] h-[500px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(0,204,184,0.04) 0%, transparent 65%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="section-container relative z-10">

        {/* Section Heading */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeInUp}
          className="text-center mb-20 md:mb-24"
        >
          <span className="section-badge mb-6 inline-flex">
            <Sparkles className="w-3 h-3" />
            What I Master
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
            }}>Technical{' '}</span>
            <span style={{
              background: 'linear-gradient(135deg, #00e8d5, #00ccb8, #00f5e5)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 20px rgba(0,204,184,0.35))',
            }}>Expertise</span>
          </h2>
          <div className="w-24 h-px mx-auto" style={{ background: 'linear-gradient(90deg, transparent, #00ccb8, transparent)', boxShadow: '0 0 12px rgba(0,204,184,0.4)' }} />
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-16 md:mb-20">

          {/* Left — Software & Tools */}
          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={stagger}
          >
            <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-8">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: 'rgba(0,204,184,0.1)', border: '1px solid rgba(0,204,184,0.2)' }}
              >
                <PenTool className="w-4 h-4" style={{ color: '#00ccb8' }} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-heading font-bold text-white">Software & Tools</h3>
            </motion.div>

            {/* Circular dials */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {circularSkills.map((skill, i) => (
                <CircularProgress key={skill.name} skill={skill} index={i} />
              ))}
            </div>

            {/* Progress bars */}
            <div className="space-y-6">
              {barSkills.map((skill, i) => (
                <ProgressBar key={skill.name} skill={skill} index={i} />
              ))}
            </div>
          </motion.div>

          {/* Right — Core Competencies */}
          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={stagger}
          >
            <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-8">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: 'rgba(0,204,184,0.1)', border: '1px solid rgba(0,204,184,0.2)' }}
              >
                <ClipboardCheck className="w-4 h-4" style={{ color: '#00ccb8' }} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-heading font-bold text-white">Core Competencies</h3>
            </motion.div>

            <div className="grid grid-cols-2 gap-4">
              {competencies.map((competency, i) => (
                <CompetencyCard key={competency.title} competency={competency} index={i} />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Certifications */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={stagger}
        >
          <motion.div variants={fadeInUp} className="text-center mb-8">
            <h3 className="font-heading font-bold text-lg text-white">Certifications & Training</h3>
          </motion.div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            {certifications.map((cert, i) => (
              <motion.div
                key={cert}
                custom={i}
                variants={fadeInUp}
                className="flex items-center gap-2.5 px-5 py-3 rounded-xl cursor-default transition-all duration-400"
                style={{
                  background: 'linear-gradient(135deg, rgba(22,25,32,0.9), rgba(14,16,22,0.95))',
                  border: '1px solid rgba(0,204,184,0.12)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = 'rgba(0,204,184,0.3)';
                  el.style.boxShadow = '0 8px 30px rgba(0,0,0,0.4), 0 0 20px rgba(0,204,184,0.1)';
                  el.style.transform = 'translateY(-3px)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = 'rgba(0,204,184,0.12)';
                  el.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
                  el.style.transform = 'translateY(0)';
                }}
              >
                <CheckCircle className="w-4 h-4 flex-shrink-0" strokeWidth={1.5} style={{ color: '#00ccb8' }} />
                <span className="text-sm font-bold whitespace-nowrap" style={{ color: 'rgba(200,200,200,0.9)' }}>
                  {cert}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom separator */}
      <div className="absolute bottom-0 left-0 right-0 section-separator" />
    </section>
  );
}
