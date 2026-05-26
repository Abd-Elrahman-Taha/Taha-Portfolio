import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { Clock, Building2, TrendingUp, Users } from 'lucide-react';

function useCountUp(target: number, shouldStart: boolean, duration: number = 2400): number {
  const [count, setCount] = useState(0);
  const hasStarted = useRef(false);

  const animate = useCallback(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;
    const startTime = performance.now();
    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration]);

  useEffect(() => {
    if (shouldStart) animate();
  }, [shouldStart, animate]);

  return count;
}

interface StatItem {
  icon: React.ElementType;
  value: number;
  suffix: string;
  label: string;
  description: string;
  color: string;
}

const stats: StatItem[] = [
  {
    icon: Clock,
    value: 30,
    suffix: '+',
    label: 'Years of Experience',
    description: 'Continuous engineering excellence',
    color: '#00ccb8',
  },
  {
    icon: Building2,
    value: 100,
    suffix: '+',
    label: 'Projects Completed',
    description: 'Across Saudi Arabia & Egypt',
    color: '#00e8d5',
  },
  {
    icon: TrendingUp,
    value: 1,
    suffix: 'B+',
    label: 'SAR Projects Managed',
    description: 'Total portfolio value',
    color: '#22d3ee',
  },
  {
    icon: Users,
    value: 50,
    suffix: '+',
    label: 'Engineering Teams Led',
    description: 'Multidisciplinary leadership',
    color: '#00ccb8',
  },
];

const cardVariant = {
  hidden: { opacity: 0, y: 50, scale: 0.92 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      delay: i * 0.1,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

interface StatCardProps {
  stat: StatItem;
  index: number;
  isVisible: boolean;
}

const StatCard = ({ stat, index, isVisible }: StatCardProps) => {
  const Icon = stat.icon;
  const count = useCountUp(stat.value, isVisible, 2400);

  return (
    <motion.div
      custom={index}
      variants={cardVariant}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      className="group relative flex flex-col items-center text-center p-6 md:p-8 rounded-2xl cursor-default overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, rgba(22,25,32,0.92) 0%, rgba(14,16,22,0.96) 100%)',
        border: '1px solid rgba(255,255,255,0.05)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)',
        transition: 'all 0.4s ease',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = `${stat.color}30`;
        el.style.boxShadow = `0 12px 50px rgba(0,0,0,0.6), 0 0 40px ${stat.color}12, inset 0 1px 0 rgba(255,255,255,0.06)`;
        el.style.transform = 'translateY(-4px)';
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = 'rgba(255,255,255,0.05)';
        el.style.boxShadow = '0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)';
        el.style.transform = 'translateY(0)';
      }}
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{ background: `radial-gradient(circle at 50% 0%, ${stat.color}08 0%, transparent 65%)` }}
      />

      {/* Icon */}
      <div
        className="relative w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-5 transition-all duration-400"
        style={{
          background: `linear-gradient(135deg, ${stat.color}16, ${stat.color}06)`,
          border: `1px solid ${stat.color}25`,
          boxShadow: `0 0 20px ${stat.color}08`,
        }}
      >
        <Icon className="w-7 h-7 md:w-8 md:h-8" strokeWidth={1.5} style={{ color: stat.color }} />

        {/* Icon glow on hover */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400"
          style={{ boxShadow: `0 0 30px ${stat.color}25, inset 0 0 15px ${stat.color}06` }}
        />
      </div>

      {/* Counter */}
      <div
        className="font-heading font-black leading-none mb-1 tabular-nums"
        style={{
          fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
          background: `linear-gradient(135deg, ${stat.color}, ${stat.color}cc)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          filter: `drop-shadow(0 0 20px ${stat.color}50)`,
        }}
      >
        {count}
        <span style={{ fontSize: '60%' }}>{stat.suffix}</span>
      </div>

      {/* Label */}
      <p className="font-heading font-bold text-sm md:text-base text-white mb-1.5">
        {stat.label}
      </p>

      {/* Description */}
      <p className="text-xs font-sans" style={{ color: 'rgba(117,117,117,0.8)' }}>
        {stat.description}
      </p>

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, transparent, ${stat.color}60, transparent)` }}
      />
    </motion.div>
  );
};

const Statistics = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      className="relative overflow-hidden py-24 md:py-32"
      style={{ background: 'linear-gradient(180deg, #090b0e 0%, #0e1016 50%, #090b0e 100%)' }}
    >
      {/* Background elements */}
      <div className="absolute inset-0 blueprint-grid opacity-40 pointer-events-none" />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(0,204,184,0.05) 0%, transparent 65%)',
          filter: 'blur(50px)',
        }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-[500px] h-[300px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(6,182,212,0.03) 0%, transparent 65%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={sectionRef}>

        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
          className="mb-16 md:mb-20 text-center"
        >
          <span className="section-badge mb-6 inline-flex">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
            By The Numbers
          </span>
          <h2
            className="font-heading font-black mb-4 leading-[0.95] tracking-[-0.03em]"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
          >
            <span style={{
              background: 'linear-gradient(135deg, #ffffff 0%, rgba(200,200,200,0.85) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Career{' '}</span>
            <span style={{
              background: 'linear-gradient(135deg, #00e8d5, #00ccb8, #00f5e5)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 15px rgba(0,204,184,0.3))',
            }}>Milestones</span>
          </h2>
          <p
            className="text-base md:text-lg max-w-xl mx-auto font-sans font-light"
            style={{ color: 'rgba(117,117,117,0.85)' }}
          >
            Three decades of engineering excellence, measured in impact.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <StatCard
              key={stat.label}
              stat={stat}
              index={index}
              isVisible={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
