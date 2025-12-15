// src/components/nav/Navbar.jsx
import React, { useContext, useRef, useEffect, useState, useMemo } from "react";
import { NavbarContext, NavbarColorContext } from "../../context/NavContext";
import { ThemeContext } from "../../context/ThemeContext";
import gsap from "gsap";
import { FaSun, FaMoon, FaDownload, FaTimes } from "react-icons/fa";

/**
 * Top navigation bar
 * - accessible controls (aria labels, keyboard)
 * - theme toggle with persistent state delegated to ThemeContext
 * - download resume with progressive UX + toast
 */

const Navbar = () => {
  const [navOpen, setNavOpen] = useContext(NavbarContext);
  const [navColor] = useContext(NavbarColorContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const navRef = useRef(null);
  const burgerRef = useRef(null);

  const [toast, setToast] = useState({ message: "", visible: false });

  // local derived state
  const isDarkMode = useMemo(() => theme === "dark", [theme]);

  // Entry animation
  useEffect(() => {
    if (!navRef.current) return;
    gsap.fromTo(
      navRef.current,
      { y: -40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
    );
  }, []);

  // Burger animation based on navOpen and theme
  useEffect(() => {
    const el = burgerRef.current;
    if (!el) return;
    const [line1, line2, line3] = Array.from(el.children);
    const color = isDarkMode ? "#F8F8F8" : "#1F2937";

    if (navOpen) {
      gsap.to(line1, { rotate: 45, y: 6, backgroundColor: color, duration: 0.28 });
      gsap.to(line2, { opacity: 0, duration: 0.22 });
      gsap.to(line3, { rotate: -45, y: -6, backgroundColor: color, duration: 0.28 });
    } else {
      gsap.to(line1, { rotate: 0, y: 0, backgroundColor: color, duration: 0.28 });
      gsap.to(line2, { opacity: 1, duration: 0.22 });
      gsap.to(line3, { rotate: 0, y: 0, backgroundColor: color, duration: 0.28 });
    }
  }, [navOpen, isDarkMode]);

  // handle theme toggle
  const handleThemeToggle = () => {
    toggleTheme();
    // small animation to theme circle
    gsap.fromTo(
      ".theme-circle",
      { x: isDarkMode ? 0 : 20, rotate: 0, scale: 0.92 },
      { x: isDarkMode ? 20 : 0, rotate: 360, scale: 1, duration: 0.45, ease: "elastic.out(1, 0.5)" }
    );
  };

  // Download resume with accessible fallback
  const handleDownloadResume = async () => {
    // Try to fetch HEAD to ensure file exists (graceful fallback) - optional, skip to avoid CORS issues
    // Create anchor and click (works for static hosting)
    const link = document.createElement("a");
    link.href = "/Ayush_Resume_2025.pdf";
    link.download = "Ayush_Singh_Resume_2025.pdf";
    link.rel = "noopener";
    document.body.appendChild(link);
    link.click();
    link.remove();

    setToast({ message: "Resume download started", visible: true });
    setTimeout(() => setToast({ message: "", visible: false }), 3500);
  };

  return (
    <>
      <nav
        ref={navRef}
        className="sticky top-0 left-0 w-full z-50 flex items-center justify-between px-4 sm:px-6 py-4 backdrop-blur-md bg-opacity-95 transition-all duration-500"
        style={{
          backgroundColor: navColor,
        }}
        role="navigation"
        aria-label="Top navigation"
      >
        {/* Brand */}
        <div
          className="text-2xl sm:text-2xl lg:text-3xl font-bold tracking-wide truncate"
          style={{ color: isDarkMode ? "#F8F8F8" : "#1F2937" }}
        >
          <span className="sm:hidden">Ayush</span>
          <span className="hidden sm:inline">Ayush Singh</span>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Download Resume */}
          <button
            onClick={handleDownloadResume}
            className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-2 border-2 rounded-full font-semibold text-xs sm:text-sm hover:scale-105 transition-transform duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
            style={{
              backgroundColor: isDarkMode ? "#f59e0b" : "#2563eb",
              color: isDarkMode ? "#000" : "#fff",
              borderColor: isDarkMode ? "#f59e0b" : "#2563eb",
            }}
            aria-label="Download resume"
          >
            <FaDownload className="text-sm sm:text-base" aria-hidden />
            <span className="truncate">Resume</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={handleThemeToggle}
            className="relative w-10 sm:w-12 h-5 sm:h-6 flex items-center rounded-full p-1 cursor-pointer transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-1"
            aria-pressed={isDarkMode}
            aria-label={`Switch to ${isDarkMode ? "light" : "dark"} theme`}
            style={{ backgroundColor: isDarkMode ? "#333" : "#E2E8F0" }}
          >
            <div
              className="theme-circle w-4 sm:w-5 h-4 sm:h-5 bg-white rounded-full shadow-md flex items-center justify-center transition-all duration-300"
              style={{
                transform: isDarkMode ? "translateX(16px)" : "translateX(0)",
              }}
            >
              {isDarkMode ? <FaMoon className="text-xs sm:text-sm" /> : <FaSun className="text-xs sm:text-sm" />}
            </div>
          </button>

          {/* Burger Menu */}
          <button
            ref={burgerRef}
            onClick={() => setNavOpen((s) => !s)}
            className="relative w-8 sm:w-10 h-6 sm:h-8 flex flex-col justify-center items-center gap-1 sm:gap-1.5 cursor-pointer transition-transform focus:outline-none focus:ring-2 focus:ring-offset-1"
            aria-expanded={navOpen}
            aria-controls="full-screen-nav"
            aria-label={navOpen ? "Close navigation" : "Open navigation"}
          >
            <span className="block w-5 sm:w-6 h-0.5 rounded transition-all" style={{ backgroundColor: isDarkMode ? "#F8F8F8" : "#1F2937" }} />
            <span className="block w-4 sm:w-5 h-0.5 rounded transition-all" style={{ backgroundColor: isDarkMode ? "#F8F8F8" : "#1F2937" }} />
            <span className="block w-5 sm:w-6 h-0.5 rounded transition-all" style={{ backgroundColor: isDarkMode ? "#F8F8F8" : "#1F2937" }} />
          </button>
        </div>
      </nav>

      {/* Toast */}
      {toast.visible && (
        <div
          className="fixed bottom-5 right-5 bg-blue-600 text-white px-4 py-3 rounded-md shadow-lg flex items-center gap-3 z-50 animate-slide-in"
          role="status"
          aria-live="polite"
        >
          <span>{toast.message}</span>
          <button onClick={() => setToast({ ...toast, visible: false })} className="text-white hover:text-gray-200 transition-colors" aria-label="Dismiss notification">
            <FaTimes />
          </button>
        </div>
      )}

      {/* Small inline styles for toast animation */}
      <style jsx>{`
        .animate-slide-in {
          animation: slideIn 0.45s ease forwards;
        }
        @keyframes slideIn {
          0% {
            transform: translateY(40px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
        /* Utility: prefers-reduced-motion */
        @media (prefers-reduced-motion: reduce) {
          .animate-slide-in,
          .theme-circle,
          .navlink,
          .stair {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;
