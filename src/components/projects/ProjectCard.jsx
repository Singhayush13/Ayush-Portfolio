// src/components/projects/ProjectCard.jsx
import React, { useState, useEffect, useRef } from "react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const ProjectCard = ({ images, title, description, githubLink, demoLink, techStack = [] }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (images.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentImage((prev) => (prev + 1) % images.length);
      }, 2500);
    }
    return () => clearInterval(intervalRef.current);
  }, [images]);

  return (
    <div className="relative flex flex-col rounded-3xl overflow-hidden shadow-lg bg-gradient-to-b from-[#111] to-[#1a1a1a] border border-gray-800 transform hover:scale-[1.02] transition-all duration-500">
      {/* Project Image */}
      <div className="overflow-hidden relative">
        <img
          src={images[currentImage]}
          alt={title}
          className="w-full h-64 md:h-72 object-cover transform hover:scale-110 transition-transform duration-700"
        />
      </div>

      {/* Project Content (always visible) */}
      <div className="p-6 flex flex-col flex-1 justify-between backdrop-blur-md bg-black/40">
        {/* Title & Description */}
        <div>
          <h3 className="text-2xl md:text-3xl font-bold text-[#D3FD50] mb-2 text-shadow-neon">
            {title}
          </h3>
          <p className="text-gray-300 text-sm md:text-base leading-relaxed">
            {description}
          </p>
        </div>

        {/* Tech Stack */}
        {techStack.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs md:text-sm border border-gray-500 rounded-full text-gray-300 hover:border-[#4E9EFF] hover:text-[#4E9EFF] transition-all"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 mt-4">
          {githubLink && (
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-full text-sm md:text-base transition-all"
            >
              <FaGithub /> GitHub
            </a>
          )}
          {demoLink && (
            <a
              href={demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-[#4E9EFF] hover:bg-[#3a7be0] text-white rounded-full text-sm md:text-base transition-all"
            >
              <FaExternalLinkAlt /> LinkedIn
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
