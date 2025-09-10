import React, { useEffect, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ThemeContext } from "../../context/ThemeContext";

gsap.registerPlugin(ScrollTrigger);

const HomeBottomText = () => {
  const bottomRef = useRef(null);
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  // Theme-based colors
  const colors = {
    dark: {
      bgGradient: "linear-gradient(to right, #101010, #0a0a0a)",
      border: "#2c2c2c",
      text: "#cfcfcf",
      accent1: "#f59e0b", // amber for dark mode
      accent2: "#fbbf24", // lighter amber
      buttonBg: "transparent",
      buttonBorder: "#f59e0b",
      buttonText: "#f59e0b",
      glowTop: "rgba(245,158,11,0.15)",
      glowBottom: "rgba(251,191,36,0.1)",
    },
    light: {
      bgGradient: "linear-gradient(to right, #f9fafb, #e6eef9)",
      border: "#d1d5db",
      text: "#1f2937",
      accent1: "#2563eb", // professional blue for light mode
      accent2: "#3b82f6",
      buttonBg: "#e0efff",
      buttonBorder: "#2563eb",
      buttonText: "#2563eb",
      glowTop: "rgba(78,158,255,0.15)",
      glowBottom: "rgba(0,123,255,0.1)",
    },
  };

  const themeColors = isDark ? colors.dark : colors.light;

  // GSAP scroll animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: bottomRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        defaults: { ease: "power3.out", duration: 1 },
      });

      tl.fromTo(".tagline", { y: 60, opacity: 0 }, { y: 0, opacity: 1 });
      tl.fromTo(
        ".btn-link",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.2 },
        "-=0.4"
      );
    }, bottomRef);

    return () => ctx.revert();
  }, []);

  // Button hover parallax
  useEffect(() => {
    const buttons = bottomRef.current.querySelectorAll(".btn-link");

    buttons.forEach((btn) => {
      btn.addEventListener("mousemove", (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        gsap.to(btn, {
          x: (x - rect.width / 2) * 0.08,
          y: (y - rect.height / 2) * 0.08,
          scale: 1.05,
          duration: 0.3,
        });
      });

      btn.addEventListener("mouseleave", () => {
        gsap.to(btn, { x: 0, y: 0, scale: 1, duration: 0.3 });
      });
    });
  }, []);

  return (
    <section
      ref={bottomRef}
      className="relative font-[font2] flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-0 px-6 py-24 rounded-3xl border shadow-2xl overflow-hidden mt-20 scroll-smooth"
      style={{
        background: themeColors.bgGradient,
        borderColor: themeColors.border,
      }}
    >
      {/* Accent Glow */}
      <div
        className="absolute top-0 left-0 w-96 h-96 blur-[150px] -z-10"
        style={{
          backgroundColor: themeColors.glowTop,
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-72 h-72 blur-[150px] -z-10"
        style={{
          backgroundColor: themeColors.glowBottom,
        }}
      />

      {/* Tagline */}
      <p
        className="tagline lg:w-[45%] w-full font-[font1] text-lg sm:text-xl lg:text-2xl leading-relaxed text-center lg:text-left"
        style={{ color: themeColors.text }}
      >
        🚀 Turning{" "}
        <span style={{ color: themeColors.accent1, fontWeight: 600 }}>ideas</span> into{" "}
        <span style={{ color: themeColors.accent2, fontWeight: 600 }}>impactful solutions</span> with code
        that is clean, maintainable, and designed for scalability.
      </p>

      {/* Buttons */}
      <div className="btn-group flex flex-col sm:flex-row gap-6 lg:gap-10 mt-8 lg:mt-0">
        <Link
          to="/resume"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="btn-link h-20 sm:h-24 w-48 sm:w-60 flex items-center justify-center border-2 rounded-full uppercase font-semibold text-lg sm:text-xl lg:text-2xl tracking-wide transition-all duration-300"
          style={{
            borderColor: themeColors.buttonBorder,
            color: themeColors.buttonText,
            backgroundColor: themeColors.buttonBg,
          }}
        >
          View Resume
        </Link>

        <Link
          to="/contact"
          className="btn-link h-20 sm:h-24 w-48 sm:w-60 flex items-center justify-center border-2 rounded-full uppercase font-semibold text-lg sm:text-xl lg:text-2xl tracking-wide transition-all duration-300"
          style={{
            borderColor: themeColors.buttonBorder,
            color: themeColors.buttonText,
            backgroundColor: isDark ? "transparent" : "#dbeafe",
          }}
        >
          Hire Me
        </Link>
      </div>
    </section>
  );
};

export default HomeBottomText;
