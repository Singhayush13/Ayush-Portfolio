import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";

const About = () => {
  gsap.registerPlugin(ScrollTrigger);

  const imageDivRef = useRef(null);
  const imageRef = useRef(null);

  const imageArray = [
    "https://images.unsplash.com/photo-1603415526960-f7e0328d0a8f?q=80&w=800&auto=format",
    "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=800&auto=format",
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=800&auto=format",
  ];

  useGSAP(() => {
    gsap.to(imageDivRef.current, {
      scrollTrigger: {
        trigger: imageDivRef.current,
        start: "top 28%",
        end: "top -70%",
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          const index =
            self.progress < 1
              ? Math.floor(self.progress * imageArray.length)
              : imageArray.length - 1;
          imageRef.current.src = imageArray[index];
        },
      },
    });
  });

  return (
    <div className="font-[font2] bg-black text-white">
      {/* Hero */}
      <section className="h-screen flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-6xl lg:text-8xl font-bold uppercase">About Me</h1>
        <p className="mt-6 max-w-2xl text-lg text-gray-300">
          Hi, I’m Ayush Singh. A developer and creative mind turning ideas into
          modern, meaningful digital experiences.
        </p>
      </section>

      {/* Scroll Image Animation */}
      <section className="relative min-h-screen">
        <div
          ref={imageDivRef}
          className="absolute overflow-hidden lg:h-[25vw] h-[35vw] rounded-2xl lg:w-[20vw] w-[30vw] lg:top-96 -top-80 lg:left-[30vw] left-[30vw]"
        >
          <img
            ref={imageRef}
            className="h-full w-full object-cover"
            src={imageArray[0]}
            alt="Profile"
          />
        </div>

        <div className="relative">
          <h2 className="lg:mt-[55vh] mt-[30vh] text-[15vw] text-center uppercase leading-[13vw] font-bold text-[#D3FD50]">
            Who Am I?
          </h2>
          <p className="lg:pl-[40%] lg:mt-16 mt-6 p-4 lg:text-2xl text-lg leading-relaxed text-gray-300">
            I’m a curious, self-driven developer who loves building things that
            live on the internet — from sleek websites to interactive
            experiences. Always learning, always exploring.
          </p>
        </div>
      </section>

      {/* Skills */}
      <section className="py-24 px-6 bg-[#111]">
        <h2 className="text-4xl font-bold text-center mb-12">My Skills</h2>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <div className="p-8 bg-black/50 border border-white/10 rounded-2xl hover:scale-105 transition">
            <h3 className="text-2xl font-semibold mb-4 text-[#D3FD50]">
              Frontend
            </h3>
            <p>React, Next.js, Tailwind CSS — building modern UIs.</p>
          </div>
          <div className="p-8 bg-black/50 border border-white/10 rounded-2xl hover:scale-105 transition">
            <h3 className="text-2xl font-semibold mb-4 text-[#D3FD50]">
              Backend
            </h3>
            <p>Node.js, Express, MongoDB — scalable APIs & systems.</p>
          </div>
          <div className="p-8 bg-black/50 border border-white/10 rounded-2xl hover:scale-105 transition">
            <h3 className="text-2xl font-semibold mb-4 text-[#D3FD50]">
              Design
            </h3>
            <p>UI/UX, Figma, motion — blending creativity with usability.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[#D3FD50] text-black text-center">
        <h2 className="text-4xl font-bold mb-6">Let’s Connect</h2>
        <p className="max-w-xl mx-auto mb-8 text-lg">
          Have an idea or project? Let’s build something great together.
        </p>
        <a
          href="/contact"
          className="px-8 py-4 bg-black text-white rounded-full font-semibold hover:scale-105 transition"
        >
          Contact Me
        </a>
      </section>
    </div>
  );
};

export default About;
