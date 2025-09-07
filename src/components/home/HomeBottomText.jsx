import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HomeBottomText = () => {
  const bottomRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: bottomRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        defaults: { ease: "power3.out", duration: 1 },
      });

      tl.fromTo(".tagline", { y: 60, opacity: 0 }, { y: 0, opacity: 1 });
      tl.fromTo(
        ".btn-link",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.2 },
        "-=0.4"
      );
    }, bottomRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const buttons = bottomRef.current.querySelectorAll(".btn-link");

    buttons.forEach((btn) => {
      btn.addEventListener("mousemove", (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        gsap.to(btn, {
          x: (x - rect.width / 2) * 0.1,
          y: (y - rect.height / 2) * 0.1,
          scale: 1.05,
          duration: 0.3,
        });
      });

      btn.addEventListener("mouseleave", () => {
        gsap.to(btn, { x: 0, y: 0, scale: 1, duration: 0.3 });
      });
    });
  }, []);

  return (
    <section
      ref={bottomRef}
      className="relative font-[font2] flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-0 px-6 py-24 rounded-3xl bg-gradient-to-r from-[#101010] via-[#0a0a0a] to-[#101010] border border-gray-800 backdrop-blur-md shadow-2xl overflow-hidden mt-20 scroll-smooth"
    >
      {/* Accent Glow */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#4E9EFF]/15 blur-[150px] -z-10"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#D3FD50]/10 blur-[150px] -z-10"></div>

      {/* Tagline */}
      <p className="tagline lg:w-[45%] w-full text-gray-300 font-[font1] text-lg sm:text-xl lg:text-2xl leading-relaxed text-center lg:text-left">
        🚀 Turning <span className="text-[#4E9EFF] font-semibold">ideas</span> into{" "}
        <span className="text-[#D3FD50] font-semibold">impactful solutions</span> with code
        that is clean, maintainable, and designed for scalability.
      </p>

      {/* Buttons */}
      <div className="btn-group flex flex-col sm:flex-row gap-6 lg:gap-10 mt-8 lg:mt-0">
        <Link
          to="/resume"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="btn-link h-20 sm:h-24 w-48 sm:w-60 flex items-center justify-center border-2 border-white rounded-full uppercase font-semibold text-lg sm:text-xl lg:text-2xl tracking-wide transition-all duration-300 hover:border-[#D3FD50] hover:text-[#D3FD50]"
        >
          View Resume
        </Link>

        <Link
          to="/contact"
          className="btn-link h-20 sm:h-24 w-48 sm:w-60 flex items-center justify-center border-2 border-white rounded-full uppercase font-semibold text-lg sm:text-xl lg:text-2xl tracking-wide transition-all duration-300 hover:border-[#4E9EFF] hover:text-[#4E9EFF]"
        >
          Hire Me
        </Link>
      </div>
    </section>
  );
};

export default HomeBottomText;
