// src/pages/Contact.jsx
import React, { useEffect, useRef, useContext, useCallback, useState } from "react";
import { gsap } from "gsap";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { ThemeContext } from "../context/ThemeContext";
import emailjs from "@emailjs/browser";
import { Helmet } from "react-helmet-async";

const Contact = () => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const containerRef = useRef(null);
  const formRef = useRef(null);
  const socialRef = useRef(null);
  const toastRef = useRef(null);
  const headerRef = useRef(null);

  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  const colors = {
    dark: {
      bg: "#0a0a0a",
      text: "#cfcfcf",
      inputBg: "#1a1a1a",
      inputBorder: "#2c2c2c",
      focusRing: "#f59e0b",
      buttonBg: "#f59e0b",
      buttonText: "#000000",
      socialHoverInstagram: "#ec4899",
      socialHoverLinkedin: "#3b82f6",
      toastSuccess: "#16a34a",
      toastError: "#dc2626",
    },
    light: {
      bg: "#f9fafb",
      text: "#1f2937",
      inputBg: "#ffffff",
      inputBorder: "#d1d5db",
      focusRing: "#2563eb",
      buttonBg: "#2563eb",
      buttonText: "#ffffff",
      socialHoverInstagram: "#ec4899",
      socialHoverLinkedin: "#2563eb",
      toastSuccess: "#16a34a",
      toastError: "#dc2626",
    },
  };

  const themeColors = isDark ? colors.dark : colors.light;

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // GSAP page animations
  useEffect(() => {
    if (!containerRef.current || !formRef.current || !socialRef.current) return;

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

    gsap.fromTo(
      socialRef.current.querySelectorAll("a"),
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.15, duration: 0.8, ease: "power3.out", delay: 0.5 }
    );
  }, []);

  // Toast animation
  const showToast = (message, type = "success") => {
    // Scroll to header when showing toast
    if (headerRef.current) {
      headerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    setToastMessage(message);
    setToastType(type);

    if (!toastRef.current) return;

    gsap.fromTo(
      toastRef.current,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }
    );

    setTimeout(() => {
      if (toastRef.current)
        gsap.to(toastRef.current, { y: -20, opacity: 0, duration: 0.5, ease: "power3.in" });
    }, 3000);
  };

  // EmailJS send function
  const sendEmail = useCallback(
    (e) => {
      e.preventDefault();
      if (!formRef.current) return;

      // Scroll to top before showing toast
      window.scrollTo({ top: 0, behavior: "smooth" });

      emailjs
        .sendForm(
          "service_rh08wuq",
          "template_kwkw97u",
          formRef.current,
          "UoAD20IR5Ag4lhXet"
        )
        .then(
          () => {
            formRef.current.reset();
            showToast("Message Sent Successfully!", "success");
          },
          (error) => {
            console.error("EmailJS Error:", error.text);
            showToast("Failed to Send Message!", "error");
          }
        );
    },
    [formRef]
  );

  return (
    <>
      <Helmet>
        <title>Contact Me | Ayush Singh</title>
        <meta
          name="description"
          content="Get in touch with Ayush Singh. Whether you have a question, want to collaborate, or just say hi, drop a message here."
        />
      </Helmet>

      <section
        ref={containerRef}
        className="page-container min-h-screen flex flex-col items-center justify-start py-20 px-4"
        style={{ backgroundColor: themeColors.bg, color: themeColors.text }}
        aria-label="Contact Section"
      >
        {/* Toast notification near header */}
        {toastMessage && (
          <div
            ref={toastRef}
            className={`absolute px-6 py-3 rounded-lg text-white font-semibold shadow-lg mb-6`}
            style={{
              backgroundColor: toastType === "success" ? themeColors.toastSuccess : themeColors.toastError,
              top: "80px",
              zIndex: 50,
            }}
          >
            {toastMessage}
          </div>
        )}

        <header ref={headerRef} className="text-center max-w-3xl mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold uppercase">
            Let’s Connect
          </h1>
          <p className="mt-4 text-lg leading-relaxed">
            I’d love to hear from you! Whether you have a question, want to collaborate, or just say hi — drop me a message below.
          </p>
        </header>

        {/* Social Icons */}
        <nav ref={socialRef} className="flex space-x-10 mb-12" aria-label="Social Media Links">
          {[{
            href: "https://www.instagram.com/singhayush13?igsh=amtpeHlxMzJnNG1r",
            icon: <FaInstagram />,
            label: "Instagram",
            hoverColor: themeColors.socialHoverInstagram
          },{
            href: "https://www.linkedin.com/in/singhayush1356",
            icon: <FaLinkedin />,
            label: "LinkedIn",
            hoverColor: themeColors.socialHoverLinkedin
          }].map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="text-3xl md:text-4xl transition-colors duration-300"
              style={{ color: themeColors.text }}
              onMouseEnter={(e) => (e.currentTarget.style.color = social.hoverColor)}
              onMouseLeave={(e) => (e.currentTarget.style.color = themeColors.text)}
            >
              {social.icon}
            </a>
          ))}
        </nav>

        {/* Contact Form */}
        <form
          ref={formRef}
          onSubmit={sendEmail}
          className="w-full max-w-2xl p-8 rounded-2xl shadow-xl border space-y-5 transition-colors duration-300"
          style={{
            backgroundColor: themeColors.inputBg,
            borderColor: themeColors.inputBorder,
          }}
        >
          {[{ label: "Name", name: "user_name", type: "text" },
            { label: "Email", name: "user_email", type: "email" },
            { label: "Message", name: "message", type: "textarea" },
          ].map((field) => (
            <div key={field.label}>
              <label className="block font-medium mb-2" style={{ color: themeColors.text }}>
                {field.label}
              </label>
              {field.type === "textarea" ? (
                <textarea
                  name={field.name}
                  rows={5}
                  placeholder={`Type your ${field.label.toLowerCase()}...`}
                  className="w-full px-4 py-3 rounded-lg outline-none transition duration-300"
                  style={{
                    backgroundColor: themeColors.inputBg,
                    border: `1px solid ${themeColors.inputBorder}`,
                    color: themeColors.text,
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = themeColors.focusRing)}
                  onBlur={(e) => (e.currentTarget.style.borderColor = themeColors.inputBorder)}
                  required
                />
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  placeholder={`Enter your ${field.label.toLowerCase()}`}
                  className="w-full px-4 py-3 rounded-lg outline-none transition duration-300"
                  style={{
                    backgroundColor: themeColors.inputBg,
                    border: `1px solid ${themeColors.inputBorder}`,
                    color: themeColors.text,
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = themeColors.focusRing)}
                  onBlur={(e) => (e.currentTarget.style.borderColor = themeColors.inputBorder)}
                  required
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
      </section>
    </>
  );
};

export default Contact;
