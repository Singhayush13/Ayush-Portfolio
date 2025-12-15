// src/components/nav/FullScreenNav.jsx
import React, {
  useContext,
  useRef,
  useEffect,
  useCallback,
  useLayoutEffect,
} from "react";
import { NavbarContext } from "../../context/NavContext";
import { ThemeContext } from "../../context/ThemeContext";
import { Link } from "react-router-dom";
import gsap from "gsap";

/**
 * Full-screen navigation overlay
 * - accessible: ESC to close, focus trap, close button labelled
 * - animations useLayoutEffect for smoother startup
 * - body scroll is locked while open
 */

const menuLinks = [
  { name: "Home", path: "/" },
  { name: "Projects", path: "/projects" },
  { name: "About", path: "/about" },
  { name: "Resume", path: "/resume" },
  { name: "Contact", path: "/contact" },
];

const FullScreenNav = () => {
  const [navOpen, setNavOpen] = useContext(NavbarContext);
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const navRef = useRef(null);
  const closeBtnRef = useRef(null);
  const firstFocusableRef = useRef(null);
  const lastFocusableRef = useRef(null);

  // Prevent body scroll while nav is open
  useEffect(() => {
    if (navOpen) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [navOpen]);

  // Accessibility: close on ESC and manage focus trap (simple)
  useEffect(() => {
    const handleKey = (e) => {
      if (!navOpen) return;
      if (e.key === "Escape") {
        setNavOpen(false);
      } else if (e.key === "Tab") {
        // focus trap: keep focus inside navRef
        const focusable = navRef.current?.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable || focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [navOpen, setNavOpen]);

  // GSAP open animation
  const openAnim = useCallback(() => {
    if (!navRef.current) return;
    gsap.set(navRef.current, { display: "flex" });

    // Respect reduced motion
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      gsap.set(".stair", { scaleY: 1 });
      gsap.set(".navlink span", { opacity: 1, y: 0, rotateX: 0 });
      gsap.set(".menu-gradient", { opacity: isDark ? 0.25 : 0.15 });
      closeBtnRef.current?.querySelectorAll("span").forEach((s) => gsap.set(s, { scaleX: 1 }));
      // focus first link
      const firstLink = navRef.current.querySelector("a");
      firstLink?.focus();
      return;
    }

    const tl = gsap.timeline();
    tl.fromTo(
      ".stair",
      { scaleY: 0 },
      {
        scaleY: 1,
        transformOrigin: "top",
        stagger: 0.07,
        ease: "power4.inOut",
        duration: 0.5,
      }
    )
      .fromTo(
        ".navlink span",
        { y: 80, opacity: 0, rotateX: 90 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          stagger: 0.06,
          ease: "back.out(1.4)",
          duration: 0.6,
        },
        "-=0.35"
      )
      .fromTo(
        ".menu-gradient",
        { opacity: 0 },
        { opacity: isDark ? 0.25 : 0.15, duration: 1.0, ease: "power2.out" },
        "-=0.5"
      );

    const bars = closeBtnRef.current?.querySelectorAll("span");
    if (bars && bars.length) {
      gsap.fromTo(bars, { scaleX: 0 }, { scaleX: 1, stagger: 0.08, duration: 0.28, ease: "power3.out" });
    }

    // focus first link when animation completes
    tl.call(() => {
      const firstLink = navRef.current.querySelector("a");
      firstLink?.focus();
    });
  }, [isDark]);

  // GSAP close animation
  const closeAnim = useCallback(() => {
    if (!navRef.current) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      gsap.set(".navlink span", { opacity: 0, y: 40 });
      gsap.set(".stair", { scaleY: 0 });
      gsap.set(navRef.current, { display: "none" });
      return;
    }

    const tl = gsap.timeline();
    tl.to(".navlink span", {
      y: 40,
      opacity: 0,
      stagger: 0.05,
      ease: "power2.in",
      duration: 0.28,
    })
      .to(
        ".stair",
        {
          scaleY: 0,
          transformOrigin: "bottom",
          stagger: 0.06,
          ease: "power4.inOut",
          duration: 0.4,
        },
        "-=0.12"
      )
      .set(navRef.current, { display: "none" });
  }, []);

  // Use layout effect for animation triggers (prevents jank)
  useLayoutEffect(() => {
    navOpen ? openAnim() : closeAnim();
  }, [navOpen, openAnim, closeAnim]);

  return (
    <nav
      ref={navRef}
      className="hidden fixed inset-0 z-50 flex-col w-full h-screen overflow-hidden"
      aria-hidden={!navOpen}
      aria-label="Main navigation"
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
      <div className="absolute inset-0 flex h-full w-full" aria-hidden>
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="stair w-1/5 h-full scale-y-0 origin-top backdrop-blur-sm"
            style={{
              backgroundColor: isDark ? "rgba(78,158,255,0.05)" : "rgba(78,158,255,0.08)",
            }}
          />
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
        aria-hidden
      />

      {/* Menu content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Top bar */}
        <div className="flex justify-between items-center p-6 lg:p-12">
          <div
            className="text-2xl lg:text-3xl font-bold tracking-wide"
            style={{ color: isDark ? "#ffffff" : "#1f2937" }}
          >
            Ayush Singh
          </div>
          <button
            ref={closeBtnRef}
            onClick={() => setNavOpen(false)}
            aria-label="Close navigation"
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
              key={link.path}
              to={link.path}
              onClick={() => setNavOpen(false)}
              className="navlink text-4xl lg:text-6xl font-[font2] uppercase tracking-wide relative group focus:outline-none"
              style={{ color: isDark ? "#ffffff" : "#1f2937" }}
            >
              <span className="relative inline-block transition-all duration-300 group-hover:text-blue-500 group-hover:scale-105">
                {link.name}
              </span>
              <span
                className="absolute left-0 -bottom-2 h-[3px] w-0 rounded-full transition-all duration-300 group-hover:w-full"
                style={{ backgroundColor: isDark ? "#3b82f6" : "#2563eb" }}
                aria-hidden
              />
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default FullScreenNav;
