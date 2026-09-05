import { useEffect, useRef, useContext, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ThemeContext } from "../../context/ThemeContext";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { label: "Projects Delivered", value: 15 },
  { label: "Technologies", value: 10 },
  { label: "Years Experience", value: 1 },
];

const HomeHeroText = () => {
  const sectionRef = useRef(null);
  const magneticButtons = useRef([]);
  const blob1Ref = useRef(null);
  const heroVisualRef = useRef(null);
  const isTouchDevice = typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;

  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const colors = useMemo(() => ({
    text: isDark ? "#F8FAFC" : "#0F172A",
    muted: isDark ? "#94A3B8" : "#475569",
    accent: "#3B82F6",
    cardBg: isDark ? "rgba(30, 41, 59, 0.4)" : "rgba(255, 255, 255, 0.7)",
    border: isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.05)",
  }), [isDark]);

  useEffect(() => {
    const buttonListeners = [];
    let ctx = gsap.context(() => {
      // 2. MAGNETIC BUTTON LOGIC
      magneticButtons.current.forEach((btn) => {
        if (!btn) return;
        const moveBtn = (e) => {
          const rect = btn.getBoundingClientRect();
          const distanceX = e.clientX - (rect.left + rect.width / 2);
          const distanceY = e.clientY - (rect.top + rect.height / 2);

          gsap.to(btn, {
            x: distanceX * 0.3,
            y: distanceY * 0.3,
            duration: 0.4,
            ease: "power2.out",
          });
        };

        const resetBtn = () => {
          gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.3)" });
        };

        if (!isTouchDevice) {
          btn.addEventListener("mousemove", moveBtn);
          btn.addEventListener("mouseleave", resetBtn);
          buttonListeners.push({ btn, moveBtn, resetBtn });
        }
      });

      // 3. ENTRANCE ANIMATIONS
      const tl = gsap.timeline();
      tl.from(".hero-reveal", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power4.out"
      })
        .from(heroVisualRef.current, {
          scale: 0.8,
          opacity: 0,
          duration: 1.5,
          ease: "expo.out"
        }, "-=0.8");

      // 4. FLOATING HERO VISUAL ANIMATION
      gsap.to(heroVisualRef.current, {
        y: 20,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      // 5. PARALLAX
      gsap.to(blob1Ref.current, {
        y: -100,
        scrollTrigger: { scrub: 1 }
      });

    }, sectionRef);

    return () => {
      ctx.revert();
      buttonListeners.forEach(({ btn, moveBtn, resetBtn }) => {
        btn.removeEventListener("mousemove", moveBtn);
        btn.removeEventListener("mouseleave", resetBtn);
      });
    };
  }, [isTouchDevice]);

  return (
    <section
      ref={sectionRef}
      className={`relative min-h-screen w-full flex flex-col justify-center items-center px-4 md:px-12 py-20 overflow-hidden transition-colors duration-700 ${isDark ? 'bg-[#020617]' : 'bg-[#F8FAFC]'}`}
      style={{ cursor: "auto" }}
    >
      {/* Background Blobs */}
      <div ref={blob1Ref} className="absolute top-1/4 -left-20 w-64 md:w-96 h-64 md:h-96 bg-blue-500/20 blur-[100px] rounded-full" />

      <div className="max-w-7xl w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* TEXT CONTENT */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <h1 className="hero-reveal text-5xl sm:text-7xl md:text-8xl xl:text-9xl font-black tracking-tighter leading-[0.9] mb-8" style={{ color: colors.text }}>
              ENGINEERED <br />
              <span className="text-blue-600">IMPACT.</span>
            </h1>

            <p className="hero-reveal text-lg md:text-xl mb-10 max-w-lg mx-auto lg:mx-0" style={{ color: colors.muted }}>
              Software Engineer building reliable backend systems, serverless workflows, and purposeful digital experiences.
            </p>

            <div className="hero-reveal flex flex-wrap gap-4 justify-center lg:justify-start">
              <Link
                to="/projects"
                ref={el => magneticButtons.current[0] = el}
                className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold shadow-xl shadow-blue-500/20 transition-transform active:scale-95"
              >
                View Work
              </Link>

              <Link
                to="/contact"
                ref={el => magneticButtons.current[1] = el}
                className="px-8 py-4 border-2 rounded-xl font-bold transition-all active:scale-95"
                style={{ borderColor: colors.text, color: colors.text }}
              >
                Contact Me
              </Link>
            </div>
          </div>

          {/* DEVELOPER SIGNAL PANEL */}
          <div className="order-1 lg:order-2 flex justify-center items-center">
            <div
              ref={heroVisualRef}
              className="relative w-full max-w-[520px] aspect-square"
            >
              <div className="absolute inset-5 rounded-[2rem] border border-blue-500/30 rotate-3" />
              <div className="absolute inset-0 rounded-[2rem] border shadow-2xl backdrop-blur-sm p-5 sm:p-8"
                style={{ backgroundColor: colors.cardBg, borderColor: colors.border }}>
                <div className="flex items-center justify-between border-b pb-4" style={{ borderColor: colors.border }}>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_14px_rgba(52,211,153,0.8)]" />
                    <span className="text-[10px] font-black uppercase tracking-[0.25em]" style={{ color: colors.muted }}>Available now</span>
                  </div>
                  <span className="font-mono text-xs opacity-40">01 / 04</span>
                </div>

                <div className="mt-8 font-mono text-sm sm:text-base leading-loose" style={{ color: colors.muted }}>
                  <p><span className="text-blue-500">const</span> <span style={{ color: colors.text }}>ayush</span> = {'{'}</p>
                  <p className="pl-5"><span className="text-amber-400">focus</span>: <span className="text-emerald-400">"full-stack"</span>,</p>
                  <p className="pl-5"><span className="text-amber-400">ship</span>: <span className="text-emerald-400">"clean experiences"</span>,</p>
                  <p className="pl-5"><span className="text-amber-400">status</span>: <span className="text-emerald-400">"building"</span></p>
                  <p>{'}'}</p>
                </div>

                <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-2">
                  {['React', 'TypeScript', 'Node.js', 'AWS'].map((skill) => (
                    <span key={skill} className="rounded-full border px-3 py-1 text-[9px] font-bold uppercase tracking-widest"
                      style={{ borderColor: colors.border, color: colors.muted }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BENTO STATS - Responsive Grid */}
        <div className="hero-reveal grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-20 md:mt-32">
          {STATS.map((stat, i) => (
            <div
              key={i}
              className="p-6 md:p-8 rounded-3xl border backdrop-blur-md group hover:border-blue-500/50 transition-colors"
              style={{ backgroundColor: colors.cardBg, borderColor: colors.border }}
            >
              <p className="text-[10px] uppercase tracking-widest font-bold mb-2 text-blue-500">{stat.label}</p>
              <h3 className="text-3xl md:text-4xl font-black group-hover:translate-x-2 transition-transform" style={{ color: colors.text }}>
                {stat.value}+
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeHeroText;