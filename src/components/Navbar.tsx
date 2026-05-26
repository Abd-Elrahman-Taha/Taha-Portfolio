import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, HardHat } from "lucide-react";

interface NavLink {
  label: string;
  href: string;
}

const navLinks: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

const mobileMenuVariants = {
  closed: {
    opacity: 0,
    y: -12,
    transition: {
      duration: 0.25,
      ease: "easeInOut" as const,
    },
  },
  open: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut" as const,
      staggerChildren: 0.07,
      delayChildren: 0.05,
    },
  },
};

const mobileLinkVariants = {
  closed: { opacity: 0, x: -20, transition: { duration: 0.2 } },
  open: { opacity: 1, x: 0, transition: { duration: 0.25 } },
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 60);
    const sections = navLinks.map((link) => link.href.replace("#", ""));
    const scrollPosition = window.scrollY + 130;
    for (let i = sections.length - 1; i >= 0; i--) {
      const element = document.getElementById(sections[i]);
      if (element && element.offsetTop <= scrollPosition) {
        setActiveSection(sections[i]);
        return;
      }
    }
    setActiveSection("");
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-white/[0.04]"
          : "border-b border-transparent"
      }`}
      style={{
        background: scrolled
          ? "linear-gradient(180deg, rgba(9,11,14,0.96) 0%, rgba(9,11,14,0.92) 100%)"
          : "transparent",
        backdropFilter: scrolled ? "blur(24px) saturate(180%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(24px) saturate(180%)" : "none",
        boxShadow: scrolled ? "0 4px 40px rgba(0,0,0,0.5), 0 1px 0 rgba(0,204,184,0.05)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 md:h-20">

          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, "#hero")}
            className="flex items-center gap-3 group flex-shrink-0"
          >
            <div
              className="relative w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #00ccb8, #00e8d5)",
                boxShadow: "0 0 20px rgba(0,204,184,0.35), 0 4px 12px rgba(0,0,0,0.4)",
              }}
            >
              <HardHat className="w-5 h-5 text-[#090b0e]" strokeWidth={2} />
              <div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.2), transparent)" }}
              />
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="font-heading font-bold text-white text-sm leading-tight tracking-tight">
                Eng. Taha Mohamed
              </span>
              <span
                className="text-[10px] font-medium uppercase tracking-[0.15em] leading-tight"
                style={{ color: "#00ccb8" }}
              >
                Senior Civil Engineer
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const sectionId = link.href.replace("#", "");
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="relative px-4 py-2 rounded-lg text-sm font-semibold tracking-wide transition-all duration-300 group"
                  style={{
                    color: isActive ? "#00ccb8" : "rgba(200,200,200,0.75)",
                    textShadow: isActive ? "0 0 15px rgba(0,204,184,0.5)" : "none",
                  }}
                >
                  <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                    {link.label}
                  </span>

                  {/* Background hover */}
                  <span
                    className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: "rgba(0,204,184,0.06)" }}
                  />

                  {/* Active underline */}
                  {isActive && (
                    <motion.span
                      layoutId="navbar-active-indicator"
                      className="absolute bottom-0.5 left-3 right-3 h-px rounded-full"
                      style={{
                        background: "linear-gradient(90deg, transparent, #00ccb8, transparent)",
                        boxShadow: "0 0 8px rgba(0,204,184,0.6)",
                      }}
                      transition={{ type: "spring", stiffness: 500, damping: 35 }}
                    />
                  )}
                </a>
              );
            })}

            {/* CTA button */}
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className="ml-3 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, rgba(0,204,184,0.15), rgba(0,204,184,0.08))",
                border: "1px solid rgba(0,204,184,0.3)",
                color: "#00ccb8",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 25px rgba(0,204,184,0.25)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,204,184,0.6)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,204,184,0.3)";
              }}
            >
              Hire Me
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="md:hidden relative z-50 w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300"
            style={{
              background: mobileOpen ? "rgba(0,204,184,0.12)" : "rgba(255,255,255,0.04)",
              border: `1px solid ${mobileOpen ? "rgba(0,204,184,0.3)" : "rgba(255,255,255,0.08)"}`,
              color: mobileOpen ? "#00ccb8" : "rgba(200,200,200,0.75)",
            }}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={18} strokeWidth={2} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={18} strokeWidth={2} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="md:hidden overflow-hidden"
            style={{
              background: "linear-gradient(180deg, rgba(9,11,14,0.98) 0%, rgba(14,16,22,0.99) 100%)",
              backdropFilter: "blur(40px)",
              borderTop: "1px solid rgba(0,204,184,0.08)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.8)",
            }}
          >
            <div className="px-4 py-6 space-y-1">
              {navLinks.map((link) => {
                const sectionId = link.href.replace("#", "");
                const isActive = activeSection === sectionId;
                return (
                  <motion.div key={link.href} variants={mobileLinkVariants}>
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-base font-semibold tracking-wide transition-all duration-300"
                      style={{
                        color: isActive ? "#00ccb8" : "rgba(200,200,200,0.75)",
                        background: isActive ? "rgba(0,204,184,0.08)" : "transparent",
                        border: `1px solid ${isActive ? "rgba(0,204,184,0.2)" : "transparent"}`,
                        textShadow: isActive ? "0 0 12px rgba(0,204,184,0.4)" : "none",
                      }}
                    >
                      {isActive && (
                        <span
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ background: "#00ccb8", boxShadow: "0 0 8px rgba(0,204,184,0.8)" }}
                        />
                      )}
                      {link.label}
                    </a>
                  </motion.div>
                );
              })}

              <motion.div variants={mobileLinkVariants} className="pt-2">
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, "#contact")}
                  className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl text-base font-bold"
                  style={{
                    background: "linear-gradient(135deg, #00ccb8, #00e8d5)",
                    color: "#090b0e",
                    boxShadow: "0 0 30px rgba(0,204,184,0.3)",
                  }}
                >
                  Get In Touch
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
