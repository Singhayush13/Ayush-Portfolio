// src/pages/Contact.jsx
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { FaInstagram, FaLinkedin } from "react-icons/fa";

const Contact = () => {
  const containerRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );

    gsap.fromTo(
      formRef.current,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 1.1, ease: "power3.out", delay: 0.3 }
    );
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex flex-col items-center justify-center px-6 py-20 bg-black text-white"
    >
      {/* Heading */}
      <h1 className="text-5xl md:text-6xl font-extrabold mb-6 uppercase tracking-tight">
        Let’s Connect
      </h1>
      <p className="max-w-2xl text-gray-400 text-center mb-12 text-lg leading-relaxed">
        I’d love to hear from you! Whether you have a question, want to
        collaborate, or just say hi — drop me a message below.
      </p>

      {/* Social Links */}
      <div className="flex space-x-10 mb-14">
        <a
          href="https://www.instagram.com/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          className="text-4xl text-gray-400 hover:text-pink-500 hover:scale-125 transition-all duration-300"
        >
          <FaInstagram />
        </a>
        <a
          href="https://www.linkedin.com/in/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          className="text-4xl text-gray-400 hover:text-blue-500 hover:scale-125 transition-all duration-300"
        >
          <FaLinkedin />
        </a>
      </div>

      {/* Contact Form */}
      <form
        ref={formRef}
        className="w-full max-w-lg bg-neutral-900 p-10 rounded-2xl shadow-lg border border-gray-800 space-y-6"
      >
        <div>
          <label className="block text-gray-300 font-medium mb-2">Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full px-4 py-3 rounded-lg bg-black text-white border border-gray-700 focus:ring-2 focus:ring-[#D3FD50] outline-none transition"
          />
        </div>

        <div>
          <label className="block text-gray-300 font-medium mb-2">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-3 rounded-lg bg-black text-white border border-gray-700 focus:ring-2 focus:ring-[#D3FD50] outline-none transition"
          />
        </div>

        <div>
          <label className="block text-gray-300 font-medium mb-2">Message</label>
          <textarea
            rows="5"
            placeholder="Type your message..."
            className="w-full px-4 py-3 rounded-lg bg-black text-white border border-gray-700 focus:ring-2 focus:ring-[#D3FD50] outline-none transition"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#D3FD50] text-black py-3 rounded-lg font-semibold hover:scale-[1.03] hover:shadow-lg transition-all duration-300"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;
