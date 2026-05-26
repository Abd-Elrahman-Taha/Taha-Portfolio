import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Flag, MapPin, GraduationCap, Award, CheckCircle2 } from 'lucide-react';

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardReveal = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const tagReveal = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

interface InfoCard {
  icon: React.ElementType;
  label: string;
  value: string;
  accent: string;
}

const infoCards: InfoCard[] = [
  { icon: Flag, label: 'Nationality', value: 'Egyptian', accent: '#00ccb8' },
  { icon: MapPin, label: 'Location', value: 'Egypt / Saudi Arabia', accent: '#22d3ee' },
  { icon: GraduationCap, label: 'Education', value: 'B.Sc. Civil Engineering', accent: '#00e8d5' },
  { icon: Award, label: 'Experience', value: '30+ Years', accent: '#00ccb8' },
];

const expertiseAreas: string[] = [
  'Construction Supervision',
  'Project Management',
  'Infrastructure',
  'Educational Facilities',
  'Hospitality',
  'Residential Compounds',
  'Government Mega Projects',
  'Structural Design',
  'Quantity Surveying',
];

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  const cardsRef = useRef<HTMLDivElement>(null);
  const cardsInView = useInView(cardsRef, { once: true, margin: '-60px' });

  const tagsRef = useRef<HTMLDivElement>(null);
  const tagsInView = useInView(tagsRef, { once: true, margin: '-40px' });

  return (
    <section id="about" className="section-padding relative overflow-hidden" style={{ background: '#090b0e' }}>
      {/* Section divider top */}
      <div className="absolute top-0 left-0 right-0 section-separator" />

      {/* Ambient background */}
      <div className="absolute inset-0 blueprint-grid opacity-60 pointer-events-none" />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(0,204,184,0.04) 0%, transparent 65%)',
          filter: 'blur(40px)',
        }}
      />

      <div className="section-container relative z-10" ref={sectionRef}>

        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
          className="mb-20 text-center"
        >
          <span className="section-badge mb-6 inline-flex">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
            Who I Am
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
            }}>
              About
            </span>{' '}
            <span style={{
              background: 'linear-gradient(135deg, #00e8d5, #00ccb8, #00f5e5)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 20px rgba(0,204,184,0.35))',
            }}>
              Me
            </span>
          </h2>
          <div
            className="w-24 h-px mx-auto"
            style={{
              background: 'linear-gradient(90deg, transparent, #00ccb8, transparent)',
              boxShadow: '0 0 12px rgba(0,204,184,0.5)',
            }}
          />
        </motion.div>

        {/* Biography Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] as const }}
          className="mb-10 relative"
        >
          <div
            className="relative p-8 md:p-10 lg:p-12 rounded-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(22,25,32,0.9) 0%, rgba(14,16,22,0.95) 100%)',
              border: '1px solid rgba(0,204,184,0.12)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)',
            }}
          >
            {/* Corner accent */}
            <div
              className="absolute top-0 right-0 w-32 h-32 pointer-events-none"
              style={{
                background: 'radial-gradient(circle at top right, rgba(0,204,184,0.08) 0%, transparent 70%)',
              }}
            />
            <div
              className="absolute bottom-0 left-0 w-24 h-24 pointer-events-none"
              style={{
                background: 'radial-gradient(circle at bottom left, rgba(6,182,212,0.05) 0%, transparent 70%)',
              }}
            />

            <div className="relative">
              {/* Quote mark */}
              <span
                className="text-7xl font-black leading-none block mb-4 font-heading"
                style={{ color: 'rgba(0,204,184,0.15)', lineHeight: 1 }}
              >
                "
              </span>
              <p
                className="text-base md:text-lg leading-[1.85] mb-5 font-sans font-light"
                style={{ color: 'rgba(200,200,200,0.85)' }}
              >
                Senior Civil Engineer and Project Management Professional with more than{' '}
                <span style={{ color: '#00ccb8', fontWeight: 600 }}>30 years</span> of extensive
                experience in construction supervision, project execution, infrastructure development,
                educational facilities, hospitality projects, residential compounds, and governmental
                mega projects across{' '}
                <span style={{ color: '#00ccb8', fontWeight: 600 }}>Saudi Arabia and Egypt</span>.
              </p>
              <p
                className="text-base md:text-lg leading-[1.85] font-sans font-light"
                style={{ color: 'rgba(158,158,158,0.8)' }}
              >
                Proven expertise in leading multidisciplinary engineering teams, managing large-scale
                construction projects exceeding{' '}
                <span style={{ color: '#00e8d5', fontWeight: 600 }}>hundreds of millions SAR</span>,
                supervising project execution according to international engineering standards, and
                delivering projects with high efficiency, quality, and compliance.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Info Cards Grid */}
        <motion.div
          ref={cardsRef}
          variants={staggerContainer}
          initial="hidden"
          animate={cardsInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 mb-14"
        >
          {infoCards.map((card) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.label}
                variants={cardReveal}
                className="group relative flex items-center gap-5 p-6 rounded-xl overflow-hidden cursor-default"
                style={{
                  background: 'linear-gradient(135deg, rgba(22,25,32,0.85) 0%, rgba(14,16,22,0.9) 100%)',
                  border: '1px solid rgba(255,255,255,0.05)',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
                  transition: 'all 0.4s ease',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,204,184,0.25)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 40px rgba(0,0,0,0.5), 0 0 30px rgba(0,204,184,0.08)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.05)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 24px rgba(0,0,0,0.4)';
                }}
              >
                {/* Icon */}
                <div
                  className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-400"
                  style={{
                    background: `linear-gradient(135deg, rgba(0,204,184,0.12), rgba(0,204,184,0.05))`,
                    border: `1px solid rgba(0,204,184,0.2)`,
                  }}
                >
                  <Icon className="w-5 h-5" strokeWidth={1.5} style={{ color: card.accent }} />
                </div>

                {/* Text */}
                <div>
                  <p
                    className="text-xs font-semibold uppercase tracking-[0.15em] mb-1.5"
                    style={{ color: 'rgba(117,117,117,0.8)' }}
                  >
                    {card.label}
                  </p>
                  <p className="font-heading font-bold text-base text-white">
                    {card.value}
                  </p>
                </div>

                {/* Hover glow corner */}
                <div
                  className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(circle at top right, rgba(0,204,184,0.06) 0%, transparent 70%)` }}
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Areas of Expertise */}
        <motion.div
          ref={tagsRef}
          initial={{ opacity: 0, y: 20 }}
          animate={tagsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
        >
          <div className="text-center mb-8">
            <h3
              className="font-heading font-bold text-lg md:text-xl mb-3"
              style={{ color: 'rgba(200,200,200,0.9)' }}
            >
              Areas of Expertise
            </h3>
            <div className="w-16 h-px mx-auto" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,204,184,0.5), transparent)' }} />
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={tagsInView ? 'visible' : 'hidden'}
            className="flex flex-wrap justify-center gap-3"
          >
            {expertiseAreas.map((area) => (
              <motion.div
                key={area}
                variants={tagReveal}
                className="group flex items-center gap-2 px-4 py-2.5 rounded-full cursor-default transition-all duration-300"
                style={{
                  background: 'rgba(0,204,184,0.06)',
                  border: '1px solid rgba(0,204,184,0.15)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(0,204,184,0.12)';
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,204,184,0.35)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 0 20px rgba(0,204,184,0.1)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(0,204,184,0.06)';
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,204,184,0.15)';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                }}
              >
                <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#00ccb8' }} strokeWidth={2} />
                <span
                  className="text-sm font-semibold"
                  style={{ color: 'rgba(180,180,180,0.9)' }}
                >
                  {area}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom section divider */}
      <div className="absolute bottom-0 left-0 right-0 section-separator" />
    </section>
  );
};

export default About;
