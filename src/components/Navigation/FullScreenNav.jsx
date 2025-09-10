import React, { useContext, useRef, useEffect } from "react";
import { NavbarContext } from "../../context/NavContext";
import { ThemeContext } from "../../context/ThemeContext";
import { Link } from "react-router-dom";
import gsap from "gsap";

const FullScreenNav = () => {
  const [navOpen, setNavOpen] = useContext(NavbarContext);
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const navRef = useRef(null);
  const closeBtnRef = useRef(null);

  const menuLinks = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "About", path: "/about" },
    { name: "Resume", path: "/resume" },
    { name: "Contact", path: "/contact" },
  ];

  const openAnim = () => {
    gsap.set(navRef.current, { display: "flex" });
    const tl = gsap.timeline();

    tl.fromTo(
      ".stair",
      { scaleY: 0 },
      {
        scaleY: 1,
        transformOrigin: "top",
        stagger: 0.08,
        ease: "power4.inOut",
      }
    )
      .fromTo(
        ".navlink span",
        { y: 80, opacity: 0, rotateX: 90 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          stagger: 0.07,
          ease: "back.out(1.7)",
          duration: 0.6,
        },
        "-=0.3"
      )
      .fromTo(
        ".menu-gradient",
        { opacity: 0 },
        { opacity: isDark ? 0.25 : 0.15, duration: 1.2, ease: "power2.out" },
        "-=0.6"
      );

    const bars = closeBtnRef.current.querySelectorAll("span");
    gsap.fromTo(
      bars,
      { scaleX: 0 },
      { scaleX: 1, stagger: 0.1, duration: 0.3, ease: "power3.out" }
    );
  };

  const closeAnim = () => {
    const tl = gsap.timeline();
    tl.to(".navlink span", {
      y: 40,
      opacity: 0,
      stagger: 0.05,
      ease: "power2.in",
      duration: 0.3,
    }).to(".stair", {
      scaleY: 0,
      transformOrigin: "bottom",
      stagger: 0.07,
      ease: "power4.inOut",
    }).set(navRef.current, { display: "none" });
  };

  useEffect(() => {
    navOpen ? openAnim() : closeAnim();
  }, [navOpen]);

  return (
    <div
      ref={navRef}
      className="hidden fixed inset-0 z-50 flex-col w-full h-screen overflow-hidden"
      style={{
        color: isDark ? "#ffffff" : "#1f2937",
      }}
    >
      {/* Background */}
      <div
        className="absolute inset-0 animate-gradient-slow backdrop-blur-2xl"
        style={{
          background: isDark
            ? "linear-gradient(to bottom right, #101010, #0a0a0a)"
            : "linear-gradient(to bottom right, #f9fafb, #e6eef9)",
        }}
      />

      {/* Animated stripes */}
      <div className="absolute inset-0 flex h-full w-full">
        {Array(5)
          .fill("")
          .map((_, i) => (
            <div
              key={i}
              className="stair w-1/5 h-full scale-y-0 origin-top backdrop-blur-sm"
              style={{
                backgroundColor: isDark ? "rgba(78,158,255,0.05)" : "rgba(78,158,255,0.08)",
              }}
            ></div>
          ))}
      </div>

      {/* Glow overlay */}
      <div
        className="menu-gradient absolute inset-0"
        style={{
          background: isDark
            ? "linear-gradient(to bottom right, rgba(78,158,255,0.2), rgba(59,130,246,0.1))"
            : "linear-gradient(to bottom right, rgba(59,130,246,0.15), rgba(37,99,235,0.1))",
          opacity: 0,
        }}
      ></div>

      {/* Menu content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Top bar */}
        <div className="flex justify-between items-center p-6 lg:p-12">
          <div
            className="text-2xl lg:text-3xl font-bold tracking-wide transition-colors duration-300 hover:text-blue-500"
            style={{ color: isDark ? "#ffffff" : "#1f2937" }}
          >
            Ayush Singh
          </div>
          <button
            ref={closeBtnRef}
            onClick={() => setNavOpen(false)}
            className="relative w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center group"
          >
            <span
              className="absolute w-6 h-0.5 rotate-45 origin-center transition-all duration-300"
              style={{ backgroundColor: isDark ? "#3b82f6" : "#2563eb" }}
            />
            <span
              className="absolute w-6 h-0.5 -rotate-45 origin-center transition-all duration-300"
              style={{ backgroundColor: isDark ? "#3b82f6" : "#2563eb" }}
            />
          </button>
        </div>

        {/* Menu links */}
        <div className="flex-1 flex flex-col justify-center items-center gap-10 lg:gap-14">
          {menuLinks.map((link, i) => (
            <Link
              key={i}
              to={link.path}
              onClick={() => setNavOpen(false)}
              className="navlink text-4xl lg:text-6xl font-[font2] uppercase tracking-wide relative group"
              style={{ color: isDark ? "#ffffff" : "#1f2937" }}
            >
              <span className="relative inline-block transition-all duration-300 group-hover:text-blue-500 group-hover:scale-105">
                {link.name}
              </span>
              <span
                className="absolute left-0 -bottom-2 h-[3px] w-0 rounded-full transition-all duration-300 group-hover:w-full"
                style={{ backgroundColor: isDark ? "#3b82f6" : "#2563eb" }}
              ></span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FullScreenNav;
