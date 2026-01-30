import React, { useEffect, useRef, useContext, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ThemeContext } from "../../context/ThemeContext";

gsap.registerPlugin(ScrollTrigger);

const CTA_BUTTONS = [
  { label: "View Resume", path: "/resume", variant: "outline" },
  { label: "Hire Me", path: "/contact", variant: "solid" },
];

const HomeBottomText = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const glowRef = useRef(null);
  const marquee1Ref = useRef(null);
  const marquee2Ref = useRef(null);
  const [copied, setCopied] = useState(false);

  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  // Check if device is mobile/touch to handle cursor visibility
  const isTouchDevice = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);

  const colors = useMemo(() => (
    isDark ? {
      bg: "rgba(10, 15, 25, 0.8)",
      border: "rgba(255, 255, 255, 0.1)",
      text: "#F8FAFC",
      accent: "#3B82F6",
      glow: "rgba(59, 130, 246, 0.25)",
    } : {
      bg: "rgba(255, 255, 255, 0.8)",
      border: "rgba(0, 0, 0, 0.05)",
      text: "#0F172A",
      accent: "#2563EB",
      glow: "rgba(37, 99, 235, 0.15)",
    }
  ), [isDark]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Smooth Marquee Loops (Slower for readability on small screens)
      gsap.to(marquee1Ref.current, { xPercent: -50, repeat: -1, duration: 35, ease: "none" });
      gsap.to(marquee2Ref.current, { xPercent: 50, repeat: -1, duration: 40, ease: "none" });

      // 2. Custom Cursor Follow (Disabled for touch devices)
      if (!isTouchDevice) {
        const moveGlow = (e) => {
          const { clientX, clientY } = e;
          gsap.to(glowRef.current, {
            x: clientX,
            y: clientY,
            duration: 0.8,
            ease: "power3.out",
          });
        };
        window.addEventListener("mousemove", moveGlow);
        return () => window.removeEventListener("mousemove", moveGlow);
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isTouchDevice]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("singhayushrs13@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const MarqueeRow = ({ innerRef, text }) => (
    <div className="flex whitespace-nowrap overflow-hidden select-none py-2 md:py-4">
      <div ref={innerRef} className="flex gap-10 md:gap-20 text-[8vh] md:text-[12vh] font-black uppercase tracking-tighter opacity-[0.04]" 
           style={{ color: colors.text }}>
        {Array(4).fill(text).map((t, i) => <span key={i}>{t} • </span>)}
      </div>
    </div>
  );

  return (
    <section 
      ref={sectionRef} 
      className={`relative w-full py-20 md:py-40 px-4 flex flex-col items-center justify-center overflow-hidden`}
      style={{ cursor: isTouchDevice ? "auto" : "none" }}
    >
      {/* 1. CUSTOM CURSOR - Only visible on desktop */}
      {!isTouchDevice && (
        <div 
          ref={glowRef} 
          className="fixed top-0 left-0 w-16 h-16 md:w-24 md:h-24 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[100] rounded-full border border-white/20 backdrop-invert-[0.1] flex items-center justify-center transition-transform duration-300"
        >
          <div className="w-1 h-1 md:w-2 md:h-2 bg-white rounded-full" />
          <div className="absolute inset-0 w-full h-full bg-blue-500/20 blur-xl rounded-full" />
        </div>
      )}

      {/* 2. GRAINY TEXTURE */}
      <div className="fixed inset-0 pointer-events-none z-[99] opacity-[0.04] mix-blend-overlay"
           style={{ backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")` }} />

      {/* 3. BACKGROUND MARQUEE */}
      <div className="absolute inset-0 z-0 flex flex-col justify-center pointer-events-none rotate-[-6deg] scale-110 md:scale-125">
        <MarqueeRow innerRef={marquee1Ref} text="LET'S WORK TOGETHER" />
        <MarqueeRow innerRef={marquee2Ref} text="AVAILABLE NOW" />
      </div>

      {/* 4. MAIN INTERACTIVE CARD */}
      <div
        ref={containerRef}
        className="relative z-10 w-full max-w-4xl p-8 md:p-24 rounded-[2.5rem] md:rounded-[4rem] border backdrop-blur-3xl shadow-2xl"
        style={{ backgroundColor: colors.bg, borderColor: colors.border }}
      >
        <div className="text-center">
          <h2 className="text-4xl sm:text-6xl lg:text-8xl font-black mb-8 md:mb-10 tracking-tighter leading-tight" style={{ color: colors.text }}>
            Ready for the <br /> <span className="text-blue-600">Next Step?</span>
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center">
            {CTA_BUTTONS.map((btn, i) => (
              <Link
                key={btn.label}
                to={btn.path}
                className="group relative h-16 md:h-20 w-full max-w-[280px] sm:w-64 flex items-center justify-center rounded-[1.5rem] md:rounded-[2rem] font-bold text-base md:text-lg transition-all active:scale-95 overflow-hidden"
                style={{
                  background: btn.variant === "solid" ? colors.accent : "transparent",
                  border: `2px solid ${btn.variant === "outline" ? colors.border : "transparent"}`,
                  color: btn.variant === "solid" ? "white" : colors.text
                }}
              >
                <span className="relative z-10">{btn.label}</span>
                {btn.variant === "solid" && (
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                )}
              </Link>
            ))}
          </div>

          {/* EMAIL COPY COMPONENT */}
          <button 
            onClick={handleCopyEmail}
            className="mt-8 md:mt-12 group flex flex-wrap items-center justify-center gap-3 mx-auto px-4 md:px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all active:scale-90"
            style={{ color: colors.text }}
          >
            <span className="text-[10px] md:text-sm font-medium tracking-widest uppercase opacity-60 truncate max-w-[200px] md:max-w-none">
              {copied ? "Copied to clipboard!" : "singhayushrs13@gmail.com"}
            </span>
            <svg className="w-4 h-4 opacity-40 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
        </div>
      </div>

      <footer className="relative z-10 mt-12 md:mt-20 text-[8px] md:text-[10px] tracking-[0.4em] md:tracking-[0.6em] uppercase font-black opacity-30 text-center" style={{ color: colors.text }}>
        Ayush Singh • Built to Last • 2026
      </footer>
    </section>
  );
};

export default HomeBottomText;