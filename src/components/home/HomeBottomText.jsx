import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";

const HomeBottomText = () => {
  const bottomRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1 } });

    // Fade-in tagline
    tl.fromTo(
      bottomRef.current.querySelector(".tagline"),
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 }
    );

    // Fade-in buttons
    tl.fromTo(
      bottomRef.current.querySelectorAll(".btn-group a"),
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.2, duration: 0.8 },
      "-=0.5"
    );
  }, []);

  // Enhanced hover animations for buttons
  useEffect(() => {
    const buttons = bottomRef.current.querySelectorAll(".btn-group a");

    buttons.forEach((btn) => {
      const enter = () =>
        gsap.to(btn, {
          scale: 1.08,
          y: -3,
          color: "#D3FD50",
          borderColor: "#D3FD50",
          boxShadow: "0px 10px 30px rgba(211,253,80,0.5)",
          duration: 0.35,
          ease: "power3.out",
        });

      const leave = () =>
        gsap.to(btn, {
          scale: 1,
          y: 0,
          color: "#ffffff",
          borderColor: "#ffffff",
          boxShadow: "0px 0px 0px rgba(0,0,0,0)",
          duration: 0.35,
          ease: "power3.out",
        });

      btn.addEventListener("mouseenter", enter);
      btn.addEventListener("mouseleave", leave);

      return () => {
        btn.removeEventListener("mouseenter", enter);
        btn.removeEventListener("mouseleave", leave);
      };
    });
  }, []);

  return (
    <div
      ref={bottomRef}
      className="font-[font2] flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-0 relative px-6 py-16 lg:py-24"
    >
      {/* About / Tagline */}
      <p className="tagline lg:w-[30%] w-full text-gray-300 font-[font1] text-base sm:text-lg lg:text-xl leading-relaxed text-center lg:text-left">
        Passionate Frontend Developer & Creative Designer — crafting digital
        experiences that spark imagination and leave lasting impact.
      </p>

      {/* Buttons */}
      <div className="btn-group flex flex-col sm:flex-row gap-6 lg:gap-8 mt-8 lg:mt-0">
        <Link
          to="/projects"
          className="h-20 sm:h-24 w-48 sm:w-60 flex items-center justify-center border-2 border-white rounded-full uppercase font-semibold transition-all duration-300 text-lg sm:text-xl lg:text-2xl"
        >
          Projects
        </Link>

        <Link
          to="/about"
          className="h-20 sm:h-24 w-48 sm:w-60 flex items-center justify-center border-2 border-white rounded-full uppercase font-semibold transition-all duration-300 text-lg sm:text-xl lg:text-2xl"
        >
          About Me
        </Link>
      </div>
    </div>
  );
};

export default HomeBottomText;
