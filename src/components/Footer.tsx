import { HardHat } from 'lucide-react';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

function handleSmoothScroll(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
  e.preventDefault();
  const targetId = href.replace('#', '');
  document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #090b0e 0%, #060809 100%)' }}
    >
      {/* Top separator with glow */}
      <div
        className="h-px"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(0,204,184,0.2) 20%, rgba(0,204,184,0.5) 50%, rgba(0,204,184,0.2) 80%, transparent 100%)',
          boxShadow: '0 0 20px rgba(0,204,184,0.15)',
        }}
      />

      {/* Background grid */}
      <div className="absolute inset-0 blueprint-grid opacity-20 pointer-events-none" />

      {/* Ambient glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(0,204,184,0.04) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative z-10">

        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 items-start mb-10 md:mb-12">

          {/* Left — Brand */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: 'linear-gradient(135deg, #00ccb8, #00e8d5)',
                  boxShadow: '0 0 20px rgba(0,204,184,0.3)',
                }}
              >
                <HardHat className="w-5 h-5 text-[#090b0e]" strokeWidth={2} />
              </div>
              <div>
                <p className="font-heading font-black text-white text-base leading-tight">
                  Eng. Taha Mohamed
                </p>
                <p
                  className="text-[10px] font-bold uppercase tracking-[0.15em] leading-tight mt-0.5"
                  style={{ color: '#00ccb8' }}
                >
                  Senior Civil Engineer
                </p>
              </div>
            </div>

            <p className="text-sm font-sans font-light text-center md:text-left leading-relaxed max-w-[240px]" style={{ color: 'rgba(117,117,117,0.8)' }}>
              30+ years of engineering excellence across Saudi Arabia & Egypt.
            </p>
          </div>

          {/* Center — Navigation */}
          <div className="flex flex-col items-center gap-4">
            <p className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: 'rgba(0,204,184,0.6)' }}>
              Navigation
            </p>
            <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                  className="text-xs font-semibold uppercase tracking-wider transition-all duration-300"
                  style={{ color: 'rgba(117,117,117,0.8)' }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = '#00ccb8';
                    (e.currentTarget as HTMLElement).style.textShadow = '0 0 10px rgba(0,204,184,0.4)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = 'rgba(117,117,117,0.8)';
                    (e.currentTarget as HTMLElement).style.textShadow = 'none';
                  }}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Right — Professional Details */}
          <div className="flex flex-col items-center md:items-end gap-3">
            <p className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: 'rgba(0,204,184,0.6)' }}>
              Specializations
            </p>
            {['Project Management', 'Construction Supervision', 'Infrastructure Design'].map((spec) => (
              <span
                key={spec}
                className="text-xs font-semibold px-3 py-1.5 rounded-full"
                style={{
                  background: 'rgba(0,204,184,0.06)',
                  border: '1px solid rgba(0,204,184,0.12)',
                  color: 'rgba(158,158,158,0.8)',
                }}
              >
                {spec}
              </span>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div
          className="h-px mb-8"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)' }}
        />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs font-sans text-center md:text-left" style={{ color: 'rgba(84,84,84,0.8)' }}>
            © {currentYear} Eng. Taha Mohamed Eid. All rights reserved.
          </p>

          <div className="flex items-center gap-2">
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: '#00ccb8', boxShadow: '0 0 6px rgba(0,204,184,0.7)' }}
            />
            <span className="text-xs font-semibold" style={{ color: 'rgba(0,204,184,0.6)' }}>
              Available for New Projects
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
