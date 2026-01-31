import React, { useState, useEffect, useRef, useContext } from "react";
import { FaGithub, FaArrowRight, FaCode, FaExternalLinkAlt } from "react-icons/fa";
import { gsap } from "gsap";
import { ThemeContext } from "../../context/ThemeContext";

const ProjectCard = ({ images, title, description, githubLink, demoLink, techStack = [] }) => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";
  const [currentImage, setCurrentImage] = useState(0);
  
  const cardRef = useRef(null);
  const imgRef = useRef(null);
  const contentRef = useRef(null);

  // 1. Seamless Cross-Fade (No Clipping)
  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      const nextIndex = (currentImage + 1) % images.length;
      
      gsap.to(imgRef.current, {
        opacity: 0,
        scale: 1.02,
        duration: 0.8,
        ease: "power2.inOut",
        onComplete: () => {
          setCurrentImage(nextIndex);
          gsap.to(imgRef.current, { opacity: 1, scale: 1, duration: 1 });
        }
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [currentImage, images.length]);

  // 2. Sophisticated Hover: Subtle "Pull" Effect
  const onMouseEnter = () => {
    // Instead of changing flex, we slightly slide the text and zoom the image
    gsap.to(contentRef.current, { x: 10, duration: 0.6, ease: "power3.out" });
    gsap.to(imgRef.current, { scale: 1.1, duration: 1.5, ease: "power2.out" });
    gsap.to(".overlay-gradient", { opacity: 0.4, duration: 0.6 });
  };

  const onMouseLeave = () => {
    gsap.to(contentRef.current, { x: 0, duration: 0.6, ease: "power3.out" });
    gsap.to(imgRef.current, { scale: 1, duration: 1.2, ease: "power2.out" });
    gsap.to(".overlay-gradient", { opacity: 0.7, duration: 0.6 });
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`group relative w-full h-[500px] md:h-[400px] rounded-[1.5rem] overflow-hidden border flex flex-col md:flex-row transition-all duration-500 ${
        isDark 
          ? "bg-[#0a0a0a] border-white/10 shadow-2xl" 
          : "bg-white border-black/5 shadow-xl"
      }`}
    >
      {/* LEFT: TEXT CONTENT (Fixed Width to prevent image cropping) */}
      <div 
        ref={contentRef}
        className="relative z-20 flex-1 md:max-w-[40%] p-8 md:p-10 flex flex-col justify-between h-full"
      >
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="h-[2px] w-6 bg-blue-600"></span>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">Case Study</span>
          </div>
          
          <h3 className={`text-3xl md:text-4xl font-black tracking-tighter leading-none uppercase ${isDark ? "text-white" : "text-black"}`}>
            {title}
          </h3>

          <p className={`text-sm leading-relaxed opacity-60 font-medium ${isDark ? "text-gray-300" : "text-gray-600"}`}>
            {description}
          </p>

          <div className="flex flex-wrap gap-3 pt-4">
            {techStack.slice(0, 3).map((tech) => (
              <span key={tech} className={`text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded border ${isDark ? 'border-white/10 text-white/50' : 'border-black/10 text-black/50'}`}>
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-5 pt-6">
          <a href={demoLink} target="_blank" rel="noreferrer" className="flex items-center gap-2 group/btn">
            <span className={`text-[11px] font-black uppercase tracking-widest ${isDark ? 'text-white' : 'text-black'}`}>View Project</span>
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center transition-transform group-hover/btn:translate-x-1">
              <FaArrowRight size={10} />
            </div>
          </a>
          <a href={githubLink} target="_blank" rel="noreferrer" className={`opacity-40 hover:opacity-100 transition-opacity ${isDark ? 'text-white' : 'text-black'}`}>
            <FaGithub size={20} />
          </a>
        </div>
      </div>

      {/* RIGHT: IMAGE PORTAL (Uses Object-Cover to prevent distortion) */}
      <div className="relative flex-1 h-full overflow-hidden bg-zinc-900">
        <img
          ref={imgRef}
          src={images[currentImage]}
          alt={title}
          className="w-full h-full object-cover object-center will-change-transform"
        />
        
        {/* The Fade Gradient - Creates the professional "Merge" between text and photo */}
        <div className={`overlay-gradient absolute inset-0 transition-opacity duration-700 pointer-events-none hidden md:block ${
          isDark 
            ? "bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent" 
            : "bg-gradient-to-r from-white via-white/80 to-transparent"
        }`} style={{ opacity: 0.7 }} />

        {/* Status Indicator */}
        <div className="absolute top-6 right-6 backdrop-blur-md bg-black/20 border border-white/10 px-3 py-1.5 rounded-full flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]"></span>
          <span className="text-[8px] font-black text-white uppercase tracking-wider">Live</span>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;