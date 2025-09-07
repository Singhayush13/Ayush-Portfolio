import React, { useContext, useEffect, useRef, useState } from "react";
import { NavbarContext, NavbarColorContext } from "../../context/NavContext";
import gsap from "gsap";

const Navbar = () => {
  const [navOpen, setNavOpen] = useContext(NavbarContext);
  const [navColor] = useContext(NavbarColorContext);
  const navRef = useRef(null);
  const burgerRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Slide-down entrance animation
    gsap.fromTo(
      navRef.current,
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );

    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleHover = (enter) => {
    gsap.to(burgerRef.current, {
      scale: enter ? 1.1 : 1,
      duration: 0.3,
      ease: "power3.out",
    });
  };

  const handleOpen = () => setNavOpen(true);

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-4 transition-all duration-500 
        ${
          scrolled
            ? "bg-black/80 backdrop-blur-xl shadow-lg"
            : "bg-gradient-to-b from-black/70 via-black/50 to-transparent"
        }
      `}
    >
      {/* Brand Name */}
      <div
        className="text-2xl lg:text-3xl font-bold tracking-wide transition-colors duration-300 hover:text-[#D3FD50] hover:drop-shadow-[0_0_10px_#D3FD50]"
        style={{ color: navColor || "white" }}
      >
        Ayush Singh
      </div>

      {/* Burger Menu */}
      <button
        ref={burgerRef}
        onClick={handleOpen}
        onMouseEnter={() => handleHover(true)}
        onMouseLeave={() => handleHover(false)}
        className="relative w-12 h-10 lg:w-16 lg:h-14 flex flex-col justify-center items-center gap-2 cursor-pointer group transition-transform"
      >
        <span className="block w-8 h-0.5 bg-white rounded group-hover:bg-[#D3FD50] transition-all"></span>
        <span className="block w-6 h-0.5 bg-white rounded group-hover:bg-[#D3FD50] transition-all"></span>
        <span className="block w-8 h-0.5 bg-white rounded group-hover:bg-[#D3FD50] transition-all"></span>
      </button>
    </nav>
  );
};

export default Navbar;
