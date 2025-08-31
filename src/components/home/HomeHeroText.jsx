import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const HomeHeroText = () => {
  const textRef = useRef(null);
  const photoRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { ease: "power3.out", duration: 0.9 },
    });

    // Animate lines
    tl.fromTo(
      textRef.current.querySelectorAll(".line"),
      { y: 90, opacity: 0, skewY: 5 },
      { y: 0, opacity: 1, skewY: 0, stagger: 0.22 }
    );

    // Animate photo
    tl.fromTo(
      photoRef.current,
      { scale: 0.7, opacity: 0, rotate: -10 },
      {
        scale: 1,
        opacity: 1,
        rotate: 0,
        duration: 1,
        ease: "elastic.out(1, 0.7)",
      },
      "-=0.6"
    );
  }, []);

  // Hover animation for photo
  useEffect(() => {
    const el = photoRef.current;
    if (!el) return;

    const enter = () =>
      gsap.to(el, {
        scale: 1.08,
        rotate: 3,
        boxShadow: "0px 8px 25px rgba(78,158,255,0.6)",
        duration: 0.35,
        ease: "power3.out",
      });

    const leave = () =>
      gsap.to(el, {
        scale: 1,
        rotate: 0,
        boxShadow: "0px 4px 15px rgba(255,255,255,0.2)",
        duration: 0.35,
        ease: "power3.out",
      });

    el.addEventListener("mouseenter", enter);
    el.addEventListener("mouseleave", leave);

    return () => {
      el.removeEventListener("mouseenter", enter);
      el.removeEventListener("mouseleave", leave);
    };
  }, []);

  return (
    <section
      ref={textRef}
      className="font-[font1] mt-24 lg:mt-0 pt-8 text-center select-none"
    >
      {/* First line */}
      <div className="line lg:text-[6vw] text-[9vw] flex justify-center items-center uppercase lg:leading-[6vw] leading-[9vw] font-extrabold tracking-tight">
        Hello, I'm{" "}
        <span className="ml-3 bg-gradient-to-r from-[#4E9EFF] via-[#7C3AED] to-[#4E9EFF] bg-clip-text text-transparent transition-all duration-300">
          Ayush
        </span>
      </div>

      {/* Second line with profile photo */}
      <div className="line lg:text-[6vw] text-[8.5vw] flex justify-center items-center uppercase lg:leading-[6vw] leading-[8.5vw] mt-6 font-bold">
        A
        <div
          ref={photoRef}
          className="photo-thumb h-[7vw] w-[7vw] lg:h-[6vw] lg:w-[6vw] rounded-full overflow-hidden mx-4 border-4 border-white shadow-[0px_4px_15px_rgba(255,255,255,0.2)] transition-all duration-300"
          style={{ transformOrigin: "center" }}
        >
          <img
            src="/ayush.png"
            alt="Ayush"
            className="h-full w-full object-cover object-center"
          />
        </div>
        <span className="transition-colors duration-300 hover:text-[#4E9EFF]">
          Developer
        </span>
      </div>

      {/* Third line */}
      <div className="line lg:text-[6vw] text-[9vw] flex justify-center items-center uppercase lg:leading-[6vw] leading-[9vw] mt-6 font-bold">
        <span className="transition-colors duration-300 hover:text-[#7C3AED]">
          & Designer
        </span>
      </div>

      {/* Subtitle */}
      <p className="line mt-8 text-gray-300 text-sm lg:text-lg tracking-wide max-w-2xl mx-auto px-6 leading-relaxed hover:text-white transition-colors duration-300">
        I build clean, usable web apps with a focus on UX and performance —
        React, Node, and thoughtful design.
      </p>
    </section>
  );
};

export default HomeHeroText;
