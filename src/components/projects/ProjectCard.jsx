// src/components/projects/ProjectCard.jsx
import React, { useState, useEffect, useRef } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const ProjectCard = ({ images, title, description, githubLink, demoLink, techStack = [] }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (images.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentImage(prev => (prev + 1) % images.length);
      }, 2000);
    }
    return () => clearInterval(intervalRef.current);
  }, [images]);

  return (
    <div className="group relative overflow-hidden rounded-3xl shadow-lg hover:shadow-[0_0_80px_rgba(211,253,80,0.4)] transition-all duration-500 bg-gradient-to-b from-[#111111] to-[#1a1a1a] border border-gray-800">
      {/* Project Image */}
      <img
        src={images[currentImage]}
        alt={title}
        className="w-full h-64 md:h-72 object-cover transform group-hover:scale-110 transition-transform duration-700"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-between p-6">
        {/* Project Info */}
        <div>
          <h3 className="text-2xl md:text-3xl font-bold text-[#D3FD50] mb-2 text-shadow-neon">
            {title}
          </h3>
          <p className="text-gray-300 text-sm md:text-base leading-relaxed">
            {description}
          </p>
        </div>

        {/* Tech Stack Tags */}
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
              <FaLinkedin /> LinkedIn / Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
