import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const HomeHeroText = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1 } });
    const lines = sectionRef.current.querySelectorAll(".line");

    // Animate heading lines
    tl.fromTo(
      lines,
      { y: 80, opacity: 0, skewY: 5 },
      { y: 0, opacity: 1, skewY: 0, stagger: 0.25 }
    );

    // Animate subtitle
    tl.fromTo(
      sectionRef.current.querySelector(".subtitle"),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1 },
      "-=0.3"
    );
  }, []);

  // Hover animations for heading lines
  useEffect(() => {
    const lines = sectionRef.current.querySelectorAll(".line");

    lines.forEach((line) => {
      const enter = () =>
        gsap.to(line, {
          y: -5,
          color: "#D3FD50",
          duration: 0.3,
          ease: "power2.out",
        });

      const leave = () =>
        gsap.to(line, {
          y: 0,
          color: line.classList.contains("text-[#4E9EFF]") ? "#4E9EFF" : "#ffffff",
          duration: 0.3,
          ease: "power2.out",
        });

      line.addEventListener("mouseenter", enter);
      line.addEventListener("mouseleave", leave);

      // Cleanup
      return () => {
        line.removeEventListener("mouseenter", enter);
        line.removeEventListener("mouseleave", leave);
      };
    });

    // Hover for subtitle
    const subtitle = sectionRef.current.querySelector(".subtitle");
    if (subtitle) {
      const enterSub = () =>
        gsap.to(subtitle, { color: "#ffffff", duration: 0.3, ease: "power2.out" });
      const leaveSub = () =>
        gsap.to(subtitle, { color: "#d1d5db", duration: 0.3, ease: "power2.out" }); // gray-300

      subtitle.addEventListener("mouseenter", enterSub);
      subtitle.addEventListener("mouseleave", leaveSub);

      return () => {
        subtitle.removeEventListener("mouseenter", enterSub);
        subtitle.removeEventListener("mouseleave", leaveSub);
      };
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className="font-[font1] mt-20 lg:mt-32 px-6 text-center select-none"
    >
      {/* Hero Heading */}
      <div className="line text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight leading-tight">
        Hello, I'm <span className="text-[#4E9EFF]">Ayush</span>
      </div>

      <div className="line text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight mt-6">
        Frontend Developer & Designer
      </div>

      {/* Subtitle */}
      <p className="subtitle mt-6 text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed">
        I build clean, usable web applications with a focus on UX, performance,
        and scalability. React.js, Node.js, and thoughtful design are my
        specialties.
      </p>
    </section>
  );
};

export default HomeHeroText;
