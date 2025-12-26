import React, {
  useEffect,
  useRef,
  useContext,
  useMemo,
  useCallback,
} from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ThemeContext } from "../../context/ThemeContext";

gsap.registerPlugin(ScrollTrigger);

/* -------------------------------------------------------------------------- */
/* CONFIG                                                                      */
/* -------------------------------------------------------------------------- */

const CTA_BUTTONS = [
  { label: "View Resume", path: "/resume", variant: "outline" },
  { label: "Hire Me", path: "/contact", variant: "solid" },
];

const HomeBottomText = () => {
  const sectionRef = useRef(null);
  const buttonsRef = useRef([]);
  const { theme } = useContext(ThemeContext);

  const isDark = theme === "dark";
  const isTouchDevice =
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: coarse)").matches;

  /* -------------------------------------------------------------------------- */
  /* THEME TOKENS                                                               */
  /* -------------------------------------------------------------------------- */

  const colors = useMemo(
    () =>
      isDark
        ? {
            bg: "linear-gradient(135deg,#020617,#111827)",
            border: "#1f2937",
            text: "#e5e7eb",
            primary: "#f59e0b",
            secondary: "#fbbf24",
            ripple: "rgba(245,158,11,.25)",
            footer: "#9ca3af",
          }
        : {
            bg: "linear-gradient(135deg,#f8fafc,#eef2ff)",
            border: "#cbd5e1",
            text: "#1f2937",
            primary: "#2563eb",
            secondary: "#3b82f6",
            ripple: "rgba(37,99,235,.25)",
            footer: "#64748b",
          },
    [isDark]
  );

  /* -------------------------------------------------------------------------- */
  /* SCROLL REVEAL ANIMATION                                                     */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      tl.from(".reveal-text", {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      })
        .from(
          ".reveal-btn",
          {
            y: 30,
            opacity: 0,
            stagger: 0.2,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.4"
        )
        .from(
          ".reveal-footer",
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
          },
          "-=0.3"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* -------------------------------------------------------------------------- */
  /* MAGNETIC BUTTON EFFECT (DESKTOP ONLY)                                       */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {
    if (isTouchDevice) return;

    buttonsRef.current.forEach((button) => {
      if (!button) return;

      const inner = button.querySelector(".btn-inner");

      const handleMove = (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(inner, {
          x: x * 0.35,
          y: y * 0.35,
          duration: 0.3,
          ease: "power3.out",
        });
      };

      const handleLeave = () => {
        gsap.to(inner, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: "elastic.out(1,0.4)",
        });
      };

      button.addEventListener("mousemove", handleMove);
      button.addEventListener("mouseleave", handleLeave);

      return () => {
        button.removeEventListener("mousemove", handleMove);
        button.removeEventListener("mouseleave", handleLeave);
      };
    });
  }, [isTouchDevice]);

  /* -------------------------------------------------------------------------- */
  /* RIPPLE EFFECT                                                              */
  /* -------------------------------------------------------------------------- */

  const createRipple = useCallback(
    (e) => {
      if (isTouchDevice) return;

      const button = e.currentTarget;
      const rect = button.getBoundingClientRect();
      const ripple = document.createElement("span");

      ripple.style.cssText = `
        position:absolute;
        left:${e.clientX - rect.left}px;
        top:${e.clientY - rect.top}px;
        width:18px;
        height:18px;
        background:${colors.ripple};
        border-radius:50%;
        transform:translate(-50%,-50%);
        pointer-events:none;
      `;

      button.appendChild(ripple);

      gsap.to(ripple, {
        scale: 14,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        onComplete: () => ripple.remove(),
      });
    },
    [colors.ripple, isTouchDevice]
  );

  /* -------------------------------------------------------------------------- */
  /* RENDER                                                                     */
  /* -------------------------------------------------------------------------- */

  return (
    <>
      <section
        ref={sectionRef}
        className="relative mx-auto mt-24 max-w-7xl px-5 sm:px-8 py-16 sm:py-20 rounded-3xl border shadow-xl overflow-hidden"
        style={{ background: colors.bg, borderColor: colors.border }}
      >
        {/* TEXT */}
        <p
          className="reveal-text mx-auto max-w-4xl text-center text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed"
          style={{ color: colors.text }}
        >
          Turning{" "}
          <span className="font-semibold" style={{ color: colors.primary }}>
            ideas
          </span>{" "}
          into{" "}
          <span className="font-semibold" style={{ color: colors.secondary }}>
            scalable digital solutions
          </span>{" "}
          with clean, maintainable, and performance-driven code.
        </p>

        {/* CTA BUTTONS */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-8">
          {CTA_BUTTONS.map((btn, index) => (
            <Link
              key={btn.label}
              ref={(el) => (buttonsRef.current[index] = el)}
              to={btn.path}
              onClick={createRipple}
              aria-label={btn.label}
              className="reveal-btn relative overflow-hidden h-14 sm:h-16 w-full sm:w-60 max-w-xs rounded-full flex items-center justify-center uppercase font-semibold tracking-wide focus:outline-none focus:ring-2 focus:ring-offset-2"
              style={{
                background:
                  btn.variant === "solid" ? colors.primary : "transparent",
                color: btn.variant === "solid" ? "#fff" : colors.primary,
                border:
                  btn.variant === "outline"
                    ? `2px solid ${colors.primary}`
                    : "none",
              }}
            >
              <span className="btn-inner relative z-10">
                {btn.label}
              </span>
            </Link>
          ))}
        </div>

        {/* RESPONSE NOTE */}
        <p
          className="reveal-footer mt-10 text-center text-sm opacity-80"
          style={{ color: colors.text }}
        >
          I usually reply within <strong>24 hours</strong>. Let’s build something
          impactful.
        </p>
      </section>

      {/* FOOTER */}
      <footer
        className="reveal-footer mt-10 text-center text-xs sm:text-sm tracking-wide uppercase"
        style={{ color: colors.footer }}
      >
        Crafted with <span className="text-red-500">♥</span> by{" "}
        <strong>Ayush Singh</strong>
      </footer>
    </>
  );
};

export default HomeBottomText;
