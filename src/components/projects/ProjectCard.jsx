// src/components/projects/ProjectCard.jsx
import React from "react";

const ProjectCard = ({ image, title, link }) => {
  return (
    <div className="group relative overflow-hidden rounded-3xl shadow-lg hover:shadow-[0_0_40px_rgba(211,253,80,0.3)] transition-all duration-500">
      {/* Project Image */}
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
        <a
          href={link || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="uppercase text-xl md:text-3xl font-[font1] px-6 py-3 border-2 border-white rounded-full text-white hover:text-black hover:bg-[#D3FD50] transition-all duration-300"
        >
          View Project
        </a>
      </div>
    </div>
  );
};

export default ProjectCard;
