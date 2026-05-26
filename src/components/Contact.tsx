import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Phone, PhoneCall, Mail, MapPin, Send, MessageSquare } from 'lucide-react';

interface ContactInfo {
  label: string;
  value: string;
  href?: string;
  icon: React.ElementType;
  description?: string;
}

const contactDetails: ContactInfo[] = [
  {
    label: 'Mobile',
    value: '+966 550 005 763',
    href: 'tel:00966550005763',
    icon: Phone,
    description: 'Saudi Arabia',
  },
  {
    label: 'Telephone',
    value: '+966 126 695 961',
    href: 'tel:00966126695961',
    icon: PhoneCall,
    description: 'Office line',
  },
  {
    label: 'Email',
    value: 'Taha_eid10572@sak-consult.com',
    href: 'mailto:Taha_eid10572@sak-consult.com',
    icon: Mail,
    description: 'Professional',
  },
  {
    label: 'Alt Email',
    value: 'Taha_eid10572@yahoo.com',
    href: 'mailto:Taha_eid10572@yahoo.com',
    icon: Mail,
    description: 'Personal',
  },
  {
    label: 'Location',
    value: 'Saudi Arabia / Egypt',
    icon: MapPin,
    description: 'Based in KSA',
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.1,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

function ContactCard({ info, index }: { info: ContactInfo; index: number }) {
  const Icon = info.icon;
  const content = (
    <motion.div
      custom={index}
      variants={fadeInUp}
      className="group flex items-center gap-4 p-5 rounded-xl transition-all duration-400 cursor-default"
      style={{
        background: 'linear-gradient(135deg, rgba(22,25,32,0.85) 0%, rgba(14,16,22,0.92) 100%)',
        border: '1px solid rgba(255,255,255,0.05)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.35)',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = 'rgba(0,204,184,0.25)';
        el.style.boxShadow = '0 8px 40px rgba(0,0,0,0.5), 0 0 30px rgba(0,204,184,0.08)';
        el.style.transform = 'translateX(4px)';
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = 'rgba(255,255,255,0.05)';
        el.style.boxShadow = '0 4px 20px rgba(0,0,0,0.35)';
        el.style.transform = 'translateX(0)';
      }}
    >
      {/* Icon */}
      <div
        className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300"
        style={{
          background: 'linear-gradient(135deg, rgba(0,204,184,0.12), rgba(0,204,184,0.04))',
          border: '1px solid rgba(0,204,184,0.2)',
        }}
      >
        <Icon className="w-5 h-5" strokeWidth={1.5} style={{ color: '#00ccb8' }} />
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 mb-0.5">
          <p className="text-xs font-bold uppercase tracking-[0.15em]" style={{ color: 'rgba(0,204,184,0.7)' }}>
            {info.label}
          </p>
          {info.description && (
            <span
              className="text-[9px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded"
              style={{ background: 'rgba(117,117,117,0.15)', color: 'rgba(117,117,117,0.8)' }}
            >
              {info.description}
            </span>
          )}
        </div>
        <p
          className="text-sm font-bold truncate transition-colors duration-300"
          style={{ color: 'rgba(200,200,200,0.9)' }}
        >
          {info.value}
        </p>
      </div>

      {/* Arrow hint for clickable items */}
      {info.href && (
        <svg className="w-4 h-4 flex-shrink-0 opacity-30 group-hover:opacity-80 transition-all duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: '#00ccb8' }}>
          <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </motion.div>
  );

  if (info.href) {
    return (
      <a href={info.href} className="block no-underline">
        {content}
      </a>
    );
  }
  return content;
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #090b0e 0%, #0c0e14 100%)' }}
    >
      {/* Top separator */}
      <div className="absolute top-0 left-0 right-0 section-separator" />

      {/* Background */}
      <div className="absolute inset-0 blueprint-grid opacity-40 pointer-events-none" />
      <div
        className="absolute top-1/2 -translate-y-1/2 right-0 w-[600px] h-[600px] pointer-events-none"
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
            <MessageSquare className="w-3 h-3" />
            Reach Out
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
            }}>Get in{' '}</span>
            <span style={{
              background: 'linear-gradient(135deg, #00e8d5, #00ccb8, #00f5e5)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 20px rgba(0,204,184,0.35))',
            }}>Touch</span>
          </h2>
          <p
            className="text-base md:text-lg font-sans font-light max-w-md mx-auto"
            style={{ color: 'rgba(117,117,117,0.85)' }}
          >
            Let's discuss your next mega engineering project
          </p>
          <div className="w-24 h-px mx-auto mt-6" style={{ background: 'linear-gradient(90deg, transparent, #00ccb8, transparent)', boxShadow: '0 0 12px rgba(0,204,184,0.4)' }} />
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

          {/* Left — Contact Info */}
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
                <Phone className="w-4 h-4" style={{ color: '#00ccb8' }} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-heading font-bold text-white">Contact Information</h3>
            </motion.div>

            <div className="space-y-3">
              {contactDetails.map((info, i) => (
                <ContactCard key={info.label + info.value} info={info} index={i} />
              ))}
            </div>

            {/* Availability note */}
            <motion.div
              custom={5}
              variants={fadeInUp}
              className="mt-8 p-5 rounded-xl"
              style={{
                background: 'linear-gradient(135deg, rgba(0,204,184,0.06), rgba(0,204,184,0.02))',
                border: '1px solid rgba(0,204,184,0.12)',
              }}
            >
              <div className="flex items-center gap-3">
                <span
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0 animate-pulse"
                  style={{ background: '#00ccb8', boxShadow: '0 0 8px rgba(0,204,184,0.7)' }}
                />
                <p className="text-sm font-semibold" style={{ color: 'rgba(200,200,200,0.9)' }}>
                  Available for new projects and consulting
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right — Contact Form */}
          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={fadeInUp}
            custom={0.3}
          >
            <div className="flex items-center gap-3 mb-8">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: 'rgba(0,204,184,0.1)', border: '1px solid rgba(0,204,184,0.2)' }}
              >
                <MessageSquare className="w-4 h-4" style={{ color: '#00ccb8' }} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-heading font-bold text-white">Send a Message</h3>
            </div>

            <div
              className="relative p-6 md:p-8 rounded-2xl"
              style={{
                background: 'linear-gradient(135deg, rgba(22,25,32,0.95) 0%, rgba(14,16,22,0.98) 100%)',
                border: '1px solid rgba(255,255,255,0.06)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)',
              }}
            >
              {/* Corner glow */}
              <div
                className="absolute top-0 right-0 w-32 h-32 pointer-events-none"
                style={{ background: 'radial-gradient(circle at top right, rgba(0,204,184,0.05) 0%, transparent 70%)' }}
              />

              <form onSubmit={handleSubmit} className="space-y-5 relative">
                {/* Name */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-[0.12em] mb-2" style={{ color: 'rgba(117,117,117,0.9)' }}>
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className="form-input"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-[0.12em] mb-2" style={{ color: 'rgba(117,117,117,0.9)' }}>
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="form-input"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                    required
                  />
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-[0.12em] mb-2" style={{ color: 'rgba(117,117,117,0.9)' }}>
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Project inquiry"
                    className="form-input"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-[0.12em] mb-2" style={{ color: 'rgba(117,117,117,0.9)' }}>
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project..."
                    rows={5}
                    className="form-input resize-none"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                    required
                  />
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 rounded-xl font-heading font-bold text-sm flex items-center justify-center gap-2.5 transition-all duration-300"
                  style={{
                    background: submitted
                      ? 'linear-gradient(135deg, rgba(0,204,184,0.3), rgba(0,204,184,0.15))'
                      : 'linear-gradient(135deg, #00ccb8, #00e8d5)',
                    color: submitted ? '#00ccb8' : '#090b0e',
                    border: submitted ? '1px solid rgba(0,204,184,0.4)' : 'none',
                    boxShadow: submitted ? '0 0 30px rgba(0,204,184,0.15)' : '0 0 40px rgba(0,204,184,0.35)',
                  }}
                >
                  {submitted ? (
                    <>
                      <span>✓ Message Sent!</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" strokeWidth={2} />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom separator */}
      <div className="absolute bottom-0 left-0 right-0 section-separator" />
    </section>
  );
}
