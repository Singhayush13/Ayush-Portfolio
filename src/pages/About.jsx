import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useContext, useEffect } from "react";
import { ThemeContext } from "../context/ThemeContext";

const About = () => {
  gsap.registerPlugin(ScrollTrigger);

  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const containerRef = useRef(null);
  const photoRef = useRef(null);
  const skillsRef = useRef(null);
  const cursorRef = useRef(null);
  const followerRef = useRef(null);

  // 1. Force ScrollTrigger Refresh on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    
    // Refresh multiple times to catch layout shifts
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);
    const timer = setTimeout(refresh, 1000);

    return () => {
      window.removeEventListener('load', refresh);
      clearTimeout(timer);
    };
  }, []);

  const themeColors = {
    bg: isDark ? "#050505" : "#f8fafc",
    card: isDark ? "rgba(255, 255, 255, 0.03)" : "rgba(255, 255, 255, 0.8)",
    text: isDark ? "#f1f5f9" : "#0f172a",
    accent: isDark ? "#fbbf24" : "#2563eb",
    subtext: isDark ? "#94a3b8" : "#475569",
    border: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)",
    // --- MANUAL CTA COLORS ---
    ctaBg: isDark ? "#111111" : "#2563eb", // Change these hex codes manually
    ctaText: "#ffffff"
  };

  useGSAP(() => {
    // 2. Custom Cursor Tracking
    const moveCursor = (e) => {
      gsap.to(cursorRef.current, { x: e.clientX, y: e.clientY, duration: 0.1 });
      gsap.to(followerRef.current, { x: e.clientX, y: e.clientY, duration: 0.4, ease: "power2.out" });
    };
    window.addEventListener("mousemove", moveCursor);

    // 3. Hero Animation
    const tl = gsap.timeline();
    tl.from(".hero-title", { y: 100, opacity: 0, duration: 1.2, ease: "expo.out" })
      .from(".hero-p", { y: 30, opacity: 0, duration: 0.8 }, "-=0.8")
      .from(photoRef.current, { scale: 0.9, opacity: 0, duration: 1, ease: "power3.out" }, "-=0.6");

    // 4. CORE STACK ANIMATION (With Fail-Safe)
    gsap.from(".skill-card", {
      scrollTrigger: {
        trigger: skillsRef.current,
        start: "top 90%", // Starts animation when 10% of section enters viewport
        toggleActions: "play none none none",
        onRefresh: (self) => {
           // If for some reason they are invisible on refresh, force them to show
           if(self.progress > 0) gsap.set(".skill-card", { opacity: 1, y: 0 });
        }
      },
      y: 60,
      opacity: 0,
      stagger: 0.1,
      duration: 1,
      ease: "power4.out",
      immediateRender: false // Prevents the "stuck at opacity 0" bug
    });

    return () => window.removeEventListener("mousemove", moveCursor);
  }, { scope: containerRef, dependencies: [isDark] });

  const skills = [
    { title: "Frontend", desc: "React.js, Next.js, Tailwind CSS — crafting pixel-perfect, accessible, and fluid user interfaces." },
    { title: "Backend", desc: "Node.js, Express, MongoDB — architecting robust server-side logic and optimized database schemas." },
    { title: "DevOps", desc: "Cloud deployment, CI/CD pipelines, and performance monitoring for high-availability apps." },
  ];

  return (
    <div ref={containerRef} className="overflow-x-hidden transition-colors duration-500 cursor-none" style={{ backgroundColor: themeColors.bg, color: themeColors.text }}>
      
      {/* CUSTOM CURSOR UI */}
      <div className="fixed top-0 left-0 pointer-events-none z-[9999] hidden lg:block">
        <div ref={cursorRef} className="w-2.5 h-2.5 rounded-full fixed -translate-x-1/2 -translate-y-1/2" style={{ backgroundColor: themeColors.accent }} />
        <div ref={followerRef} className="w-10 h-10 border rounded-full fixed -translate-x-1/2 -translate-y-1/2 transition-all" style={{ borderColor: themeColors.accent }} />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center px-6 sm:px-12 lg:px-24 xl:px-32 py-20">
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="space-y-8 order-2 lg:order-1">
            <div className="space-y-4">
              <span className="inline-block text-xs font-bold tracking-[0.4em] uppercase py-1 px-3 border rounded-full" 
                    style={{ color: themeColors.accent, borderColor: themeColors.border }}>
                Available for Projects
              </span>
              <h1 className="hero-title text-5xl sm:text-7xl xl:text-8xl font-black tracking-tighter leading-[0.9] uppercase">
                Ayush <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-amber-500">
                    Singh.
                </span>
              </h1>
            </div>
            <p className="hero-p text-lg sm:text-xl lg:text-2xl font-medium leading-relaxed max-w-2xl" style={{ color: themeColors.subtext }}>
              Full Stack Architect specialized in <span style={{ color: themeColors.text }}>modern ecosystems</span>. 
            </p>
            <div className="hero-p flex flex-wrap gap-4">
               <button className="px-10 py-4 rounded-full font-bold transition-all shadow-2xl"
                  style={{ backgroundColor: themeColors.accent, color: isDark ? "#000" : "#fff" }}>
                  View Work
               </button>
            </div>
          </div>

          <div className="relative order-1 lg:order-2 flex justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-amber-500/10 blur-[100px] rounded-full" />
            <div ref={photoRef} className="relative z-10 w-full max-w-[400px] aspect-square">
              <img
                src="/ayush.png"
                alt="Ayush"
                className="w-full h-full rounded-[3rem] shadow-2xl object-contain border-2 p-6 transition-transform duration-500 hover:scale-105"
                style={{ borderColor: themeColors.border, backgroundColor: themeColors.card }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section ref={skillsRef} id="core-stack" className="py-32 px-6 sm:px-12 lg:px-24 relative">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 space-y-4 text-center lg:text-left">
            <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter">Core Stack</h2>
            <div className="h-2 w-32 rounded-full mx-auto lg:mx-0" style={{ backgroundColor: themeColors.accent }}></div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill, idx) => (
              <div
                key={idx}
                className="skill-card group relative p-10 rounded-[2.5rem] border backdrop-blur-xl transition-all duration-500 hover:-translate-y-4"
                style={{ backgroundColor: themeColors.card, borderColor: themeColors.border }}
              >
                <div className="mb-8 w-14 h-14 rounded-2xl flex items-center justify-center font-black text-2xl border transition-transform group-hover:rotate-12" 
                     style={{ backgroundColor: themeColors.bg, color: themeColors.accent, borderColor: themeColors.border }}>
                  {idx + 1}
                </div>
                <h3 className="text-2xl font-bold mb-4 tracking-tight">{skill.title}</h3>
                <p className="leading-relaxed text-base opacity-70 group-hover:opacity-100 transition-opacity">{skill.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modern CTA - MANUAL COLORS */}
      <section className="py-24 px-6 sm:px-12">
        <div className="max-w-6xl mx-auto rounded-[4rem] p-12 sm:p-24 text-center relative overflow-hidden shadow-2xl"
             style={{ backgroundColor: themeColors.ctaBg, color: themeColors.ctaText }}>
          
          {/* Subtle Grainy Overlay */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
          
          <div className="relative z-10 space-y-10">
            <h2 className="text-4xl sm:text-7xl font-black leading-[0.85] tracking-tighter uppercase">Build the <br /> Future.</h2>
            <p className="opacity-80 text-lg sm:text-2xl max-w-2xl mx-auto font-medium">Ready to scale your next big idea?</p>
            <a href="/contact" className="inline-block px-12 py-6 bg-white text-black rounded-full font-black tracking-widest uppercase hover:scale-110 transition-all duration-300">
              Get in Touch
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;