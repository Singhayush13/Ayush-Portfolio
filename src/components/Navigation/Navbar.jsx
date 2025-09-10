import React, { useContext, useEffect, useRef, useState } from "react";
import { NavbarContext, NavbarColorContext } from "../../context/NavContext";
import { ThemeContext } from "../../context/ThemeContext";
import gsap from "gsap";
import { FaSun, FaMoon } from "react-icons/fa";

const Navbar = () => {
  const [navOpen, setNavOpen] = useContext(NavbarContext);
  const [navColor] = useContext(NavbarColorContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const navRef = useRef(null);
  const burgerRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(theme === "dark");

  const darkText = "#F8F8F8";
  const lightText = "#1F2937";

  // Navbar animation & scroll
  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );

    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
      { x: isDarkMode ? 0 : 28, rotate: 0, scale: 0.9 },
      { x: isDarkMode ? 28 : 0, rotate: 360, scale: 1, duration: 0.5, ease: "elastic.out(1, 0.5)" }
    );
  };

  const textColor = isDarkMode ? darkText : lightText;
  const burgerColor = textColor;

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-4 transition-all duration-500`}
      style={{ backgroundColor: navColor }}
    >
      {/* Brand */}
      <div
        className="text-2xl lg:text-3xl font-bold tracking-wide transition-colors duration-300"
        style={{ color: textColor }}
      >
        Ayush Singh
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-4">
        {/* Theme Toggle */}
        <button
          onClick={handleThemeToggle}
          className="relative w-16 h-8 flex items-center rounded-full p-1 cursor-pointer transition-all duration-500"
          style={{ backgroundColor: isDarkMode ? "#333" : "#E2E8F0" }}
        >
          <div
            className="theme-circle w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center transition-all duration-500"
            style={{
              transform: isDarkMode ? "translateX(28px)" : "translateX(0)",
            }}
          >
            {isDarkMode ? <FaMoon className="text-[#1C1C1C]" /> : <FaSun className="text-[#1F2937]" />}
          </div>
        </button>

        {/* Burger Menu */}
        <button
          ref={burgerRef}
          onClick={() => setNavOpen(!navOpen)}
          className="relative w-12 h-10 lg:w-16 lg:h-14 flex flex-col justify-center items-center gap-2 cursor-pointer transition-transform"
          aria-label="Open navigation menu"
        >
          <span
            className="block w-8 h-0.5 rounded transition-all"
            style={{ backgroundColor: burgerColor }}
          ></span>
          <span
            className="block w-6 h-0.5 rounded transition-all"
            style={{ backgroundColor: burgerColor }}
          ></span>
          <span
            className="block w-8 h-0.5 rounded transition-all"
            style={{ backgroundColor: burgerColor }}
          ></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
