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

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-4 transition-all duration-500 ${
        scrolled ? "bg-black/90 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div
        className="text-2xl lg:text-3xl font-bold tracking-wide"
        style={{ color: navColor }}
      >
        Ayush Singh
      </div>

      <button
        ref={burgerRef}
        onClick={() => setNavOpen(true)}
        onMouseEnter={() => handleHover(true)}
        onMouseLeave={() => handleHover(false)}
        className="relative w-12 h-10 lg:w-16 lg:h-14 flex flex-col justify-center items-center gap-2 cursor-pointer"
      >
        <span className="block w-8 h-0.5 bg-white rounded"></span>
        <span className="block w-6 h-0.5 bg-white rounded"></span>
        <span className="block w-8 h-0.5 bg-white rounded"></span>
      </button>
    </nav>
  );
};

export default Navbar;
