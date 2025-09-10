// src/pages/Contact.jsx
import React, { useEffect, useRef, useContext } from "react";
import { gsap } from "gsap";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { ThemeContext } from "../context/ThemeContext";

const Contact = () => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const containerRef = useRef(null);
  const formRef = useRef(null);
  const socialRef = useRef(null);

  // Theme colors
  const colors = {
    dark: {
      bg: "#0a0a0a",
      text: "#cfcfcf",
      inputBg: "#1a1a1a",
      inputBorder: "#2c2c2c",
      focusRing: "#f59e0b", // amber
      buttonBg: "#f59e0b",
      buttonText: "#000000",
      socialHoverInstagram: "#ec4899",
      socialHoverLinkedin: "#3b82f6",
    },
    light: {
      bg: "#f9fafb",
      text: "#1f2937",
      inputBg: "#ffffff",
      inputBorder: "#d1d5db",
      focusRing: "#2563eb", // professional blue
      buttonBg: "#2563eb",
      buttonText: "#ffffff",
      socialHoverInstagram: "#ec4899",
      socialHoverLinkedin: "#2563eb",
    },
  };

  const themeColors = isDark ? colors.dark : colors.light;

  useEffect(() => {
    // Animate container
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );

    // Animate form
    gsap.fromTo(
      formRef.current,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 1.1, ease: "power3.out", delay: 0.3 }
    );

    // Animate social icons
    gsap.fromTo(
      socialRef.current.querySelectorAll("a"),
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.15, duration: 0.8, ease: "power3.out", delay: 0.5 }
    );
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex flex-col items-center justify-start px-6 py-20"
      style={{ backgroundColor: themeColors.bg, color: themeColors.text }}
    >
      {/* Heading */}
      <h1 className="text-5xl md:text-6xl mt-5 font-extrabold mb-4 uppercase tracking-tight text-center">
        Let’s Connect
      </h1>
      <p className="max-w-2xl text-center mb-12 text-lg leading-relaxed" style={{ color: themeColors.text }}>
        I’d love to hear from you! Whether you have a question, want to collaborate, or
        just say hi — drop me a message below.
      </p>

      {/* Social Links */}
      <div ref={socialRef} className="flex space-x-10 mb-14">
        <a
          href="https://www.instagram.com/singhayush13?igsh=amtpeHlxMzJnNG1r"
          target="_blank"
          rel="noopener noreferrer"
          className="text-4xl transition-all duration-300"
          style={{ color: themeColors.text }}
          onMouseEnter={(e) => (e.currentTarget.style.color = themeColors.socialHoverInstagram)}
          onMouseLeave={(e) => (e.currentTarget.style.color = themeColors.text)}
        >
          <FaInstagram />
        </a>
        <a
          href="https://www.linkedin.com/in/singhayush1356?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
          target="_blank"
          rel="noopener noreferrer"
          className="text-4xl transition-all duration-300"
          style={{ color: themeColors.text }}
          onMouseEnter={(e) => (e.currentTarget.style.color = themeColors.socialHoverLinkedin)}
          onMouseLeave={(e) => (e.currentTarget.style.color = themeColors.text)}
        >
          <FaLinkedin />
        </a>
      </div>

      {/* Contact Form */}
      <form
        ref={formRef}
        className="w-full max-w-lg p-10 rounded-2xl shadow-xl border space-y-6"
        style={{
          backgroundColor: themeColors.inputBg,
          borderColor: themeColors.inputBorder,
        }}
      >
        {["Name", "Email", "Message"].map((label) => (
          <div key={label}>
            <label className="block font-medium mb-2" style={{ color: themeColors.text }}>
              {label}
            </label>
            {label === "Message" ? (
              <textarea
                rows="5"
                placeholder={`Type your ${label.toLowerCase()}...`}
                className="w-full px-4 py-3 rounded-lg outline-none transition duration-300"
                style={{
                  backgroundColor: themeColors.inputBg,
                  border: `1px solid ${themeColors.inputBorder}`,
                  color: themeColors.text,
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = themeColors.focusRing}
                onBlur={(e) => e.currentTarget.style.borderColor = themeColors.inputBorder}
              />
            ) : (
              <input
                type={label === "Email" ? "email" : "text"}
                placeholder={`Enter your ${label.toLowerCase()}`}
                className="w-full px-4 py-3 rounded-lg outline-none transition duration-300"
                style={{
                  backgroundColor: themeColors.inputBg,
                  border: `1px solid ${themeColors.inputBorder}`,
                  color: themeColors.text,
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = themeColors.focusRing}
                onBlur={(e) => e.currentTarget.style.borderColor = themeColors.inputBorder}
              />
            )}
          </div>
        ))}

        <button
          type="submit"
          className="w-full py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-[1.05] hover:shadow-lg"
          style={{
            backgroundColor: themeColors.buttonBg,
            color: themeColors.buttonText,
          }}
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;
