// src/pages/Projects.jsx
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import ProjectCard from "../components/projects/ProjectCard";

const Projects = () => {
  const projects = [
    {
      image:
        "https://k72.ca/uploads/caseStudies/PJC/Thumbnails/PJC_SiteK72_Thumbnail_1280x960-1280x960.jpg",
      title: "Pharmacie Jean Coutu",
      link: "https://k72.ca/en/project/pjc",
    },
    {
      image:
        "https://k72.ca/uploads/caseStudies/WIDESCAPE/WS---K72.ca---Thumbnail-1280x960.jpg",
      title: "Widescape",
      link: "https://k72.ca/en/project/widescape",
    },
    {
      image:
        "https://k72.ca/uploads/caseStudies/OKA/OKA_thumbnail-1280x960.jpg",
      title: "OKA Cheese",
      link: "https://k72.ca/en/project/oka",
    },
    {
      image:
        "https://k72.ca/uploads/caseStudies/Opto/thumbnailimage_opto-1280x960.jpg",
      title: "Opto",
      link: "https://k72.ca/en/project/opto",
    },
    {
      image:
        "https://k72.ca/uploads/caseStudies/LAMAJEURE_-_Son_sur_mesure/chalaxeur-thumbnail_img-1280x960.jpg",
      title: "Lamajeure",
      link: "https://k72.ca/en/project/lamajeure",
    },
    {
      image:
        "https://k72.ca/uploads/caseStudies/SHELTON/thumbnailimage_shelton-1280x960.jpg",
      title: "Shelton",
      link: "https://k72.ca/en/project/shelton",
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
        <h2 className="font-[font2] text-5xl md:text-7xl uppercase font-extrabold tracking-tight">
          My Projects
        </h2>
        <p className="text-gray-400 text-sm md:text-lg mt-4 leading-relaxed">
          A curated selection of my best work — blending design, interactivity,
          and performance to deliver seamless digital experiences.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, idx) => (
          <div key={idx} className="project-card">
            <ProjectCard
              image={project.image}
              title={project.title}
              link={project.link}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
