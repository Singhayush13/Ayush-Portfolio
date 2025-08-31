import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";

const About = () => {
  gsap.registerPlugin(ScrollTrigger);

  const heroRef = useRef(null);
  const photoRef = useRef(null);
  const skillsRef = useRef(null);

  // GSAP Animations
  useGSAP(() => {
    gsap.from(heroRef.current.querySelectorAll(".animate"), {
      y: 40,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      stagger: 0.2,
    });

    gsap.from(photoRef.current, {
      scale: 0.9,
      opacity: 0,
      rotate: -3,
      duration: 1,
      ease: "elastic.out(1,0.7)",
      delay: 0.4,
    });

    gsap.from(skillsRef.current.querySelectorAll(".skill-card"), {
      y: 30,
      opacity: 0,
      stagger: 0.15,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: skillsRef.current,
        start: "top 80%",
      },
    });
  });

  const skills = [
    {
      title: "Frontend",
      desc: "React.js, Next.js, Tailwind CSS — creating modern, responsive, and performant UIs.",
    },
    {
      title: "Backend",
      desc: "Node.js, Express.js, MongoDB — building scalable APIs and server-side applications.",
    },
    {
      title: "Full Stack & DevOps",
      desc: "Combining frontend and backend expertise, with deployment, cloud integration, and optimized workflows.",
    },
  ];

  return (
    <div className="bg-black text-white font-[font2]">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="min-h-screen flex flex-col-reverse lg:flex-row items-center justify-center px-6 lg:px-20 gap-10 lg:gap-20 pt-24"
      >
        {/* Text */}
        <div className="flex-1 text-center lg:text-left space-y-4">
          <h1 className="animate text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase leading-tight">
            Hi, I'm Ayush
          </h1>
          <p className="animate text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed max-w-xl mx-auto lg:mx-0">
            I’m a Full Stack Developer turning ideas into modern, high-performing
            web applications. I specialize in React.js, Node.js, and complete
            end-to-end solutions that combine UI/UX with scalable backend systems.
          </p>
        </div>

        {/* Photo */}
        <div ref={photoRef} className="flex-1 max-w-[280px] sm:max-w-xs md:max-w-sm lg:max-w-md mx-auto">
          <img
            src="/ayush.png"
            alt="Ayush"
            className="w-full rounded-2xl shadow-2xl object-cover"
          />
        </div>
      </section>

      {/* Skills Section */}
      <section ref={skillsRef} className="py-16 px-6 lg:px-20 bg-[#111]">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-10">
          My Skills
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {skills.map((skill, idx) => (
            <div
              key={idx}
              className="skill-card p-6 bg-black/60 border border-white/10 rounded-2xl hover:scale-105 transition-transform duration-300 shadow-lg"
            >
              <h3 className="text-xl sm:text-2xl font-semibold mb-3 text-[#D3FD50]">
                {skill.title}
              </h3>
              <p className="text-gray-300 text-sm sm:text-base">{skill.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call To Action */}
      <section className="py-16 bg-[#D3FD50] text-black text-center px-6">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Let’s Connect</h2>
        <p className="max-w-xl mx-auto mb-6 text-base sm:text-lg lg:text-xl">
          Have a project idea or need a full-stack solution? Let’s build something
          amazing together.
        </p>
        <a
          href="/contact"
          className="px-6 sm:px-8 py-3 sm:py-4 bg-black text-white rounded-full font-semibold hover:scale-105 transition-transform duration-300 shadow-lg inline-block text-sm sm:text-base"
        >
          Contact Me
        </a>
      </section>
    </div>
  );
};

export default About;
