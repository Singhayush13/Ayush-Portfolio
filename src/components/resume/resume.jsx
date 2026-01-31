// src/components/resume/Resume.jsx
import React, { useEffect, useRef, useContext, useState, useMemo, memo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ThemeContext } from "../../context/ThemeContext";
import { 
  FaPhoneAlt, FaEnvelope, FaLinkedin, FaChevronDown, 
  FaChevronUp, FaDownload, FaCode, FaDatabase, FaServer 
} from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const handleDownloadResume = () => {
    const link = document.createElement("a");
    link.href = "/Ayush_Resume.pdf";
    link.download = "Ayush_Singh.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setToast({ message: "Secure Download Started", visible: true });
    setTimeout(() => setToast({ message: "", visible: false }), 3000);
  };

const Resume = () => {
  const sectionRef = useRef(null);
  const glowRef = useRef(null); 
  const downloadBtnRef = useRef(null); 
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const [expandedSection, setExpandedSection] = useState({ digital: false, aakaar: false });

  // Detect touch device
  const isTouchDevice = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);

  const themeColors = useMemo(() => ({
    bg: isDark ? "#08080a" : "#f8fafc",
    card: isDark ? "rgba(255, 255, 255, 0.03)" : "rgba(255, 255, 255, 0.8)",
    border: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.08)",
    text: isDark ? "#f1f5f9" : "#1e293b",
    accent: isDark ? "#fbbf24" : "#2563eb",
    secondary: isDark ? "#3b82f6" : "#6366f1",
  }), [isDark]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. CUSTOM CURSOR TRACKING
      if (!isTouchDevice && glowRef.current) {
        const moveCursor = (e) => {
          // Use quickSetter for better performance on high-refresh monitors
          gsap.to(glowRef.current, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.5,
            ease: "power3.out"
          });
        };
        window.addEventListener("mousemove", moveCursor);

        // Hover Effect for interactive elements
        const interactives = document.querySelectorAll('.glass-card, button, a');
        interactives.forEach(el => {
          el.addEventListener('mouseenter', () => gsap.to(glowRef.current, { scale: 1.8, opacity: 0.8 }));
          el.addEventListener('mouseleave', () => gsap.to(glowRef.current, { scale: 1, opacity: 1 }));
        });
      }

      // 2. MAGNETIC BUTTON
      if (downloadBtnRef.current) {
        const btn = downloadBtnRef.current;
        const moveBtn = (e) => {
          const rect = btn.getBoundingClientRect();
          const x = e.clientX - (rect.left + rect.width / 2);
          const y = e.clientY - (rect.top + rect.height / 2);
          gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.4 });
        };
        const resetBtn = () => gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.3)" });
        
        btn.addEventListener("mousemove", moveBtn);
        btn.addEventListener("mouseleave", resetBtn);
      }

      // 3. REVEAL ANIMATIONS
      gsap.from(".resume-header", { y: 60, opacity: 0, duration: 1, ease: "power4.out" });

      gsap.utils.toArray(".resume-section").forEach((el) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 1,
          scrollTrigger: {
            trigger: el,
            start: "top 92%",
            toggleActions: "play none none reverse",
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isTouchDevice]);

  return (
    <main
      ref={sectionRef}
      className="relative min-h-screen w-full px-4 sm:px-8 lg:px-32 py-20 overflow-hidden"
      style={{ 
        backgroundColor: themeColors.bg, 
        color: themeColors.text,
        cursor: isTouchDevice ? "auto" : "none" 
      }}
    >
      {/* 1. CUSTOM CURSOR */}
      {!isTouchDevice && (
        <div 
          ref={glowRef} 
          className="fixed top-0 left-0 w-24 h-24 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[9999] rounded-full border border-white/20 backdrop-invert-[0.1] flex items-center justify-center"
        >
          <div className="w-1.5 h-1.5 bg-white rounded-full opacity-50" />
          <div className="absolute inset-0 w-full h-full bg-white/5 blur-xl rounded-full" />
        </div>
      )}

      {/* 2. BACKGROUND BLOBS */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
             style={{ backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")` }} />
        <div className="glow-blob absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] rounded-full blur-[120px] opacity-20" 
             style={{ background: themeColors.accent }} />
        <div className="glow-blob absolute bottom-[-10%] left-[-5%] w-[35vw] h-[35vw] rounded-full blur-[120px] opacity-10" 
             style={{ background: themeColors.secondary }} />
      </div>

      {/* HEADER */}
      <header className="resume-header relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-20">
        <div>
          <h1 className="text-5xl sm:text-7xl font-black tracking-tighter uppercase leading-[0.85]">
            Ayush <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-amber-500"> Singh </span>
          </h1>
          <p className="mt-4 text-lg font-medium tracking-widest uppercase opacity-60">
            Software Developer & System Architect
          </p>
        </div>

        <div className="flex flex-col gap-4 text-sm sm:text-base font-medium">
          <ContactItem icon={<FaPhoneAlt />} text="+91 9096959656" href="tel:+919096959656" color={themeColors.accent} />
          <ContactItem icon={<FaEnvelope />} text="singhayushrs13@gmail.com" href="mailto:singhayushrs13@gmail.com" color={themeColors.accent} />
          <ContactItem icon={<FaLinkedin />} text="LinkedIn Profile" href="https://linkedin.com/in/singhayush1356" color={themeColors.accent} />
          <button 
            onClick={handleDownloadResume}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-bold hover:shadow-xl transition-shadow active:scale-95 shadow-lg"
          >
            <FaDownload /> Download CV
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        <div className="lg:col-span-8 space-y-8">
          <section className="resume-section glass-card p-8 rounded-3xl border shadow-2xl transition-all duration-500"
                   style={{ backgroundColor: themeColors.card, borderColor: themeColors.border }}>
            <SectionHeader title="About Me" icon={<FaCode />} color={themeColors.accent} />
            <p className="text-lg leading-relaxed opacity-80">
              Results-driven Software Developer skilled in React.js, Node.js, and .NET ecosystems. 
              I specialize in bridging the gap between legacy systems (Classic ASP) and modern 
              web architectures to deliver high-performance, scalable solutions.
            </p>
          </section>

          <section className="resume-section glass-card p-8 rounded-3xl border shadow-2xl transition-all duration-500"
                   style={{ backgroundColor: themeColors.card, borderColor: themeColors.border }}>
            <SectionHeader title="Experience" icon={<FaServer />} color={themeColors.accent} />
            <div className="space-y-12 mt-8">
              <TimelineItem 
                title="Software Developer" company="Digital ASPL" date="May 2025 – Present"
                isExpanded={expandedSection.digital}
                toggle={() => setExpandedSection(p => ({ ...p, digital: !p.digital }))}
                color={themeColors.accent}
              >
                <li>Modernized Classic ASP/VBScript modules into optimized .NET workflows.</li>
                <li>Architected SQL Server schemas with advanced stored procedures for 40% faster query execution.</li>
                <li>Implemented end-to-end payment reconciliation systems with automated edge-case handling.</li>
              </TimelineItem>

              <TimelineItem 
                title="Admin Executive" company="Aakaar Education" date="Jun 2023 – May 2025"
                isExpanded={expandedSection.aakaar}
                toggle={() => setExpandedSection(p => ({ ...p, aakaar: !p.aakaar }))}
                color={themeColors.accent}
              >
                <li>Automated student management reporting using SQL and Excel scripting.</li>
                <li>Optimized outreach programs using data-driven admission tracking.</li>
              </TimelineItem>
            </div>
          </section>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <section className="resume-section glass-card p-8 rounded-3xl border shadow-2xl transition-all duration-500"
                   style={{ backgroundColor: themeColors.card, borderColor: themeColors.border }}>
            <SectionHeader title="Tech Stack" icon={<FaDatabase />} color={themeColors.accent} />
            <div className="flex flex-wrap gap-2 mt-6">
              {["React", "Node", "MongoDB", "SQL Server", "ASP.NET", "GSAP", "Socket.IO", "REST API"].map(skill => (
                <span key={skill} className="px-3 py-1.5 rounded-xl border text-xs font-bold uppercase tracking-tight transition-all hover:bg-white/10"
                      style={{ borderColor: themeColors.border, background: isDark ? "rgba(255,255,255,0.05)" : "white" }}>
                  {skill}
                </span>
              ))}
            </div>
          </section>

          <section className="resume-section glass-card p-8 rounded-3xl border shadow-2xl transition-all duration-500"
                   style={{ backgroundColor: themeColors.card, borderColor: themeColors.border }}>
            <h3 className="text-xl font-bold mb-6">Education</h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-sm">B.Sc IT (Sem 4)</h4>
                <p className="text-xs opacity-60">Thakur Ramnarayan College • 8.40 CGPA</p>
              </div>
              <div className="pt-4 border-t" style={{ borderColor: themeColors.border }}>
                <h4 className="font-bold text-sm">XII Science (CS)</h4>
                <p className="text-xs opacity-60">St. Anne’s Jr. College</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

// --- Helper Components ---
const ContactItem = ({ icon, text, href, color }) => (
  <a href={href} target="_blank" rel="noreferrer" className="flex items-center gap-3 group transition-all">
    <span className="p-2 rounded-lg bg-white/5 border border-white/10 group-hover:scale-110 transition-transform" style={{ color }}> {icon} </span>
    <span className="opacity-70 group-hover:opacity-100">{text}</span>
  </a>
);

const SectionHeader = ({ title, icon, color }) => (
  <div className="flex items-center gap-4 mb-6">
    <div className="text-2xl" style={{ color }}>{icon}</div>
    <h2 className="text-2xl font-black uppercase tracking-tight">{title}</h2>
  </div>
);

const TimelineItem = ({ title, company, date, children, isExpanded, toggle, color }) => (
  <div className="relative pl-8 border-l-2" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
    <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full" style={{ backgroundColor: color }} />
    <h3 className="text-xl font-bold">{title}</h3>
    <p className="text-sm font-bold opacity-60">{company} • {date}</p>
    <ul className={`mt-4 space-y-2 list-disc ml-4 transition-all duration-500 ease-in-out overflow-hidden ${isExpanded ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
      {children}
    </ul>
    <button onClick={toggle} className="mt-4 text-xs font-black uppercase tracking-widest flex items-center gap-2 opacity-40 hover:opacity-100 transition-opacity">
      {isExpanded ? "Less Info" : "More Info"} {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
    </button>
  </div>
);

export default memo(Resume);