// src/components/resume/Resume.jsx
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Resume = () => {
  const sectionRef = useRef(null);

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  // Handle resume download
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/AyushResume2025.pdf"; // Ensure this is in public folder
    link.download = "AyushResume2025.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Animate sections on scroll
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
    <div
      ref={sectionRef}
      className="relative min-h-screen w-screen text-white px-6 lg:px-20 py-16 overflow-hidden scroll-smooth"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#080808] to-[#0a0a0a] -z-10"></div>
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#4E9EFF]/15 rounded-full blur-[200px] animate-pulse-slow -z-10"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#D3FD50]/12 rounded-full blur-[200px] animate-pulse-slower -z-10"></div>

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mt-10 mb-10">
        <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight uppercase">
          My <span className="text-[#D3FD50]">Resume</span>
        </h1>
        <button
          onClick={handleDownload}
          className="mt-4 lg:mt-0 px-6 py-3 border-2 border-[#D3FD50] rounded-full text-lg font-semibold hover:bg-[#D3FD50] hover:text-black transition-all duration-300"
        >
          Download Resume
        </button>
      </div>

      {/* Sections */}
      {[
        "Career Summary",
        "Work Experience",
        "Projects",
        "Education",
        "Skills",
        "Certifications",
      ].map((title, idx) => (
        <div
          key={title}
          className="resume-section mb-12 p-6 lg:p-8 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 shadow-xl"
        >
          <h2
            className={`text-2xl lg:text-3xl font-bold mb-4 ${
              idx % 2 === 0 ? "text-[#D3FD50]" : "text-[#4E9EFF]"
            }`}
          >
            {title}
          </h2>

          {/* Section Content */}
          {title === "Career Summary" && (
            <p className="text-gray-300 leading-relaxed">
              Results-driven Software Developer skilled in React.js, Node.js,
              Express.js, MongoDB, SQL, ASP, VBScript, and Bootstrap. Experienced
              in building scalable, real-time applications with strong expertise
              in database design, system architecture, and performance optimization.
              Passionate about delivering efficient and user-friendly solutions.
            </p>
          )}

          {title === "Work Experience" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold">Software Developer - Digital ASPL</h3>
                <p className="text-sm text-gray-400">May 2025 – Present</p>
                <ul className="list-disc ml-5 mt-2 text-gray-300 space-y-1">
                  <li>Developed and maintained web applications using .NET and Classic ASP/VBScript.</li>
                  <li>Designed optimized SQL Server databases with complex queries and indexing.</li>
                  <li>Built one-to-many data modules (e.g., student registration + education details) with robust validation.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold">Admin Executive - Aakaar Education</h3>
                <p className="text-sm text-gray-400">Jun 2023 – May 2025</p>
                <ul className="list-disc ml-5 mt-2 text-gray-300 space-y-1">
                  <li>Implemented centralized student data workflows with Excel / Google Sheets + SQL-based reporting.</li>
                  <li>Automated administrative dashboards with macros & scripting to reduce manual effort.</li>
                  <li>Coordinated outreach and admissions using data-driven insights.</li>
                </ul>
              </div>
            </div>
          )}

          {title === "Projects" && (
            <ul className="list-disc ml-5 text-gray-300 space-y-2">
              <li><strong>Zerodha-Inspired Trading Platform:</strong> Responsive React.js frontend simulating professional stock trading UI.</li>
              <li><strong>WanderLust:</strong> Full-stack travel app with image uploads (Cloudinary), secure auth, and server-side validation.</li>
              <li><strong>Online Chess Game:</strong> Real-time multiplayer chess app with Socket.IO event-based communication.</li>
            </ul>
          )}

          {title === "Education" && (
            <ul className="list-disc ml-5 text-gray-300 space-y-2">
              <li><strong>Thakur Ramnarayan College (2023–2026):</strong> B.Sc IT – 8.40 Pointer (Sem 4)</li>
              <li><strong>St. Anne’s Jr. College (2021–2023):</strong> XII Science – Computer Science Stream</li>
            </ul>
          )}

          {title === "Skills" && (
            <div className="flex flex-wrap gap-3">
              {[
                "React.js",
                "Node.js",
                "Express.js",
                "MongoDB",
                "SQL Server",
                "ASP.NET / VBScript",
                "Bootstrap",
                "GSAP",
                "System Design",
                "REST APIs",
              ].map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 border border-gray-700 rounded-full text-sm hover:border-[#D3FD50] hover:text-[#D3FD50] transition-all"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}

          {title === "Certifications" && (
            <p className="text-gray-300">
              Certificate of Excellence in JavaScript — Programming Hub (Issued Mar 2024)
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default Resume;
