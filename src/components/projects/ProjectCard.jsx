// src/components/projects/ProjectCard.jsx
import React, { useState, useEffect, useRef, useContext } from "react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { gsap } from "gsap";
import { ThemeContext } from "../../context/ThemeContext"; // assuming you have this

const ProjectCard = ({ images, title, description, githubLink, demoLink, techStack = [] }) => {
  const { theme } = useContext(ThemeContext); // "light" or "dark"
  const [currentImage, setCurrentImage] = useState(0);
  const intervalRef = useRef(null);
  const cardRef = useRef(null);

  // Image carousel
  useEffect(() => {
    if (images.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentImage((prev) => (prev + 1) % images.length);
      }, 2500);
    }
    return () => clearInterval(intervalRef.current);
  }, [images]);

  // GSAP animation for card
  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );

      gsap.fromTo(
        cardRef.current.querySelectorAll(".tech-stack, .action-buttons"),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: "power3.out", delay: 0.4 }
      );
    }
  }, []);

  // Conditional theme classes
  const bgClass =
    theme === "dark"
      ? "bg-gradient-to-b from-[#111] to-[#1a1a1a] border-gray-800 text-white"
      : "bg-white border-gray-300 text-gray-900";

  const techClass =
    theme === "dark"
      ? "border-gray-500 text-gray-300 hover:border-[#4E9EFF] hover:text-[#4E9EFF]"
      : "border-gray-400 text-gray-700 hover:border-blue-500 hover:text-blue-500";

  const actionGithubClass =
    theme === "dark"
      ? "bg-gray-800 hover:bg-gray-700 text-white"
      : "bg-gray-200 hover:bg-gray-300 text-gray-900";

  const actionDemoClass =
    theme === "dark"
      ? "bg-[#4E9EFF] hover:bg-[#3a7be0] text-white"
      : "bg-blue-400 hover:bg-blue-500 text-white";

  return (
    <div
      ref={cardRef}
      className={`relative flex flex-col rounded-3xl overflow-hidden shadow-lg transform hover:scale-[1.02] transition-all duration-500 border ${bgClass}`}
    >
      {/* Project Image */}
      <div className="overflow-hidden relative">
        <img
          src={images[currentImage]}
          alt={title}
          className="w-full h-64 md:h-72 object-cover transform hover:scale-110 transition-transform duration-700"
        />
      </div>

      {/* Project Content */}
      <div className={`p-6 flex flex-col flex-1 justify-between backdrop-blur-md ${theme === "dark" ? "bg-black/40" : "bg-white/40"}`}>
        <div>
          <h3
            className={`text-2xl md:text-3xl font-bold mb-2 ${
              theme === "dark" ? "text-[#D3FD50] text-shadow-neon" : "text-blue-700"
            }`}
          >
            {title}
          </h3>
          <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-800"} text-sm md:text-base leading-relaxed`}>
            {description}
          </p>
        </div>

        {/* Tech Stack */}
        {techStack.length > 0 && (
          <div className={`flex flex-wrap gap-2 mt-4 tech-stack`}>
            {techStack.map((tech) => (
              <span key={tech} className={`px-3 py-1 text-xs md:text-sm rounded-full transition-all ${techClass}`}>
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 mt-4 action-buttons">
          {githubLink && (
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm md:text-base transition-all ${actionGithubClass}`}
            >
              <FaGithub /> GitHub
            </a>
          )}
          {demoLink && (
            <a
              href={demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm md:text-base transition-all ${actionDemoClass}`}
            >
              <FaExternalLinkAlt /> Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
