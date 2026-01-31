import React, { useContext, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { ThemeContext } from "../context/ThemeContext";
import ProjectCard from "../components/projects/ProjectCard";
import { Helmet } from "react-helmet-async";
import { FaArrowRight } from "react-icons/fa";

const Projects = () => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";
  const containerRef = useRef(null);

  const projects = [
    {
      title: "CVVortex",
      description: "AI-powered resume builder with ATS scoring, skill analysis, and PDF master control.",
      images: ["/project_images/cvvortex1.png", "/project_images/cvvortex2.png", "/project_images/cvvortex3.png"],
      githubLink: "https://github.com/Singhayush13/CVVortex",
      demoLink: "https://cvvortex-client.onrender.com",
      techStack: ["React.js", "Node.js", "AI", "Tailwind"],
    },
    {
      title: "CareerCraft",
      description: "Platform providing AI-based career recommendations and interactive learning roadmaps.",
      images: ["/project_images/cc1.png", "/project_images/cc2.png", "/project_images/cc3.png"],
      githubLink: "",
      demoLink: "",
      techStack: ["MERN Stack", "AI Logic", "REST API"],
    },
    {
      title: "WanderLust",
      description: "Full-stack marketplace with secure auth, Cloudinary image hosting, and dynamic maps.",
      images: ["/project_images/wanderlust1.jpeg", "/project_images/wanderlust2.jpeg", "/project_images/wanderlust3.jpeg"],
      githubLink: "https://github.com/Singhayush13/WanderLust",
      demoLink: "https://www.linkedin.com/posts/singhayush1356_webdevelopment-nodejs-mongodb-activity-7253734090841972736--kfK",
      techStack: ["Node.js", "MongoDB", "Express", "Passport"],
    },
    {
      title: "Listora",
      description: "Modern booking system featuring role-based access control and high-speed search filters.",
      images: ["/project_images/listora1.png", "/project_images/listora2.png"],
      githubLink: "https://github.com/Singhayush13/Listora",
      demoLink: "",
      techStack: ["React.js", "Node.js", "RBAC", "Cloud"],
    },
    {
      title: "Online Chess",
      description: "Real-time engine-driven chess platform using WebSockets for ultra-low move latency.",
      images: ["/project_images/chess.webp"],
      githubLink: "https://github.com/Singhayush13/Chess-Game",
      demoLink: "",
      techStack: ["Socket.IO", "React.js", "Game Logic"],
    },
    {
      title: "Gemini AI Bot",
      description: "Conversational agent leveraging Gemini Pro API for high-level NLP interactions.",
      images: ["/project_images/chatbot.webp"],
      githubLink: "https://github.com/Singhayush13/AIChatbox",
      demoLink: "",
      techStack: ["Gemini API", "Node.js", "AI/ML"],
    },
    {
      title: "Zerodha Clone",
      description: "High-fidelity trading interface focusing on performance and data visualization.",
      images: ["/project_images/zerodha1.jpeg", "/project_images/zerodha2.jpeg", "/project_images/zerodha3.jpeg"],
      githubLink: "https://github.com/Singhayush13/Zerodha-Clone-",
      demoLink: "https://www.linkedin.com/posts/singhayush1356_webdevelopment-nodejs-mongodb-activity-7268690751780245504-WQZY",
      techStack: ["React.js", "Bootstrap", "FinTech UI"],
    },
    {
      title: "Dwarkamai Tours",
      description: "Business portal for a travel agency featuring inquiries and tour management.",
      images: ["/project_images/dtt1.png"],
      githubLink: "",
      demoLink: "https://dwarkamai-tours-and-travels.vercel.app/",
      techStack: ["React.js", "Tailwind", "Responsive"],
    },
    {
      title: "The Lab",
      description: "Exploration of micro-interactions, API tests, and experimental web audio features.",
      images: ["/project_images/github_linkedin.jpeg"],
      githubLink: "https://github.com/Singhayush13",
      demoLink: "https://www.linkedin.com/in/singhayush1356",
      techStack: ["GSAP", "Three.js", "Experiments"],
    },
  ];

  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    // 1. Horizontal Kinetic Text Effect
    gsap.to(".scrolling-text", {
      xPercent: -50,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });

    // 2. Parallax Grid Background
    gsap.to(".bg-grid", {
      y: -200,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        scrub: true,
      }
    });

    // 3. Staggered reveal for cards with a scale-up effect
    gsap.utils.toArray(".project-wrapper").forEach((card) => {
      gsap.from(card, {
        opacity: 0,
        scale: 0.8,
        y: 100,
        scrollTrigger: {
          trigger: card,
          start: "top 95%",
          end: "top 70%",
          scrub: 1,
        },
      });
    });
  }, { scope: containerRef });

  return (
    <>
      <Helmet>
        <title>Works | Ayush Singh</title>
      </Helmet>

      <section 
        ref={containerRef}
        className={`relative min-h-screen overflow-hidden py-32 transition-colors duration-1000 ${
          isDark ? "bg-[#050505] text-white" : "bg-[#f5f5f7] text-slate-900"
        }`}
      >
        {/* Subtle Interactive Grid Background */}
        <div className={`bg-grid absolute inset-0 opacity-[0.03] pointer-events-none ${isDark ? 'invert' : ''}`} 
             style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        {/* Floating Background Heading (Kinetic) */}
        <div className="absolute top-40 left-0 whitespace-nowrap pointer-events-none z-0">
          <h2 className="scrolling-text text-[20vw] font-black uppercase opacity-[0.03] leading-none select-none">
            Selected Works Portfolio Selected Works Portfolio
          </h2>
        </div>

        {/* Header Section */}
        <div className="relative z-10 px-6 lg:px-20 mb-32 max-w-5xl">
          <div className="overflow-hidden mb-4">
            <span className="text-blue-600 font-bold text-xs uppercase tracking-[0.5em] block translate-y-full animate-reveal">
              Creative Portfolio
            </span>
          </div>
          <h2 className="text-7xl md:text-9xl font-black tracking-tighter uppercase leading-[0.8] mb-10">
            PRO <br /> <span className="text-transparent stroke-text italic font-light">JECTS</span>
          </h2>
          <p className="text-xl md:text-2xl font-light max-w-xl opacity-60 leading-relaxed">
            A curation of high-performance applications where <span className="font-bold italic">logic</span> meets <span className="font-bold italic">aesthetics</span>.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="relative z-10 px-6 lg:px-20 grid gap-16 md:gap-y-48 sm:grid-cols-2">
          {projects.map((project, idx) => (
            <div 
              key={idx} 
              className={`project-wrapper group ${
                idx % 2 !== 0 ? "md:mt-40" : "" // Vertical Offset Stagger
              }`}
            >
              {/* Project Counter */}
              <div className="mb-4 opacity-20 font-mono text-sm">
                /0{idx + 1}
              </div>
              <ProjectCard {...project} />
            </div>
          ))}
        </div>

        {/* High-End Footer CTA */}
        <div className="mt-60 px-6 lg:px-20 text-center relative z-10">
          <div className="max-w-4xl mx-auto border-t border-current pt-20 opacity-20" />
          <h3 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-10">
            Ready to build <br /> something <span className="text-blue-600">extraordinary?</span>
          </h3>
          <a 
            href="https://github.com/Singhayush13" 
            target="_blank" 
            className="group relative inline-flex items-center gap-6 text-xl font-bold uppercase overflow-hidden"
          >
            <span className="relative z-10">Visit Laboratory</span>
            <div className="w-12 h-[2px] bg-blue-600 transition-all duration-500 group-hover:w-full absolute bottom-0 left-0" />
            <FaArrowRight className="group-hover:translate-x-4 transition-transform duration-500" />
          </a>
        </div>
      </section>

      <style jsx>{`
        .stroke-text {
          -webkit-text-stroke: 1px ${isDark ? 'white' : 'black'};
        }
        @keyframes reveal {
          to { transform: translateY(0); }
        }
        .animate-reveal {
          animation: reveal 1s cubic-bezier(0.77, 0, 0.175, 1) forwards;
        }
      `}</style>
    </>
  );
};

export default Projects;