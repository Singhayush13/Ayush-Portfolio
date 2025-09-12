import { useEffect, useRef, useContext } from "react";
import { gsap } from "gsap";
import { ThemeContext } from "../../context/ThemeContext";
import { Link } from "react-router-dom";

const HomeHeroText = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  // GSAP entrance animations
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1 } });

      tl.fromTo(
        ".line",
        { y: 80, opacity: 0, skewY: 5 },
        { y: 0, opacity: 1, skewY: 0, stagger: 0.25 }
      )
        .fromTo(
          ".underline",
          { width: 0 },
          { width: "100%", duration: 1, ease: "power2.out" },
          "-=0.5"
        )
        .fromTo(
          ".subtitle",
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1 },
          "-=0.3"
        )
        .fromTo(
          ".skill-pill",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.1 },
          "-=0.3"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // FULL-STACK DEVELOPER animated text (responsive)
  useEffect(() => {
    if (!titleRef.current) return;

    const text = "FULL-STACK DEVELOPER";
    const container = titleRef.current;
    container.innerHTML = "";

    const chars = text.split("").map((char) => {
      const span = document.createElement("span");
      span.textContent = char;
      span.classList.add("char", "inline-block");
      container.appendChild(span);
      return span;
    });

    gsap.timeline({ repeat: -1, repeatDelay: 0.5 })
      .fromTo(
        chars,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.05, ease: "power3.out", duration: 0.6 }
      )
      .to(chars, {
        opacity: 0,
        y: -10,
        stagger: 0.03,
        ease: "power2.in",
        duration: 0.4,
        delay: 1,
      });
  }, []);

  // Theme colors
  const colors = {
    dark: {
      primary: "#FFD166",
      secondary: "#4E9EFF",
      subtitle: "#E0E0E0",
      skillText: "#E0E0E0",
      skillBorder: "#2C2C2C",
      bgCircle1: "rgba(78,158,255,0.15)",
      bgCircle2: "rgba(255,209,102,0.1)",
      ctaBorder: "#FFD166",
      ctaHover: "#FFD166",
      text: "#E0E0E0",
      bgGradient: "linear-gradient(to bottom, #121212, #1a1a1a)",
    },
    light: {
      primary: "#1D4ED8",
      secondary: "#F59E0B",
      subtitle: "#1F2937",
      skillText: "#1F2937",
      skillBorder: "#D1D5DB",
      bgCircle1: "rgba(59,130,246,0.15)",
      bgCircle2: "rgba(251,191,36,0.15)",
      ctaBorder: "#1D4ED8",
      ctaHover: "#1D4ED8",
      text: "#1F2937",
      bgGradient: "linear-gradient(to bottom, #F3F4F6, #E0E7FF)",
    },
  };

  const themeColors = isDark ? colors.dark : colors.light;

  return (
    <section
      ref={sectionRef}
      className="relative font-[font1] text-center px-4 sm:px-6 pt-6 lg:pt-12 min-h-[80vh] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: themeColors.bgGradient }}
    >
      {/* Background Circles */}
      <div
        className="absolute top-0 left-1/3 w-[700px] h-[700px] rounded-full blur-[180px] animate-pulse-slow -z-10"
        style={{ backgroundColor: themeColors.bgCircle1 }}
      />
      <div
        className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full blur-[150px] animate-pulse-slower -z-10"
        style={{ backgroundColor: themeColors.bgCircle2 }}
      />

      {/* Hero Heading */}
      <h1
        className="line text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight leading-tight group"
        style={{ color: themeColors.text }}
      >
        Hi,&nbsp;I&#39;m{" "}
        <span
          className="relative cursor-pointer transition-transform duration-500 hover:scale-105"
          style={{ color: themeColors.primary }}
        >
          Ayush Singh
          <span
            className="underline absolute left-0 bottom-0 h-[3px] block scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100"
            style={{ backgroundColor: themeColors.secondary }}
          />
        </span>
      </h1>

      {/* Animated FULL-STACK Text */}
      <h2
        ref={titleRef}
        className="mt-4 text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tight flex flex-wrap gap-1 justify-center text-center leading-snug"
        style={{ color: themeColors.secondary }}
      />

      {/* Subtitle */}
      <p
        className="subtitle mt-6 text-sm sm:text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed"
        style={{ color: themeColors.subtitle }}
      >
        Crafting scalable, user-centric applications with{" "}
        <span style={{ color: themeColors.primary }}>React</span>,{" "}
        <span style={{ color: themeColors.secondary }}>Node.js</span>, and clean, optimized backend systems.
      </p>

      {/* Skill Badges */}
      <div className="flex flex-wrap justify-center gap-3 mt-8 sm:mt-10">
        {["React.js", "Node.js", "Express.js", "MongoDB", "SQL", "ASP.NET", "GSAP", "UI/UX"].map(
          (skill) => (
            <span
              key={skill}
              className="skill-pill border px-4 py-2 rounded-full text-xs sm:text-sm md:text-base backdrop-blur-md hover:shadow-[0px_0px_15px_rgba(78,158,255,0.6)] hover:scale-110 transition-all duration-300 cursor-pointer"
              style={{
                borderColor: themeColors.skillBorder,
                color: themeColors.skillText,
              }}
            >
              {skill}
            </span>
          )
        )}
      </div>

      {/* CTA Buttons */}
      <div className="flex gap-4 sm:gap-6 mt-8 sm:mt-10 flex-wrap justify-center">
        <Link
          to="/projects"
          className="btn-link px-6 sm:px-8 py-3 sm:py-4 border-2 rounded-full uppercase font-semibold text-base sm:text-lg tracking-wide transition-all duration-300 hover:scale-110 hover:-translate-y-1"
          style={{
            borderColor: themeColors.ctaBorder,
            color: themeColors.ctaBorder,
          }}
        >
          View Projects
        </Link>
        <Link
          to="/about"
          className="btn-link px-6 sm:px-8 py-3 sm:py-4 border-2 rounded-full uppercase font-semibold text-base sm:text-lg tracking-wide transition-all duration-300 hover:scale-110 hover:-translate-y-1"
          style={{
            borderColor: themeColors.secondary,
            color: themeColors.secondary,
          }}
        >
          About Me
        </Link>
      </div>
    </section>
  );
};

export default HomeHeroText;
