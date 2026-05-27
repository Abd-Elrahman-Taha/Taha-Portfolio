import { useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef } from 'react';
import { Briefcase, MapPin, Calendar, Building2, ChevronDown, ChevronUp } from 'lucide-react';

interface Project {
  name: string;
  value?: string;
  detail?: string;
}

interface ExperienceEntry {
  id: number;
  title: string;
  company: string;
  location: string;
  period: string;
  description?: string;
  projects: Project[];
  totalValue?: string;
}

const experiences: ExperienceEntry[] = [
  {
    id: 1,
    title: 'Project Manager',
    company: 'Engineers of Construction Contracting & Trading',
    location: 'Saudi Arabia',
    period: 'Jan 2021 — Aug 2025',
    totalValue: 'SAR 126.3M',
    projects: [
      { name: 'Jazan Corniche Boulevard Phase 2', value: 'SAR 44.2M' },
      { name: 'Workers Housing Complex', value: 'SAR 7.2M' },
      { name: 'Al Qasr Hotel Finishing — Jazan', value: 'SAR 50.1M' },
      { name: 'Private Villas and Cafes', value: 'SAR 24.8M' },
    ],
  },
  {
    id: 2,
    title: 'Supervision Department Manager',
    company: 'Soliman Abdullah Al-Kharji Engineering Consultancy',
    location: 'Saudi Arabia',
    period: 'Jan 2011 — Dec 2020',
    description: 'Led multidisciplinary supervision teams across university mega-projects.',
    totalValue: 'SAR 598M+',
    projects: [
      { name: 'Female Medical Colleges Complex', value: 'SAR 123.6M' },
      { name: 'College of Basic Medical Sciences', value: 'SAR 98.9M' },
      { name: 'Clinical Pharmacy College', value: 'SAR 83.1M' },
      { name: 'Family & Community Medicine Building', value: 'SAR 68.2M' },
      { name: 'Student Housing Phase 5', value: 'SAR 53.8M' },
      { name: 'Computer Center — University of Dammam', value: 'SAR 38.8M' },
      { name: 'University Fencing & Gates', value: 'SAR 37.9M' },
      { name: 'University Housing Infrastructure', value: 'SAR 37.0M' },
      { name: 'Research Centers Complex', value: 'SAR 33.7M' },
      { name: 'English Language Center', value: 'SAR 31.2M' },
      { name: 'Main Gate Infrastructure', value: 'SAR 21.9M' },
      { name: 'Animal House Research Facility', value: 'SAR 9.8M' },
    ],
  },
  {
    id: 3,
    title: 'Supervision Department Manager',
    company: 'Ahmed Al-Rashed Al-Humaid Engineering Consultancy',
    location: 'Saudi Arabia',
    period: 'Nov 2008 — Dec 2010',
    totalValue: 'SAR 249M',
    projects: [
      {
        name: 'Refugee Shelter City — Jazan',
        value: 'SAR 249M',
        detail:
          'Client: Ministry of Finance. Included admin buildings, shelters, tent zones, warehouses, sports facilities, gardens, helicopter pad.',
      },
    ],
  },
  {
    id: 4,
    title: 'Supervision Department Manager',
    company: 'Al Madinah Engineering Consultancy Center',
    location: 'Saudi Arabia',
    period: 'Apr 2004 — Oct 2008',
    totalValue: 'SAR 109M',
    projects: [
      { name: 'Jazan Hot Springs Tourism Resort', value: 'SAR 34M' },
      { name: 'Shrimp Processing & Packaging Factories', value: 'SAR 40M' },
      { name: 'HQ Admin Building — Jazan Dev Company', value: 'SAR 35M' },
    ],
  },
  {
    id: 5,
    title: 'Project Manager',
    company: 'Tabarak General Contracting',
    location: 'Egypt',
    period: 'Jan 2000 — Mar 2004',
    projects: [
      { name: 'Al Mansheya School' },
      { name: 'Marco School' },
      { name: 'Soldiers Housing' },
      { name: 'Water Hyacinth Treatment' },
    ],
  },
  {
    id: 6,
    title: 'Project Engineer',
    company: 'Engineering Office for General Contracting',
    location: 'Egypt',
    period: 'Dec 1996 — Dec 1999',
    projects: [
      { name: 'Residential Complexes' },
      { name: 'Admin Buildings' },
      { name: 'Water Tanks' },
      { name: 'Electrical Admin Building' },
    ],
  },
  {
    id: 7,
    title: 'Site Engineer & Quantity Surveyor',
    company: 'Egyptian Armed Forces — Engineering Corps',
    location: 'Egypt',
    period: 'Oct 1995 — Nov 1996',
    projects: [{ name: 'Fayid Military Hospital' }],
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.1,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  }),
};

