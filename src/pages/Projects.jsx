// src/pages/Projects.jsx
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import ProjectCard from "../components/projects/ProjectCard";

const Projects = () => {
  const projects = [
    {
      images: [
        "/project_images/zerodha1.jpeg",
        "/project_images/zerodha2.jpeg",
        "/project_images/zerodha3.jpeg",
      ],
      title: "Zerodha Clone",
      description:
        "Fully responsive frontend for a Zerodha-inspired trading platform built with ReactJS and Bootstrap CSS. Backend & dashboard in progress.",
      githubLink: "https://github.com/Singhayush13/Zerodha-Clone-",
      demoLink:
        "https://www.linkedin.com/posts/singhayush1356_webdevelopment-nodejs-mongodb-activity-7268690751780245504-WQZY?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEvghNgBvYSuCZ5WKPx03EgDmZsZAijdSoc",
      techStack: ["React.js", "Bootstrap", "Responsive Design", "UI/UX"],
    },
    {
      images: [
        "/project_images/wanderlust1.jpeg",
        "/project_images/wanderlust2.jpeg",
        "/project_images/wanderlust3.jpeg",
      ],
      title: "WanderLust",
      description:
        "Listing management platform for admins and users, featuring secure authentication, CRUD operations, Cloudinary image uploads, and responsive UI.",
      githubLink: "https://github.com/Singhayush13/WanderLust",
      demoLink:
        "https://www.linkedin.com/posts/singhayush1356_webdevelopment-nodejs-mongodb-activity-7253734090841972736--kfK?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEvghNgBvYSuCZ5WKPx03EgDmZsZAijdSoc",
      techStack: [
        "Node.js",
        "Express.js",
        "MongoDB",
        "Passport.js",
        "Cloudinary",
        "Bootstrap",
      ],
    },
    {
      images: ["/project_images/chess.webp"],
      title: "Online Chess Game",
      description:
        "Real-time multiplayer chess game using Socket.IO with move history, sound effects, and responsive UI.",
      githubLink: "https://github.com/Singhayush13/Chess-Game",
      demoLink: "",
      techStack: ["React.js", "Socket.IO", "Real-time", "Game Logic"],
    },
    {
      images: ["/project_images/chatbot.webp"],
      title: "AI Chatbot",
      description:
        "AI-powered chatbot integrated with Gemini API to deliver intelligent, real-time responses.",
      githubLink: "https://github.com/Singhayush13/AIChatbox",
      demoLink: "",
      techStack: ["Node.js", "Express.js", "API Integration", "AI/ML"],
    },
    {
      images: ["/project_images/github_linkedin.jpeg"],
      title: "More Mini Projects",
      description:
        "For more mini projects and experiments, visit my GitHub and LinkedIn.",
      githubLink: "https://github.com/Singhayush13",
      demoLink:
        "https://www.linkedin.com/in/singhayush1356?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      techStack: [],
    },
  ];

  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    gsap.utils.toArray(".project-card").forEach((card, i) => {
      gsap.from(card, {
        opacity: 0,
        y: 80,
        scale: 0.95,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        delay: i * 0.1,
      });
    });
  }, []);

  return (
    <section className="relative min-h-screen px-6 lg:px-20 py-28 bg-black text-white">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="font-[font2] text-5xl md:text-7xl uppercase font-extrabold tracking-tight text-white text-shadow-neon mb-4">
          My Projects
        </h2>
        <p className="text-gray-400 text-sm md:text-lg leading-relaxed">
          A curated selection of my professional work — blending design,
          interactivity, and performance to deliver seamless digital experiences.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="mt-20 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, idx) => (
          <div key={idx} className="project-card">
            <ProjectCard
              images={project.images}
              title={project.title}
              description={project.description}
              githubLink={project.githubLink}
              demoLink={project.demoLink}
              techStack={project.techStack}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
