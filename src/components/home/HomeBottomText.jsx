import React, { useEffect, useRef, useContext, useMemo } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ThemeContext } from "../../context/ThemeContext";

gsap.registerPlugin(ScrollTrigger);

const HomeBottomText = () => {
  const sectionRef = useRef(null);
  const buttonsRef = useRef([]);
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const isTouch =
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: coarse)").matches;

  /* ---------------- COLORS ---------------- */
  const colors = useMemo(() => {
    if (isDark) {
      return {
        bg: "linear-gradient(135deg,#0b0b0b,#111827)",
        border: "#1f2937",
        text: "#d1d5db",
        primary: "#f59e0b",
        secondary: "#fbbf24",
        ripple: "rgba(245,158,11,.25)",
        footer: "#9ca3af",
      };
    }
    return {
      bg: "linear-gradient(135deg,#f8fafc,#eef2ff)",
      border: "#cbd5e1",
      text: "#1f2937",
      primary: "#2563eb",
      secondary: "#3b82f6",
      ripple: "rgba(37,99,235,.25)",
      footer: "#64748b",
    };
  }, [isDark]);

  /* ---------------- SCROLL ANIMATION ---------------- */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".bottom-reveal", {
        y: 40,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  /* ---------------- PROFESSIONAL MAGNETIC EFFECT ---------------- */
  useEffect(() => {
    if (isTouch) return; // 🚫 disable on mobile

    buttonsRef.current.forEach((btn) => {
      if (!btn) return;

      const content = btn.querySelector(".btn-content");

      const move = (e) => {
        const rect = btn.getBoundingClientRect();
        const relX = e.clientX - rect.left - rect.width / 2;
        const relY = e.clientY - rect.top - rect.height / 2;

        gsap.to(content, {
          x: relX * 0.35, // ✔ strong but controlled
          y: relY * 0.35,
          duration: 0.35,
          ease: "power3.out",
        });
      };

      const reset = () => {
        gsap.to(content, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: "elastic.out(1,0.4)",
        });
      };

      btn.addEventListener("mousemove", move);
      btn.addEventListener("mouseleave", reset);

      return () => {
        btn.removeEventListener("mousemove", move);
        btn.removeEventListener("mouseleave", reset);
      };
    });
  }, [isTouch]);

  /* ---------------- RIPPLE (SUBTLE) ---------------- */
  const ripple = (e) => {
    if (isTouch) return;

    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const span = document.createElement("span");

    span.style.position = "absolute";
    span.style.left = `${e.clientX - rect.left}px`;
    span.style.top = `${e.clientY - rect.top}px`;
    span.style.width = span.style.height = "20px";
    span.style.background = colors.ripple;
    span.style.borderRadius = "999px";
    span.style.transform = "translate(-50%, -50%)";
    span.style.pointerEvents = "none";

    btn.appendChild(span);

    gsap.to(span, {
      scale: 14,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      onComplete: () => span.remove(),
    });
  };

  return (
    <>
      <section
        ref={sectionRef}
        className="relative px-6 py-24 mt-20 rounded-3xl border shadow-xl overflow-hidden"
        style={{ background: colors.bg, borderColor: colors.border }}
      >
        <p
          className="bottom-reveal text-center max-w-4xl mx-auto text-lg sm:text-xl lg:text-2xl leading-relaxed"
          style={{ color: colors.text }}
        >
          Turning{" "}
          <span style={{ color: colors.primary, fontWeight: 600 }}>ideas</span>{" "}
          into{" "}
          <span style={{ color: colors.secondary, fontWeight: 600 }}>
            scalable digital solutions
          </span>{" "}
          with clean, maintainable and performance-driven code.
        </p>

        <div className="bottom-reveal mt-14 flex flex-col sm:flex-row gap-8 justify-center">
          {[
            { text: "View Resume", link: "/resume", outline: true },
            { text: "Hire Me", link: "/contact", outline: false },
          ].map((b, i) => (
            <Link
              key={b.text}
              ref={(el) => (buttonsRef.current[i] = el)}
              to={b.link}
              onClick={ripple}
              className="relative overflow-hidden h-20 w-60 rounded-full flex items-center justify-center uppercase font-semibold tracking-wide"
              style={{
                border: b.outline ? `2px solid ${colors.primary}` : "none",
                background: b.outline ? "transparent" : colors.primary,
                color: b.outline ? colors.primary : "#fff",
              }}
            >
              <span className="btn-content relative z-10">
                {b.text}
              </span>
            </Link>
          ))}
        </div>

        <p className="bottom-reveal mt-10 text-center text-sm opacity-80">
          I usually reply within <strong>24 hours</strong>.  
          Let’s build something impactful.
        </p>
      </section>

      <footer
        className="text-center mt-10 text-sm uppercase"
        style={{ color: colors.footer }}
      >
        Crafted with <span className="text-red-500">♥</span> by{" "}
        <strong>Ayush Singh</strong>
      </footer>
    </>
  );
};

export default HomeBottomText;