const lineGrow = {
  hidden: { scaleY: 0 },
  visible: {
    scaleY: 1,
    transition: { duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

function EntryCard({
  entry,
  expanded,
  setExpanded,
  displayedProjects,
  hasMore,
}: {
  entry: ExperienceEntry;
  expanded: boolean;
  setExpanded: (v: boolean) => void;
  displayedProjects: Project[];
  hasMore: boolean;
}) {
  return (
    <div
      className="group relative rounded-2xl overflow-hidden p-6 md:p-7 transition-all duration-400"
      style={{
        background: 'linear-gradient(135deg, rgba(22,25,32,0.9) 0%, rgba(14,16,22,0.95) 100%)',
        border: '1px solid rgba(255,255,255,0.05)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = 'rgba(0,204,184,0.2)';
        el.style.boxShadow = '0 8px 40px rgba(0,0,0,0.5), 0 0 30px rgba(0,204,184,0.06)';
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = 'rgba(255,255,255,0.05)';
        el.style.boxShadow = '0 4px 24px rgba(0,0,0,0.4)';
      }}
    >
      {/* Corner accent */}
      <div
        className="absolute top-0 right-0 w-24 h-24 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: 'radial-gradient(circle at top right, rgba(0,204,184,0.06) 0%, transparent 70%)' }}
      />

      {/* Title row */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2.5">
          <div
            className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: 'rgba(0,204,184,0.1)', border: '1px solid rgba(0,204,184,0.2)' }}
          >
            <Briefcase className="w-4 h-4" strokeWidth={1.5} style={{ color: '#00ccb8' }} />
          </div>
          <h3 className="font-heading font-bold text-base md:text-lg leading-tight text-white">
            {entry.title}
          </h3>
        </div>

        {/* Total value badge */}
        {entry.totalValue && (
          <span
            className="flex-shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold font-mono"
            style={{
              background: 'linear-gradient(135deg, rgba(0,204,184,0.12), rgba(0,204,184,0.06))',
              border: '1px solid rgba(0,204,184,0.2)',
              color: '#00e8d5',
            }}
          >
            
            {entry.totalValue}
          </span>
        )}
      </div>

      {/* Company */}
      <div className="flex items-center gap-2 mb-2 ml-10">
        <Building2 className="w-3.5 h-3.5 flex-shrink-0" strokeWidth={1.5} style={{ color: 'rgba(117,117,117,0.7)' }} />
        <span className="text-sm font-semibold" style={{ color: 'rgba(200,200,200,0.9)' }}>
          {entry.company}
        </span>
      </div>

      {/* Location & dates */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-1 ml-10 mb-4">
        <span className="inline-flex items-center gap-1.5 text-xs font-medium" style={{ color: 'rgba(117,117,117,0.8)' }}>
          <MapPin className="w-3 h-3" strokeWidth={1.5} />
          {entry.location}
        </span>
        <span className="inline-flex items-center gap-1.5 text-xs font-medium" style={{ color: 'rgba(117,117,117,0.8)' }}>
          <Calendar className="w-3 h-3" strokeWidth={1.5} />
          {entry.period}
        </span>
      </div>

      {/* Description */}
      {entry.description && (
        <p className="text-sm font-sans ml-10 mb-4 leading-relaxed" style={{ color: 'rgba(158,158,158,0.8)' }}>
          {entry.description}
        </p>
      )}

      {/* Projects heading */}
      <div className="ml-10">
        <span
          className="text-[10px] font-bold uppercase tracking-[0.2em] mb-3 block"
          style={{ color: 'rgba(0,204,184,0.7)' }}
        >
          Major Projects
        </span>

        <ul className="space-y-2">
          <AnimatePresence initial={false}>
            {displayedProjects.map((project) => (
              <motion.li
                key={project.name}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="flex items-start gap-2.5 text-sm"
              >
                <span
                  className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: '#00ccb8', boxShadow: '0 0 6px rgba(0,204,184,0.5)' }}
                />
                <span>
                  <span style={{ color: 'rgba(200,200,200,0.9)' }}>{project.name}</span>
                  {project.value && (
                    <span
                      className="ml-2 text-xs font-bold font-mono px-2 py-0.5 rounded"
                      style={{
                        background: 'rgba(0,204,184,0.08)',
                        border: '1px solid rgba(0,204,184,0.15)',
                        color: '#00ccb8',
                      }}
                    >
                      {project.value}
                    </span>
                  )}
                  {project.detail && (
                    <span
                      className="block text-xs mt-0.5 leading-relaxed"
                      style={{ color: 'rgba(117,117,117,0.8)' }}
                    >
                      {project.detail}
                    </span>
                  )}
                </span>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>

        {hasMore && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold transition-all duration-300"
            style={{ color: '#00ccb8' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#00e8d5'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#00ccb8'; }}
          >
            {expanded ? (
              <>Show Less <ChevronUp className="w-3.5 h-3.5" /></>
            ) : (
              <>Show {entry.projects.length - 3} More <ChevronDown className="w-3.5 h-3.5" /></>
            )}
          </button>
        )}
      </div>
    </div>
  );
}

function TimelineEntry({ entry, index }: { entry: ExperienceEntry; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  const isLeft = index % 2 === 0;
  const visibleCount = 3;
  const hasMore = entry.projects.length > visibleCount;
  const displayedProjects = expanded ? entry.projects : entry.projects.slice(0, visibleCount);

  return (
    <div ref={ref} className="relative flex w-full items-start mb-10 last:mb-0">

      {/* Desktop: alternating layout */}
      <div className={`hidden md:flex w-[calc(50%-36px)] ${isLeft ? 'justify-end' : ''}`}>
        {isLeft && (
          <motion.div
            custom={index}
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="w-full max-w-lg"
          >
            <EntryCard
              entry={entry}
              expanded={expanded}
              setExpanded={setExpanded}
              displayedProjects={displayedProjects}
              hasMore={hasMore}
            />
          </motion.div>
        )}
      </div>

      {/* Center dot - desktop */}
      <div className="hidden md:flex flex-col items-center w-[72px] relative z-10">
        <motion.div
          custom={index}
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="relative w-10 h-10 flex items-center justify-center"
        >
          {/* Outer rings */}
          <div
            className="absolute w-10 h-10 rounded-full animate-ping opacity-25 pointer-events-none"
            style={{ border: '1px solid rgba(0,204,184,0.5)' }}
          />
          <div
            className="absolute w-7 h-7 rounded-full animate-pulse pointer-events-none"
            style={{ border: '1px solid rgba(0,204,184,0.3)' }}
          />
          {/* Core dot */}
          <div
            className="relative z-10 w-4 h-4 rounded-full"
            style={{
              background: '#090b0e',
              border: '2px solid #00ccb8',
              boxShadow: '0 0 20px rgba(0,204,184,0.7), 0 0 40px rgba(0,204,184,0.3)',
            }}
          >
            <div
              className="absolute inset-0 m-auto rounded-full"
              style={{
                width: '6px',
                height: '6px',
                background: '#00ccb8',
                boxShadow: '0 0 6px rgba(0,204,184,0.9)',
              }}
            />
          </div>

          {/* Year label */}
          <span
            className="absolute left-full ml-2 text-[10px] font-mono font-bold whitespace-nowrap hidden xl:block"
            style={{ color: 'rgba(0,204,184,0.5)', top: '50%', transform: 'translateY(-50%)' }}
          >
            {entry.period.slice(0, 8)}
          </span>
        </motion.div>
      </div>

      {/* Right area - desktop */}
      <div className={`hidden md:flex w-[calc(50%-36px)] ${!isLeft ? 'justify-start' : ''}`}>
        {!isLeft && (
          <motion.div
            custom={index}
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="w-full max-w-lg"
          >
            <EntryCard
              entry={entry}
              expanded={expanded}
              setExpanded={setExpanded}
              displayedProjects={displayedProjects}
              hasMore={hasMore}
            />
          </motion.div>
        )}
      </div>

      {/* Mobile layout */}
      <div className="flex md:hidden items-start w-full">
        <div className="flex flex-col items-center mr-4 relative z-10 pt-1.5">
          <motion.div
            custom={index}
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="relative w-6 h-6 flex items-center justify-center"
          >
            <div
              className="absolute w-6 h-6 rounded-full animate-ping opacity-20 pointer-events-none"
              style={{ border: '1px solid rgba(0,204,184,0.5)' }}
            />
            <div
              className="w-4 h-4 rounded-full z-10"
              style={{
                background: '#090b0e',
                border: '2px solid #00ccb8',
                boxShadow: '0 0 15px rgba(0,204,184,0.6), 0 0 30px rgba(0,204,184,0.2)',
              }}
            >
              <div
                className="absolute rounded-full"
                style={{
                  width: '5px',
                  height: '5px',
                  background: '#00ccb8',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%,-50%)',
                }}
              />
            </div>
          </motion.div>
        </div>

        <motion.div
          custom={index}
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="flex-1 min-w-0"
        >
          <EntryCard
            entry={entry}
            expanded={expanded}
            setExpanded={setExpanded}
            displayedProjects={displayedProjects}
            hasMore={hasMore}
          />
        </motion.div>
      </div>
    </div>
  );
}

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
      style={{ background: '#090b0e' }}
    >
      {/* Top separator */}
      <div className="absolute top-0 left-0 right-0 section-separator" />

      {/* Background */}
      <div className="absolute inset-0 blueprint-grid opacity-50 pointer-events-none" />
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(0,204,184,0.04) 0%, transparent 60%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="section-container relative z-10">

        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={headingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const }}
          className="text-center mb-20 md:mb-24"
        >
          <span className="section-badge mb-6 inline-flex">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
            Career Journey
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
            }}>Professional{' '}</span>
            <span style={{
              background: 'linear-gradient(135deg, #00e8d5, #00ccb8, #00f5e5)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 20px rgba(0,204,184,0.35))',
            }}>Experience</span>
          </h2>
          <p
            className="max-w-2xl mx-auto text-base md:text-lg font-sans font-light leading-relaxed"
            style={{ color: 'rgba(117,117,117,0.85)' }}
          >
            Over three decades of engineering leadership across landmark construction projects.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line — desktop */}
          <motion.div
            variants={lineGrow}
            initial="hidden"
            animate={headingInView ? 'visible' : 'hidden'}
            style={{ transformOrigin: 'top' }}
            className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px"
          >
            <div
              className="w-full h-full"
              style={{
                background: 'linear-gradient(180deg, rgba(0,204,184,0.8) 0%, rgba(0,204,184,0.3) 50%, rgba(0,204,184,0.05) 100%)',
                boxShadow: '0 0 12px rgba(0,204,184,0.3)',
              }}
            />
          </motion.div>

          {/* Vertical line — mobile */}
          <motion.div
            variants={lineGrow}
            initial="hidden"
            animate={headingInView ? 'visible' : 'hidden'}
            style={{ transformOrigin: 'top' }}
            className="block md:hidden absolute left-[11px] top-0 bottom-0 w-px"
          >
            <div
              className="w-full h-full"
              style={{
                background: 'linear-gradient(180deg, rgba(0,204,184,0.7) 0%, rgba(0,204,184,0.2) 100%)',
                boxShadow: '0 0 8px rgba(0,204,184,0.25)',
              }}
            />
          </motion.div>

          {/* Timeline entries */}
          <div className="relative">
            {experiences.map((entry, index) => (
              <TimelineEntry key={entry.id} entry={entry} index={index} />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom separator */}
      <div className="absolute bottom-0 left-0 right-0 section-separator" />
    </section>
  );
}
