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
  const cursorRef = useRef(null);
  const magneticButtons = useRef([]);
  const blob1Ref = useRef(null);
  const imageContainerRef = useRef(null);

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
    let ctx = gsap.context(() => {
      // 1. CUSTOM CURSOR (Only for desktop)
      const cursor = cursorRef.current;
      const moveCursor = (e) => {
        gsap.to(cursor, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.5,
          ease: "power3.out"
        });
      };
      window.addEventListener("mousemove", moveCursor);

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

        btn.addEventListener("mousemove", moveBtn);
        btn.addEventListener("mouseleave", resetBtn);
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
      .from(imageContainerRef.current, {
        scale: 0.8,
        opacity: 0,
        duration: 1.5,
        ease: "expo.out"
      }, "-=0.8");

      // 4. FLOATING IMAGE ANIMATION
      gsap.to(imageContainerRef.current, {
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

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`relative min-h-screen w-full flex flex-col justify-center items-center px-4 md:px-12 py-20 overflow-hidden transition-colors duration-700 ${isDark ? 'bg-[#020617]' : 'bg-[#F8FAFC]'}`}
      style={{ cursor: "none" }}
    >
      {/* Custom Cursor */}
      <div 
        ref={cursorRef}
        className="fixed top-0 left-0 w-4 h-4 bg-blue-500 rounded-full pointer-events-none z-[999] mix-blend-difference hidden lg:block"
        style={{ transform: "translate(-50%, -50%)" }}
      />

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
              Full-stack developer crafting immersive digital experiences through clean code and purposeful design.
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

          {/* DEVELOPER PHOTO */}
          <div className="order-1 lg:order-2 flex justify-center items-center">
            <div 
              ref={imageContainerRef}
              className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-[450px] lg:h-[450px]"
            >
              {/* Decorative Frame */}
              <div className="absolute inset-0 border-2 border-blue-500/30 rounded-[3rem] rotate-6 scale-105" />
              
              {/* Image Wrapper */}
              <div className="absolute inset-0 overflow-hidden rounded-[3rem] bg-slate-200 dark:bg-slate-800 shadow-2xl">
               <img 
                src="/ayushphoto.jpg" 
                alt="Developer" 
                className="w-full h-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-700"
                // Added 'object-top' or 'object-[center_20%]' to keep the face in view
              />
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