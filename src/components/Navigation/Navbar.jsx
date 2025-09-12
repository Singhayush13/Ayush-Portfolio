import React, { useContext, useEffect, useRef, useState } from "react";
import { NavbarContext, NavbarColorContext } from "../../context/NavContext";
import { ThemeContext } from "../../context/ThemeContext";
import gsap from "gsap";
import { FaSun, FaMoon, FaDownload, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [navOpen, setNavOpen] = useContext(NavbarContext);
  const [navColor] = useContext(NavbarColorContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const navRef = useRef(null);
  const burgerRef = useRef(null);
  const [isDarkMode, setIsDarkMode] = useState(theme === "dark");

  const darkText = "#F8F8F8";
  const lightText = "#1F2937";

  // Toast state
  const [toast, setToast] = useState({ message: "", visible: false });

  // Navbar entry animation
  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );
  }, []);

  // Burger animation
  useEffect(() => {
    if (!burgerRef.current) return;
    const [line1, line2, line3] = burgerRef.current.children;
    const defaultColor = isDarkMode ? darkText : lightText;

    if (navOpen) {
      gsap.to(line1, { rotate: 45, y: 6, backgroundColor: defaultColor, duration: 0.3 });
      gsap.to(line2, { opacity: 0, duration: 0.3 });
      gsap.to(line3, { rotate: -45, y: -6, backgroundColor: defaultColor, duration: 0.3 });
    } else {
      gsap.to(line1, { rotate: 0, y: 0, backgroundColor: defaultColor, duration: 0.3 });
      gsap.to(line2, { opacity: 1, duration: 0.3 });
      gsap.to(line3, { rotate: 0, y: 0, backgroundColor: defaultColor, duration: 0.3 });
    }
  }, [navOpen, isDarkMode]);

  // Theme toggle
  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
    toggleTheme();
    gsap.fromTo(
      ".theme-circle",
      { x: isDarkMode ? 0 : 20, rotate: 0, scale: 0.9 },
      { x: isDarkMode ? 20 : 0, rotate: 360, scale: 1, duration: 0.5, ease: "elastic.out(1, 0.5)" }
    );
  };

  // Resume download
  const handleDownloadResume = () => {
    const link = document.createElement("a");
    link.href = "/Ayush_Resume_2025.pdf";
    link.download = "Ayush_Resume_2025.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Show toast
    setToast({ message: "Resume downloaded successfully!", visible: true });
    setTimeout(() => setToast({ message: "", visible: false }), 4000); // auto hide after 4s
  };

  const textColor = isDarkMode ? darkText : lightText;
  const burgerColor = textColor;

  return (
    <>
      <nav
        ref={navRef}
        className={`sticky top-0 left-0 w-full z-50 flex items-center justify-between px-4 sm:px-6 py-4 backdrop-blur-md bg-opacity-95 transition-all duration-500`}
        style={{ backgroundColor: navColor }}
      >
        {/* Brand */}
        <div
          className="text-2xl sm:text-2xl lg:text-3xl font-bold tracking-wide transition-colors duration-300 truncate"
          style={{ color: textColor }}
        >
          <span className="sm:hidden">Ayush</span>
          <span className="hidden sm:inline">Ayush Singh</span>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Download Resume */}
          <button
            onClick={handleDownloadResume}
            className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-2 border-2 rounded-full font-semibold text-xs sm:text-sm hover:scale-105 transition-transform duration-300 shadow-md"
            style={{
              backgroundColor: isDarkMode ? "#f59e0b" : "#2563eb",
              color: isDarkMode ? "#000" : "#fff",
              borderColor: isDarkMode ? "#f59e0b" : "#2563eb",
            }}
          >
            <FaDownload className="text-sm sm:text-base" />
            <span className="truncate">Resume</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={handleThemeToggle}
            className="relative w-10 sm:w-12 h-5 sm:h-6 flex items-center rounded-full p-1 cursor-pointer transition-all duration-500"
            style={{ backgroundColor: isDarkMode ? "#333" : "#E2E8F0" }}
          >
            <div
              className="theme-circle w-4 sm:w-5 h-4 sm:h-5 bg-white rounded-full shadow-md flex items-center justify-center transition-all duration-500"
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
            onClick={() => setNavOpen(!navOpen)}
            className="relative w-8 sm:w-10 h-6 sm:h-8 flex flex-col justify-center items-center gap-1 sm:gap-1.5 cursor-pointer transition-transform"
            aria-label="Open navigation menu"
          >
            <span
              className="block w-5 sm:w-6 h-0.5 rounded transition-all"
              style={{ backgroundColor: burgerColor }}
            ></span>
            <span
              className="block w-4 sm:w-5 h-0.5 rounded transition-all"
              style={{ backgroundColor: burgerColor }}
            ></span>
            <span
              className="block w-5 sm:w-6 h-0.5 rounded transition-all"
              style={{ backgroundColor: burgerColor }}
            ></span>
          </button>
        </div>
      </nav>

      {/* Toast Notification */}
      {toast.visible && (
        <div className="fixed bottom-5 right-5 bg-blue-600 text-white px-4 py-3 rounded-md shadow-lg flex items-center gap-3 z-50 animate-slide-in">
          <span>{toast.message}</span>
          <button
            onClick={() => setToast({ ...toast, visible: false })}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <FaTimes />
          </button>
        </div>
      )}

      {/* Toast animation */}
      <style jsx>{`
        .animate-slide-in {
          animation: slideIn 0.5s ease forwards;
        }
        @keyframes slideIn {
          0% {
            transform: translateY(50px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;
