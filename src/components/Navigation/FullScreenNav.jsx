// src/components/navbar/FullScreenNav.jsx
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useContext, useRef, useState } from "react";
import { NavbarContext } from "../../context/NavContext";
import { Link } from "react-router-dom";

const FullScreenNav = () => {
  const [navOpen, setNavOpen] = useContext(NavbarContext);
  const [hoveredThumb, setHoveredThumb] = useState(null);
  const thumbRef = useRef(null);

  // Menu links
  const menuLinks = [
    { name: "Home", path: "/", thumb: "/thumbs/home.jpg" },
    { name: "Projects", path: "/projects", thumb: "/thumbs/projects.jpg" },
    { name: "About", path: "/about", thumb: "/thumbs/about.jpg" },
    { name: "Contact", path: "/contact", thumb: "/thumbs/contact.jpg" },
    { name: "Blogs", path: "/blogs", thumb: "/thumbs/blogs.jpg" },
  ];

  // Animations for open/close
  function openAnim() {
    const tl = gsap.timeline();
    tl.set(".fullscreennav", { display: "block" })
      .to(".stair", {
        scaleY: 1,
        transformOrigin: "top",
        stagger: 0.08,
        ease: "power4.inOut",
      })
      .fromTo(
        ".navlink",
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, stagger: 0.1, ease: "power3.out" },
        "-=0.2"
      );
  }

  function closeAnim() {
    const tl = gsap.timeline();
    tl.to(".navlink", {
      opacity: 0,
      y: 40,
      stagger: 0.08,
      ease: "power2.in",
    })
      .to(".stair", {
        scaleY: 0,
        transformOrigin: "bottom",
        stagger: 0.1,
        ease: "power4.inOut",
      })
      .set(".fullscreennav", { display: "none" });
  }

  // Trigger animations when navOpen changes
  useGSAP(() => {
    navOpen ? openAnim() : closeAnim();
  }, [navOpen]);

  // Hover thumbnail follow cursor
  useGSAP(() => {
    if (!thumbRef.current) return;
    gsap.set(thumbRef.current, { xPercent: -50, yPercent: -50 });
    const moveThumb = (e) => {
      gsap.to(thumbRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.25,
        ease: "power3.out",
      });
    };
    window.addEventListener("mousemove", moveThumb);
    return () => window.removeEventListener("mousemove", moveThumb);
  }, []);

  return (
    <div className="fullscreennav hidden fixed inset-0 z-50 text-white">
      {/* Background Animation Layers */}
      <div className="absolute inset-0 flex">
        {Array(5)
          .fill("")
          .map((_, i) => (
            <div
              key={i}
              className="stair w-1/5 h-full bg-black scale-y-0 origin-top"
            ></div>
          ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Top Bar */}
        <div className="flex items-center justify-between p-6">
          <div className="text-2xl font-bold tracking-wider">Ayush Singh</div>
          <button
            onClick={() => setNavOpen(false)}
            className="w-10 h-10 flex items-center justify-center relative"
            aria-label="Close Menu"
          >
            <span className="absolute w-6 h-0.5 bg-[#D3FD50] rotate-45"></span>
            <span className="absolute w-6 h-0.5 bg-[#D3FD50] -rotate-45"></span>
          </button>
        </div>

        {/* Links */}
        <div className="flex-1 flex flex-col justify-center items-center gap-10 lg:gap-14">
          {menuLinks.map((link, i) => (
            <Link
              key={i}
              to={link.path}
              onClick={() => setNavOpen(false)}
              onMouseEnter={() => setHoveredThumb(link.thumb)}
              onMouseLeave={() => setHoveredThumb(null)}
              className="navlink opacity-0 text-4xl lg:text-6xl font-[font2] uppercase tracking-wide hover:text-[#D3FD50] transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Hover Thumbnail */}
      {hoveredThumb && (
        <img
          ref={thumbRef}
          src={hoveredThumb}
          alt="preview"
          className="pointer-events-none fixed top-0 left-0 w-64 h-44 object-cover rounded-xl opacity-90 shadow-2xl mix-blend-difference"
        />
      )}
    </div>
  );
};

export default FullScreenNav;
