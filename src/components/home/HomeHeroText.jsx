import { useEffect, useRef, useContext, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ThemeContext } from "../../context/ThemeContext";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { label: "Projects Delivered", value: 15 },
  { label: "Technologies Used", value: 10 },
  { label: "Years of Learning", value: 2 },
];

const SERVICES = [
  {
    title: "Backend Engineering",
    desc: "Designing secure, scalable APIs and backend systems.",
  },
  {
    title: "Full-Stack Development",
    desc: "End-to-end applications with clean architecture.",
  },
  {
    title: "Performance Optimization",
    desc: "Fast load times, optimized queries, clean code.",
  },
];

const SKILLS = [
  "React",
  "Node",
  "Express",
  "MongoDB",
  "SQL",
  "ASP.NET",
  "REST APIs",
  "GSAP",
];

const HomeHeroText = () => {
  const sectionRef = useRef(null);
  const statsRef = useRef([]);
  const cardsRef = useRef([]);
  const lineRef = useRef(null);
  const ctaRefs = useRef([]);

  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const isTouch =
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: coarse)").matches;

  /* ---------------- COLORS ---------------- */
  const colors = useMemo(() => {
    if (isDark) {
      return {
        text: "#E5E7EB",
        muted: "#9CA3AF",
        accent: "#F59E0B",
        border: "#1F2937",
        cardBg: "rgba(255,255,255,0.03)",
        bg: "linear-gradient(180deg,#020617,#020617)",
        line: "#F59E0B",
      };
    }
    return {
      text: "#0F172A",
      muted: "#475569",
      accent: "#2563EB",
      border: "#CBD5E1",
      cardBg: "#FFFFFF",
      bg: "linear-gradient(180deg,#F8FAFC,#EEF2FF)",
      line: "#2563EB",
    };
  }, [isDark]);

  /* ---------------- INTRO ---------------- */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-fade", {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  /* ---------------- SVG LINE ---------------- */
  useEffect(() => {
    if (!lineRef.current) return;
    const path = lineRef.current;
    const length = path.getTotalLength();

    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
    gsap.to(path, {
      strokeDashoffset: 0,
      duration: 1.4,
      ease: "power2.out",
      delay: 0.6,
    });
  }, []);

  /* ---------------- STATS ---------------- */
  useEffect(() => {
    statsRef.current.forEach((el, i) => {
      const obj = { val: 0 };
      gsap.to(obj, {
        val: STATS[i].value,
        scrollTrigger: { trigger: el, start: "top 85%" },
        duration: 1.5,
        ease: "power3.out",
        onUpdate: () => (el.textContent = Math.floor(obj.val) + "+"),
      });
    });
  }, []);

  /* ---------------- SERVICE CARD HOVER ---------------- */
  useEffect(() => {
    cardsRef.current.forEach((card) => {
      if (!card) return;
      card.addEventListener("mouseenter", () =>
        gsap.to(card, { y: -8, duration: 0.3 })
      );
      card.addEventListener("mouseleave", () =>
        gsap.to(card, { y: 0, duration: 0.3 })
      );
    });
  }, []);

  /* ---------------- PRO MAGNETIC CTA ---------------- */
  useEffect(() => {
    if (isTouch) return;

    ctaRefs.current.forEach((btn) => {
      if (!btn) return;

      const inner = btn.querySelector(".cta-inner");

      const move = (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(inner, {
          x: x * 0.35,
          y: y * 0.35,
          duration: 0.35,
          ease: "power3.out",
        });
      };

      const reset = () => {
        gsap.to(inner, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: "elastic.out(1, 0.4)",
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

  return (
    <section
      ref={sectionRef}
      className="relative w-full px-6 py-24 overflow-hidden"
      style={{ background: colors.bg }}
    >
      <div className="max-w-6xl mx-auto text-center">

        <h1 className="hero-fade text-4xl sm:text-6xl lg:text-7xl font-extrabold">
          Hi, I’m <span style={{ color: colors.accent }}>Ayush Singh</span>
        </h1>

        <svg className="mx-auto mt-4 hero-fade" width="180" height="10">
          <path
            ref={lineRef}
            d="M5 5 H175"
            stroke={colors.line}
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>

        <p className="hero-fade mt-5 text-lg sm:text-xl max-w-3xl mx-auto" style={{ color: colors.muted }}>
          Backend-focused Full-Stack Developer building scalable, secure, and high-performance systems.
        </p>

        {/* CTA */}
        <div className="flex gap-6 justify-center mt-12">
          {[
            { text: "View Projects", link: "/projects", outline: true },
            { text: "Hire Me", link: "/contact", outline: false },
          ].map((btn, i) => (
            <Link
              key={btn.text}
              ref={(el) => (ctaRefs.current[i] = el)}
              to={btn.link}
              className="relative overflow-hidden px-8 py-4 rounded-full font-semibold"
              style={{
                border: btn.outline ? `2px solid ${colors.accent}` : "none",
                color: btn.outline ? colors.accent : "#fff",
                background: btn.outline ? "transparent" : colors.accent,
              }}
            >
              <span className="cta-inner block">{btn.text}</span>
            </Link>
          ))}
        </div>

        {/* SERVICES */}
        <div className="grid sm:grid-cols-3 gap-6 mt-20 text-left">
          {SERVICES.map((s, i) => (
            <div
              key={s.title}
              ref={(el) => (cardsRef.current[i] = el)}
              className="p-6 rounded-xl border"
              style={{ borderColor: colors.border, background: colors.cardBg }}
            >
              <h3 className="font-semibold mb-2">{s.title}</h3>
              <p className="text-sm opacity-70">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* SKILLS */}
        <div className="flex flex-wrap justify-center gap-3 mt-14">
          {SKILLS.map((skill) => (
            <span
              key={skill}
              className="px-4 py-2 rounded-full border text-sm"
              style={{ borderColor: colors.border }}
            >
              {skill}
            </span>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HomeHeroText;
