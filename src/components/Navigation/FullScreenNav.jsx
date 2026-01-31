import React, { useContext, useRef, useEffect, useCallback, useLayoutEffect } from "react";
import { NavbarContext } from "../../context/NavContext";
import { ThemeContext } from "../../context/ThemeContext";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaTimes } from "react-icons/fa";

const menuLinks = [
  { name: "Home", path: "/", tag: "01" },
  { name: "Projects", path: "/projects", tag: "02" },
  { name: "About", path: "/about", tag: "03" },
  { name: "Resume", path: "/resume", tag: "04" },
  { name: "Contact", path: "/contact", tag: "05" },
];

const FullScreenNav = () => {
  // Updated to destructure as an object to match your professional NavContext
  const { navOpen, setNavOpen } = useContext(NavbarContext);
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const navRef = useRef(null);

  // 1. Body Scroll Lock Logic
  useEffect(() => {
    if (navOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [navOpen]);

  // 2. High-End GSAP Animations
  const openAnim = useCallback(() => {
    if (!navRef.current) return;
    gsap.set(navRef.current, { display: "flex" });

    const tl = gsap.timeline();
    
    tl.fromTo(".stair-column", 
      { scaleY: 0 }, 
      { scaleY: 1, stagger: 0.04, ease: "expo.inOut", duration: 0.8 }
    )
    .fromTo(".menu-meta", 
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
      "-=0.3"
    )
    .fromTo(".nav-link-item", 
      { y: 120, rotateX: -70, opacity: 0 },
      { y: 0, rotateX: 0, opacity: 1, stagger: 0.08, ease: "expo.out", duration: 1 },
      "-=0.6"
    )
    .fromTo(".social-btn", 
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.05, ease: "power3.out", duration: 0.5 },
      "-=0.5"
    );
  }, []);

  const closeAnim = useCallback(() => {
    if (!navRef.current) return;
    const tl = gsap.timeline({ 
      onComplete: () => gsap.set(navRef.current, { display: "none" }) 
    });

    tl.to(".nav-link-item", { y: -60, opacity: 0, rotateX: 45, stagger: 0.02, duration: 0.4, ease: "power2.in" })
      .to(".stair-column", { scaleY: 0, transformOrigin: "bottom", stagger: 0.03, ease: "expo.inOut", duration: 0.6 }, "-=0.2");
  }, []);

  useLayoutEffect(() => {
    navOpen ? openAnim() : closeAnim();
  }, [navOpen, openAnim, closeAnim]);

  return (
    <>
      <nav
        ref={navRef}
        className="hidden fixed inset-0 z-[2000] flex-col w-full h-screen overflow-hidden main-perspective"
        aria-hidden={!navOpen}
      >
        {/* Modern Glass Columns Background */}
        <div className="absolute inset-0 flex h-full w-full pointer-events-none" aria-hidden>
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="stair-column w-1/5 h-full origin-top"
              style={{
                backgroundColor: isDark 
                  ? `rgba(8, 8, 8, ${0.92 + i * 0.01})` 
                  : `rgba(252, 252, 252, ${0.96 + i * 0.01})`,
                borderRight: isDark ? "1px solid rgba(255,255,255,0.03)" : "1px solid rgba(0,0,0,0.03)"
              }}
            />
          ))}
        </div>

        {/* Professional Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay grainy-bg" />

        {/* Content Wrapper */}
        <div className="relative z-10 flex flex-col h-full px-6 py-8 lg:px-20 lg:py-12">
          
          {/* Top Bar */}
          <div className="flex justify-between items-center menu-meta">
            <div className={`text-[10px] font-black tracking-[0.4em] uppercase ${isDark ? 'text-white/40' : 'text-black/40'}`}>
              Directory / 2026
            </div>
            <button
              onClick={() => setNavOpen(false)}
              className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-500 hover:rotate-90 ${
                isDark ? 'border-white/10 text-white hover:bg-white hover:text-black' : 'border-black/10 text-black hover:bg-black hover:text-white'
              }`}
            >
              <FaTimes size={18} />
            </button>
          </div>

          {/* Main Content Grid */}
          <div className="flex-1 grid lg:grid-cols-2 items-center w-full">
            
            {/* Links Section */}
            <div className="flex flex-col gap-2 lg:gap-4">
              {menuLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setNavOpen(false)}
                  className="nav-link-item group flex items-center gap-6 focus:outline-none w-fit"
                >
                  <span className="text-xs font-mono text-blue-500 font-bold translate-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    ({link.tag})
                  </span>
                  <span 
                    className={`text-5xl md:text-7xl lg:text-9xl font-black tracking-tighter uppercase transition-all duration-700 group-hover:pl-6 ${
                      isDark ? "text-white group-hover:text-blue-500" : "text-slate-900 group-hover:text-blue-600"
                    }`}
                  >
                    {link.name}
                  </span>
                </Link>
              ))}
            </div>

            {/* Visual Balance Panel (Desktop Only) */}
            <div className="hidden lg:flex flex-col items-end justify-center h-full gap-16 menu-meta">
              <div className="space-y-4 text-right">
                <span className={`text-[10px] font-bold tracking-[0.3em] uppercase opacity-40 ${isDark ? 'text-white' : 'text-black'}`}>Collaborate</span>
                <h4 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>hello@ayush.dev</h4>
              </div>

              <div className="flex flex-wrap justify-end gap-4 max-w-xs">
                {[
                  { Icon: FaGithub, label: "Github" },
                  { Icon: FaLinkedin, label: "LinkedIn" },
                  { Icon: FaTwitter, label: "Twitter" },
                  { Icon: FaEnvelope, label: "Mail" }
                ].map((item, idx) => (
                  <button key={idx} className={`social-btn px-6 py-3 rounded-xl border flex items-center gap-3 transition-all duration-300 hover:-translate-y-1 ${
                    isDark ? 'border-white/10 text-white hover:bg-white/5' : 'border-black/10 text-black hover:bg-black/5'
                  }`}>
                    <item.Icon size={16} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="flex justify-between items-end menu-meta pt-8 border-t border-current opacity-20">
             <div className="text-[9px] font-bold uppercase tracking-[0.2em]">Based in India</div>
             <div className="text-[9px] font-bold uppercase tracking-[0.2em]">Ayush Singh Portfolio © 2026</div>
          </div>
        </div>
      </nav>

      <style jsx>{`
        .main-perspective {
          perspective: 2000px;
        }

        .nav-link-item {
          transform-style: preserve-3d;
          backface-visibility: hidden;
        }

        .grainy-bg {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }

        @media (max-width: 768px) {
          .nav-link-item span:last-child {
            font-size: 3rem;
            line-height: 1;
          }
        }

        .nav-link-item:focus-visible {
           outline: 2px solid #3b82f6;
           outline-offset: 8px;
           border-radius: 4px;
        }
      `}</style>
    </>
  );
};

export default FullScreenNav;