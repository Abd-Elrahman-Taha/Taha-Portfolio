import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import "./index.css"

const LoadingScreen = () => {
  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.7, ease: 'easeInOut' }}
      style={{ background: '#090b0e' }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(0,204,184,0.06) 0%, transparent 70%)',
        }}
      />
      <div className="absolute inset-0 blueprint-grid opacity-30" />

      <div className="flex flex-col items-center gap-8 relative z-10">
        {/* Logo */}
        <motion.div
          className="relative"
          initial={{ scale: 0.4, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center relative"
            style={{
              background: 'linear-gradient(135deg, #00ccb8, #00e8d5)',
              boxShadow: '0 0 60px rgba(0,204,184,0.4), 0 20px 40px rgba(0,0,0,0.4)',
            }}
          >
            <span className="font-heading text-3xl font-black text-[#090b0e] select-none leading-none">TM</span>
            {/* Shine overlay */}
            <div
              className="absolute inset-0 rounded-2xl"
              style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 60%)' }}
            />
          </div>

          {/* Outer glow ring */}
          <div
            className="absolute inset-0 rounded-2xl animate-ping opacity-30 pointer-events-none"
            style={{ border: '2px solid rgba(0,204,184,0.5)', margin: '-4px' }}
          />
        </motion.div>

        {/* Name */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <p
            className="font-heading font-black text-xl mb-1"
            style={{ color: 'rgba(240,240,240,0.95)' }}
          >
            Eng. Taha Mohamed
          </p>
          <p
            className="text-xs font-bold uppercase tracking-[0.25em]"
            style={{ color: '#00ccb8' }}
          >
            Senior Civil Engineer
          </p>
        </motion.div>

        {/* Spinner */}
        <motion.div
          className="relative w-14 h-14"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {/* Track */}
          <div
            className="absolute inset-0 rounded-full"
            style={{ border: '2px solid rgba(0,204,184,0.08)' }}
          />
          {/* Spinning arc */}
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1.2, ease: 'linear', repeat: Infinity }}
            style={{
              border: '2px solid transparent',
              borderTopColor: '#00ccb8',
              boxShadow: '0 0 15px rgba(0,204,184,0.3)',
            }}
          />
          {/* Inner spinner (opposite dir) */}
          <motion.div
            className="absolute inset-2 rounded-full"
            animate={{ rotate: -360 }}
            transition={{ duration: 2, ease: 'linear', repeat: Infinity }}
            style={{
              border: '1px solid transparent',
              borderBottomColor: 'rgba(0,204,184,0.4)',
            }}
          />
        </motion.div>

        {/* Loading text */}
        <motion.p
          className="text-xs font-bold uppercase tracking-[0.3em]"
          style={{ color: 'rgba(84,84,84,0.8)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Loading Portfolio
        </motion.p>
      </div>
    </motion.div>
  );
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [Navbar, setNavbar] = useState<React.ComponentType | null>(null);
  const [Hero, setHero] = useState<React.ComponentType | null>(null);
  const [About, setAbout] = useState<React.ComponentType | null>(null);
  const [Statistics, setStatistics] = useState<React.ComponentType | null>(null);
  const [Experience, setExperience] = useState<React.ComponentType | null>(null);
  const [Projects, setProjects] = useState<React.ComponentType | null>(null);
  const [Skills, setSkills] = useState<React.ComponentType | null>(null);
  const [Contact, setContact] = useState<React.ComponentType | null>(null);
  const [Footer, setFooter] = useState<React.ComponentType | null>(null);

  useEffect(() => {
    Promise.all([
      import('./components/Navbar').then(m => setNavbar(() => m.default)),
      import('./components/Hero').then(m => setHero(() => m.default)),
      import('./components/About').then(m => setAbout(() => m.default)),
      import('./components/Statistics').then(m => setStatistics(() => m.default)),
      import('./components/Experience').then(m => setExperience(() => m.default)),
      import('./components/Projects').then(m => setProjects(() => m.default)),
      import('./components/Skills').then(m => setSkills(() => m.default)),
      import('./components/Contact').then(m => setContact(() => m.default)),
      import('./components/Footer').then(m => setFooter(() => m.default)),
    ]).then(() => {
      setTimeout(() => setIsLoading(false), 1800);
    });
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen key="loading" />}
      </AnimatePresence>

      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {Navbar && <Navbar />}
          <main>
            {Hero && <Hero />}
            {About && <About />}
            {Statistics && <Statistics />}
            {Experience && <Experience />}
            {Projects && <Projects />}
            {Skills && <Skills />}
            {Contact && <Contact />}
          </main>
          {Footer && <Footer />}
        </motion.div>
      )}
    </>
  );
};

export default App;
