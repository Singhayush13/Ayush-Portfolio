import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const HomeHeroText = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1 } });

      tl.fromTo(
        ".line",
        { y: 80, opacity: 0, skewY: 5 },
        { y: 0, opacity: 1, skewY: 0, stagger: 0.25 }
      );

      tl.fromTo(
        ".underline",
        { width: 0 },
        { width: "100%", duration: 1, ease: "power2.out" },
        "-=0.5"
      );

      tl.fromTo(
        ".subtitle",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1 },
        "-=0.3"
      );

      tl.fromTo(
        ".skill-pill",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1 },
        "-=0.3"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!titleRef.current) return;

    const text = "FULL-STACK DEVELOPER";
    const container = titleRef.current;
    container.innerHTML = "";

    const chars = text.split("").map((char) => {
      const span = document.createElement("span");
      span.textContent = char;
      span.classList.add("char");
      container.appendChild(span);
      return span;
    });

    gsap.timeline({ repeat: -1, repeatDelay: 0.5 })
      .fromTo(
        chars,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.05, ease: "power3.out", duration: 0.6 }
      )
      .to(chars, {
        opacity: 0,
        y: -10,
        stagger: 0.03,
        ease: "power2.in",
        duration: 0.4,
        delay: 1,
      });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative font-[font1] text-center px-6 mt-20 lg:mt-32 min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black via-[#0e0e0e] to-[#0a0a0a]" />
      <div className="absolute top-0 left-1/3 w-[700px] h-[700px] bg-[#4E9EFF]/20 rounded-full blur-[180px] animate-pulse-slow -z-10" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#D3FD50]/15 rounded-full blur-[150px] animate-pulse-slower -z-10" />

      {/* Hero Heading */}
      <h1 className="line text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight leading-tight group">
        Hi,&nbsp;I&#39;m{" "}
        <span className="relative text-[#4E9EFF] hover:text-[#D3FD50] transition-colors duration-500 cursor-pointer">
          Ayush Singh
          <span className="underline absolute left-0 bottom-0 h-[3px] bg-[#D3FD50] block scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />
        </span>
      </h1>

      {/* Animated FULL-STACK Text */}
      <h2
        ref={titleRef}
        className="mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-[#D3FD50] flex gap-1 justify-center"
      />

      {/* Subtitle */}
      <p className="subtitle mt-6 text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed">
        Crafting scalable, user-centric applications with{" "}
        <span className="text-[#4E9EFF] hover:text-[#D3FD50] transition-colors duration-300 cursor-pointer">
          React
        </span>
        ,{" "}
        <span className="text-[#D3FD50] hover:text-[#4E9EFF] transition-colors duration-300 cursor-pointer">
          Node.js
        </span>
        , and clean, optimized backend systems.
      </p>

      {/* Skill Badges */}
      <div className="flex flex-wrap justify-center gap-3 mt-10">
        {[
          "React.js",
          "Node.js",
          "Express.js",
          "MongoDB",
          "SQL",
          "ASP.NET",
          "GSAP",
          "UI/UX",
        ].map((skill) => (
          <span
            key={skill}
            className="skill-pill border border-gray-700 text-gray-200 px-4 py-2 rounded-full text-sm sm:text-base backdrop-blur-md hover:border-[#4E9EFF] hover:text-[#4E9EFF] hover:shadow-[0px_0px_15px_rgba(78,158,255,0.6)] hover:scale-110 transition-all duration-300 cursor-pointer"
          >
            {skill}
          </span>
        ))}
      </div>

      {/* CTA Buttons */}
      <div className="flex gap-6 mt-10">
        <Link
          to="/projects"
          aria-label="View my projects"
          className="btn-link px-8 py-4 border-2 border-white rounded-full uppercase font-semibold text-lg tracking-wide transition-all duration-300 hover:scale-110 hover:border-[#D3FD50] hover:text-[#D3FD50] hover:shadow-[0px_10px_40px_rgba(211,253,80,0.5)] hover:-translate-y-1"
        >
          View Projects
        </Link>
        <Link
          to="/about"
          aria-label="Learn more about me"
          className="btn-link px-8 py-4 border-2 border-white rounded-full uppercase font-semibold text-lg tracking-wide transition-all duration-300 hover:scale-110 hover:border-[#4E9EFF] hover:text-[#4E9EFF] hover:shadow-[0px_10px_40px_rgba(78,158,255,0.5)] hover:-translate-y-1"
        >
          About Me
        </Link>
      </div>
    </section>
  );
};

export default HomeHeroText;
