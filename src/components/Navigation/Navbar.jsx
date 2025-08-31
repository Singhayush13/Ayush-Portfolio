import React, { useContext, useRef } from "react";
import { NavbarColorContext, NavbarContext } from "../../context/NavContext";
import gsap from "gsap";

const Navbar = () => {
  const navHighlightRef = useRef(null);
  const [navOpen, setNavOpen] = useContext(NavbarContext);
  const [navColor] = useContext(NavbarColorContext);

  const handleEnter = () => {
    gsap.to(navHighlightRef.current, {
      height: "100%",
      duration: 0.3,
      ease: "power3.out",
    });
  };

  const handleLeave = () => {
    gsap.to(navHighlightRef.current, {
      height: "0%",
      duration: 0.4,
      ease: "power3.inOut",
    });
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-4 ">
      {/* Name instead of Logo */}
      <div className="text-2xl lg:text-3xl font-bold tracking-wide" style={{ color: navColor }}>
        Ayush Singh
      </div>

      {/* Hamburger Button */}
      <button
        onClick={() => setNavOpen(true)}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        className="relative w-12 h-10 lg:w-16 lg:h-14 bg-black rounded-md cursor-pointer overflow-hidden"
      >
        <div
          ref={navHighlightRef}
          className="absolute top-0 left-0 w-full h-0 bg-[#D3FD50]"
        ></div>
        <div className="relative flex flex-col justify-center items-center gap-1">
          <span className="block w-8 h-0.5 bg-white"></span>
          <span className="block w-5 h-0.5 bg-white"></span>
        </div>
      </button>
    </nav>
  );
};

export default Navbar;
