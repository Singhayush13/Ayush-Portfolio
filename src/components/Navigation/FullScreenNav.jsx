import React, { useContext, useRef, useState, useEffect } from "react";
import { NavbarContext } from "../../context/NavContext";
import { Link } from "react-router-dom";
import gsap from "gsap";

const FullScreenNav = () => {
  const [navOpen, setNavOpen] = useContext(NavbarContext);
  const [hoveredThumb, setHoveredThumb] = useState(null);
  const navRef = useRef(null);
  const thumbRef = useRef(null);

  const menuLinks = [
    { name: "Home", path: "/", thumb: "/thumbs/home.jpg" },
    { name: "Projects", path: "/projects", thumb: "/thumbs/projects.jpg" },
    { name: "About", path: "/about", thumb: "/thumbs/about.jpg" },
    { name: "Contact", path: "/contact", thumb: "/thumbs/contact.jpg" },
  ];

  // Open animation
  const openAnim = () => {
    gsap.set(navRef.current, { display: "flex" });
    const tl = gsap.timeline();
    tl.fromTo(
      ".stair",
      { scaleY: 0 },
      { scaleY: 1, transformOrigin: "top", stagger: 0.08, ease: "power4.inOut" }
    ).fromTo(
      ".navlink",
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.12, ease: "power3.out" },
      "-=0.4"
    );
  };

  // Close animation
  const closeAnim = () => {
    const tl = gsap.timeline();
    tl.to(".navlink", { y: 40, opacity: 0, stagger: 0.08, ease: "power2.in" })
      .to(".stair", { scaleY: 0, transformOrigin: "bottom", stagger: 0.08, ease: "power4.inOut" })
      .set(navRef.current, { display: "none" });
  };

  useEffect(() => {
    navOpen ? openAnim() : closeAnim();
  }, [navOpen]);

  // Thumbnail hover follow cursor
  useEffect(() => {
    if (!thumbRef.current) return;
    gsap.set(thumbRef.current, { xPercent: -50, yPercent: -50 });
    const moveThumb = (e) => {
      gsap.to(thumbRef.current, { x: e.clientX, y: e.clientY, duration: 0.25, ease: "power3.out" });
    };
    window.addEventListener("mousemove", moveThumb);
    return () => window.removeEventListener("mousemove", moveThumb);
  }, [hoveredThumb]);

  return (
    <div
      ref={navRef}
      className="fullscreennav hidden fixed inset-0 z-50 text-white flex-col bg-black w-full h-screen overflow-hidden"
    >
      {/* Stair Background */}
      <div className="absolute inset-0 flex h-full w-full">
        {Array(5)
          .fill("")
          .map((_, i) => (
            <div key={i} className="stair w-1/5 h-full bg-black scale-y-0 origin-top"></div>
          ))}
      </div>

      {/* Menu */}
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex justify-between items-center p-6 lg:p-12">
          <div className="text-2xl lg:text-3xl font-bold tracking-wide">Ayush Singh</div>
          <button onClick={() => setNavOpen(false)} className="w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center relative">
            <span className="absolute w-6 h-0.5 bg-[#D3FD50] rotate-45"></span>
            <span className="absolute w-6 h-0.5 bg-[#D3FD50] -rotate-45"></span>
          </button>
        </div>

        <div className="flex-1 flex flex-col justify-center items-center gap-10 lg:gap-14">
          {menuLinks.map((link, i) => (
            <Link
              key={i}
              to={link.path}
              onClick={() => setNavOpen(false)}
              onMouseEnter={() => setHoveredThumb(link.thumb)}
              onMouseLeave={() => setHoveredThumb(null)}
              className="navlink opacity-0 text-4xl lg:text-6xl font-[font2] uppercase tracking-wide hover:text-[#D3FD50] transition-colors duration-300"
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
