// src/components/resume/Resume.jsx
import React, { useEffect, useRef, useContext, useState, memo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ThemeContext } from "../../context/ThemeContext";
import { FaPhoneAlt, FaEnvelope, FaLinkedin, FaChevronDown, FaChevronUp } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const Resume = () => {
  const sectionRef = useRef(null);
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const [showMoreDigital, setShowMoreDigital] = useState(false);
  const [showMoreAakaar, setShowMoreAakaar] = useState(false);

  const toggleDigital = () => setShowMoreDigital((prev) => !prev);
  const toggleAakaar = () => setShowMoreAakaar((prev) => !prev);

  const colors = {
    dark: {
      bgGradient: "linear-gradient(to bottom, #101010, #0a0a0a)",
      border: "#2c2c2c",
      text: "#cfcfcf",
      accent1: "#f59e0b",
      accent2: "#fbbf24",
      glowTop: "rgba(245,158,11,0.15)",
      glowBottom: "rgba(251,191,36,0.1)",
    },
    light: {
      bgGradient: "linear-gradient(to bottom, #f9fafb, #e6eef9)",
      border: "#d1d5db",
      text: "#1f2937",
      accent1: "#2563eb",
      accent2: "#3b82f6",
      glowTop: "rgba(78,158,255,0.15)",
      glowBottom: "rgba(0,123,255,0.1)",
    },
  };

  const themeColors = isDark ? colors.dark : colors.light;

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".resume-section").forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: i * 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
      ScrollTrigger.refresh();
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <main
      ref={sectionRef}
      className="relative min-h-screen w-full px-6 lg:px-20 py-16 overflow-hidden scroll-smooth"
      style={{ color: themeColors.text }}
      lang="en"
    >
      {/* Background */}
      <div
        className="absolute inset-0 -z-10"
        aria-hidden="true"
        style={{ background: themeColors.bgGradient }}
      />
      <div
        className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full blur-[200px] animate-pulse-slow -z-10"
        style={{ backgroundColor: themeColors.glowTop }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full blur-[200px] animate-pulse-slower -z-10"
        style={{ backgroundColor: themeColors.glowBottom }}
        aria-hidden="true"
      />

      {/* Header */}
      <header className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between mt-10 mb-10">
        <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight uppercase">
          My{" "}
          <span style={{ color: themeColors.accent1 }}>Resume</span>
        </h1>
        {/* Contact Info */}
        <address className="not-italic flex flex-col items-start gap-3 text-base lg:text-lg">
          <p className="flex items-center gap-3">
            <FaPhoneAlt style={{ color: themeColors.accent1 }} aria-hidden="true" />
            <a href="tel:+919096959656" className="hover:underline" aria-label="Phone">
              +91 9096959656
            </a>
          </p>
          <p className="flex items-center gap-3">
            <FaEnvelope style={{ color: themeColors.accent1 }} aria-hidden="true" />
            <a href="mailto:singhayushrs13@gmail.com" className="hover:underline">
              singhayushrs13@gmail.com
            </a>
          </p>
          <p className="flex items-center gap-3">
            <FaLinkedin style={{ color: themeColors.accent1 }} aria-hidden="true" />
            <a
              href="https://www.linkedin.com/in/singhayush1356"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              linkedin.com/in/singhayush1356
            </a>
          </p>
        </address>
      </header>

      {/* Sections */}
      {[
        "Career Summary",
        "Work Experience",
        "Projects",
        "Education",
        "Skills",
        "Certifications",
      ].map((title, idx) => (
        <section
          key={title}
          className="resume-section mb-12 p-6 lg:p-8 rounded-2xl border shadow-xl"
          style={{
            borderColor: themeColors.border,
            backgroundColor: isDark ? "#1a1a1a" : "rgba(255,255,255,0.05)",
          }}
          aria-label={title}
        >
          <h2
            className="text-2xl lg:text-3xl font-bold mb-4"
            style={{ color: idx % 2 === 0 ? themeColors.accent1 : themeColors.accent2 }}
          >
            {title}
          </h2>

          {title === "Career Summary" && (
            <p className="leading-relaxed">
              Results-driven Software Developer skilled in React.js, Node.js,
              Express.js, MongoDB, SQL, ASP, VBScript, and Bootstrap. Experienced
              in building scalable, real-time applications with expertise in
              database design, system architecture, and performance optimization.
              Passionate about delivering efficient and user-friendly solutions.
            </p>
          )}

          {title === "Work Experience" && (
            <article className="space-y-6">
              {/* Digital ASPL */}
              <div>
                <h3 className="text-xl font-semibold">Software Developer - Digital ASPL</h3>
                <p className="text-sm opacity-70">May 2025 – Present</p>
                <ul className="list-disc ml-5 mt-2 space-y-1">
                  <li>Developed and maintained web applications using .NET & Classic ASP/VBScript.</li>
                  {showMoreDigital && (
                    <>
                      <li>Designed optimized SQL Server databases with stored procedures & indexing.</li>
                      <li>Built scalable one-to-many data modules with robust validation.</li>
                      <li>Integrated secure payment gateways & automated reconciliation workflows.</li>
                      <li>Created dynamic reports & dashboards for real-time business insights.</li>
                      <li>Wrote efficient backend code to handle edge cases & ensure data consistency.</li>
                    </>
                  )}
                </ul>
                <button
                  onClick={toggleDigital}
                  className="mt-2 text-sm flex items-center gap-1 hover:underline focus:outline-none"
                  aria-expanded={showMoreDigital}
                  aria-controls="digital-details"
                >
                  {showMoreDigital ? <>Show Less <FaChevronUp /></> : <>Show More <FaChevronDown /></>}
                </button>
              </div>

              {/* Aakaar Education */}
              <div>
                <h3 className="text-xl font-semibold">Admin Executive - Aakaar Education</h3>
                <p className="text-sm opacity-70">Jun 2023 – May 2025</p>
                <ul className="list-disc ml-5 mt-2 space-y-1">
                  <li>Implemented centralized student data workflows with Excel / SQL reporting.</li>
                  {showMoreAakaar && (
                    <>
                      <li>Automated admin dashboards using macros & scripting.</li>
                      <li>Coordinated outreach & admissions using data-driven insights.</li>
                    </>
                  )}
                </ul>
                <button
                  onClick={toggleAakaar}
                  className="mt-2 text-sm flex items-center gap-1 hover:underline focus:outline-none"
                  aria-expanded={showMoreAakaar}
                  aria-controls="aakaar-details"
                >
                  {showMoreAakaar ? <>Show Less <FaChevronUp /></> : <>Show More <FaChevronDown /></>}
                </button>
              </div>
            </article>
          )}

          {title === "Projects" && (
            <ul className="list-disc ml-5 space-y-2">
              <li><strong>Zerodha-Inspired Trading Platform:</strong> Responsive React.js frontend simulating professional stock trading UI.</li>
              <li><strong>WanderLust:</strong> Full-stack travel app with image uploads (Cloudinary), secure auth, and server-side validation.</li>
              <li><strong>Online Chess Game:</strong> Real-time multiplayer chess app with Socket.IO communication.</li>
            </ul>
          )}

          {title === "Education" && (
            <ul className="list-disc ml-5 space-y-2">
              <li><strong>Thakur Ramnarayan College (2023–2026):</strong> B.Sc IT – 8.40 Pointer (Sem 4)</li>
              <li><strong>St. Anne’s Jr. College (2021–2023):</strong> XII Science – Computer Science Stream</li>
            </ul>
          )}

          {title === "Skills" && (
            <div className="flex flex-wrap gap-3">
              {["React.js","Node.js","Express.js","MongoDB","SQL Server","ASP.NET / VBScript","Bootstrap","GSAP","System Design","REST APIs"]
                .map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 border rounded-full text-sm transition-all hover:scale-105"
                    style={{ borderColor: themeColors.border }}
                  >
                    {skill}
                  </span>
                ))}
            </div>
          )}

          {title === "Certifications" && (
            <p>Certificate of Excellence in JavaScript — Programming Hub (Issued Mar 2024)</p>
          )}
        </section>
      ))}
    </main>
  );
};

export default memo(Resume);
