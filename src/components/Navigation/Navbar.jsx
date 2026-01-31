import React, { useContext, useRef, useEffect, useState, useMemo } from "react";
import { NavbarContext, NavbarColorContext } from "../../context/NavContext";
import { ThemeContext } from "../../context/ThemeContext";
import gsap from "gsap";
import { FaSun, FaMoon, FaDownload } from "react-icons/fa";

const Navbar = () => {
  // Updated to destructure from named objects as per your professional NavContext
  const { navOpen, setNavOpen } = useContext(NavbarContext);
  const { navColor } = useContext(NavbarColorContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const navRef = useRef(null);
  const burgerRef = useRef(null);
  const innerNavRef = useRef(null);

  const [toast, setToast] = useState({ message: "", visible: false });
  const isDarkMode = useMemo(() => theme === "dark", [theme]);

  // 1. Robust Scroll Interaction & Visibility Fix
  useEffect(() => {
    const handleScroll = () => {
      if (!innerNavRef.current) return;
      const isScrolled = window.scrollY > 20;

      gsap.to(innerNavRef.current, {
        padding: isScrolled ? "0.6rem 1.5rem" : "1.2rem 2.5rem",
        borderRadius: isScrolled ? "100px" : "0px",
        width: isScrolled ? "92%" : "100%",
        marginTop: isScrolled ? "15px" : "0px",
        backgroundColor: isScrolled 
          ? (isDarkMode ? "rgba(10, 10, 10, 0.8)" : "rgba(255, 255, 255, 0.8)") 
          : (isDarkMode ? "rgba(5, 5, 5, 1)" : "rgba(248, 250, 252, 1)"),
        boxShadow: isScrolled 
          ? "0 10px 30px -10px rgba(0,0,0,0.3)" 
          : "0 0 0 rgba(0,0,0,0)",
        duration: 0.5,
        ease: "expo.out",
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDarkMode]);

  // 2. Fail-Safe Entrance Animation
  useEffect(() => {
    gsap.set(navRef.current, { opacity: 1, visibility: "visible" });
    gsap.fromTo(navRef.current, 
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "expo.out", delay: 0.1 }
    );
  }, []);

  // 3. Burger Icon Micro-interactions
  useEffect(() => {
    const el = burgerRef.current;
    if (!el) return;
    const [line1, line2, line3] = Array.from(el.children);
    const color = isDarkMode ? "#F8F8F8" : "#0F172A";

    if (navOpen) {
      gsap.to(line1, { rotate: 45, y: 7, backgroundColor: "#3b82f6", duration: 0.4 });
      gsap.to(line2, { scaleX: 0, opacity: 0, duration: 0.2 });
      gsap.to(line3, { rotate: -45, y: -7, backgroundColor: "#3b82f6", duration: 0.4 });
    } else {
      gsap.to([line1, line3], { rotate: 0, y: 0, backgroundColor: color, duration: 0.4 });
      gsap.to(line2, { scaleX: 1, opacity: 1, duration: 0.3 });
    }
  }, [navOpen, isDarkMode]);

  const handleThemeToggle = () => {
    toggleTheme();
    gsap.fromTo(".theme-icon-container", 
      { rotate: -90, scale: 0.8 },
      { rotate: 0, scale: 1, duration: 0.6, ease: "elastic.out(1, 0.75)" }
    );
  };

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

  return (
    <>
      <header
        ref={navRef}
        className="fixed top-0 left-0 w-full z-[999] flex justify-center pointer-events-none"
      >
        <nav
          ref={innerNavRef}
          className="flex items-center justify-between px-10 py-5 w-full backdrop-blur-xl border-b pointer-events-auto transition-all duration-500"
          style={{
            borderColor: isDarkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
          }}
        >
          {/* LOGO AREA */}
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="relative w-9 h-9 flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 shadow-lg group-hover:scale-110 transition-transform duration-500">
              <span className="text-white font-black text-lg z-10">A</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </div>
            <div className="flex flex-col leading-none">
              <span className={`text-lg font-black tracking-tighter uppercase ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                Ayush <span className="text-blue-500">Singh</span>
              </span>
              <span className="text-[10px] font-bold tracking-[0.2em] text-blue-500/80 uppercase">Portfolio 2026</span>
            </div>
          </div>

          {/* UTILITY SECTION */}
          <div className="flex items-center gap-4 sm:gap-8">
            <button
              onClick={handleDownloadResume}
              className="hidden md:flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-xs tracking-widest uppercase relative overflow-hidden group transition-all duration-300 shadow-md"
              style={{
                backgroundColor: isDarkMode ? "#FFF" : "#0F172A",
                color: isDarkMode ? "#000" : "#FFF"
              }}
            >
              <div className="absolute inset-0 w-full h-full bg-blue-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <FaDownload className="relative z-10 text-[10px]" />
              <span className="relative z-10">Get Resume</span>
            </button>

            <div className="flex items-center gap-3">
               <button
                onClick={handleThemeToggle}
                className={`theme-icon-container p-2 rounded-xl border transition-all duration-300 ${
                  isDarkMode ? 'bg-white/5 border-white/10 text-yellow-400' : 'bg-black/5 border-black/10 text-blue-600'
                }`}
              >
                {isDarkMode ? <FaMoon size={18} /> : <FaSun size={18} />}
              </button>

              <button
                ref={burgerRef}
                onClick={() => setNavOpen(!navOpen)}
                className="flex flex-col gap-1.5 cursor-pointer p-2 hover:opacity-70 transition-opacity"
              >
                <span className="w-7 h-0.5 rounded-full" style={{ backgroundColor: isDarkMode ? "#FFF" : "#0F172A" }} />
                <span className="w-5 h-0.5 rounded-full self-end" style={{ backgroundColor: isDarkMode ? "#FFF" : "#0F172A" }} />
                <span className="w-7 h-0.5 rounded-full" style={{ backgroundColor: isDarkMode ? "#FFF" : "#0F172A" }} />
              </button>
            </div>
          </div>
        </nav>
      </header>

      {toast.visible && (
        <div className="fixed top-24 right-6 z-[1000] bg-blue-600 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-right-10 duration-500">
           <div className="bg-white/20 p-1.5 rounded-lg">
              <FaDownload size={12} />
           </div>
           <span className="font-bold text-xs tracking-wider uppercase">{toast.message}</span>
        </div>
      )}

      <div className="h-[80px] w-full" />
    </>
  );
};

export default Navbar;