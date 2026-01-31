import React, { useEffect, useRef, useContext, useCallback, useState } from "react";
import { gsap } from "gsap";
import { FaInstagram, FaLinkedin, FaPaperPlane } from "react-icons/fa";
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
      bg: "#080808",
      text: "#ffffff",
      accent: "#3b82f6",
      inputBg: "rgba(255, 255, 255, 0.03)",
      inputBorder: "rgba(255, 255, 255, 0.1)",
      toastSuccess: "#10b981",
      toastError: "#ef4444",
    },
    light: {
      bg: "#f8fafc",
      text: "#0f172a",
      accent: "#2563eb",
      inputBg: "rgba(0, 0, 0, 0.02)",
      inputBorder: "rgba(0, 0, 0, 0.1)",
      toastSuccess: "#059669",
      toastError: "#dc2626",
    },
  };

  const themeColors = isDark ? colors.dark : colors.light;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline();
    tl.fromTo(".contact-reveal", 
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "expo.out" }
    )
    .fromTo(".input-animate",
      { x: -20, opacity: 0 },
      { x: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: "power3.out" },
      "-=0.5"
    );
  }, []);

  const showToast = (message, type = "success") => {
    setToastMessage(message);
    setToastType(type);

    gsap.fromTo(toastRef.current,
      { y: 50, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" }
    );

    setTimeout(() => {
      if (toastRef.current)
        gsap.to(toastRef.current, { opacity: 0, scale: 0.9, duration: 0.4 });
    }, 4000);
  };

  const sendEmail = useCallback((e) => {
    e.preventDefault();
    if (!formRef.current) return;

    emailjs.sendForm(
      "service_rh08wuq",
      "template_kwkw97u",
      formRef.current,
      "UoAD20IR5Ag4lhXet"
    )
    .then(() => {
      formRef.current.reset();
      showToast("Message Sent Successfully!", "success");
    }, (error) => {
      console.error(error.text);
      showToast("Failed to Send Message!", "error");
    });
  }, []);

  return (
    <>
      <Helmet>
        <title>Contact Me | Ayush Singh</title>
      </Helmet>

      <section
        ref={containerRef}
        className="relative min-h-screen flex items-center justify-center py-24 px-6 overflow-hidden"
        style={{ backgroundColor: themeColors.bg, color: themeColors.text }}
      >
        {/* RUNNING BACKGROUND (Mesh Sync) */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="mesh-gradient absolute inset-0 opacity-30 dark:opacity-10" />
          <div className="grainy-bg absolute inset-0 opacity-[0.03] mix-blend-overlay" />
        </div>

        <div className="relative z-10 w-full max-w-6xl grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Content */}
          <div className="space-y-10">
            <div className="contact-reveal">
              <span className="text-blue-500 font-mono text-sm font-bold tracking-[0.3em] uppercase block mb-4">Available for projects</span>
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9]">
                LET'S <br /> <span className="italic opacity-50">START</span> SOMETHING.
              </h1>
              <p className="mt-8 text-lg opacity-60 max-w-md font-medium leading-relaxed">
                Have a concept or a business challenge? I'm here to help you solve it with world-class engineering and design.
              </p>
            </div>

            <div className="contact-reveal space-y-6">
              <div className="group cursor-pointer">
                <span className="text-[10px] font-black uppercase tracking-widest opacity-40 block mb-1">Email Me</span>
                <a href="mailto:singhayushrs13@gmail.com" className="text-2xl font-bold hover:text-blue-500 transition-colors duration-300">singhayushrs13@gmail.com</a>
              </div>
              
              <div ref={socialRef} className="flex gap-6">
                {[
                  { href: "https://www.instagram.com/singhayush13", icon: <FaInstagram />, label: "Instagram" },
                  { href: "https://www.linkedin.com/in/singhayush1356", icon: <FaLinkedin />, label: "LinkedIn" }
                ].map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" 
                     className="w-12 h-12 rounded-full border border-current border-opacity-10 flex items-center justify-center text-xl hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-all duration-500">
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="contact-reveal relative">
            <form
              ref={formRef}
              onSubmit={sendEmail}
              className="relative p-10 rounded-[2rem] border backdrop-blur-3xl space-y-8 overflow-hidden"
              style={{ backgroundColor: themeColors.inputBg, borderColor: themeColors.inputBorder }}
            >
              <div className="grid md:grid-cols-2 gap-8">
                <div className="input-animate">
                  <label className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-2 block">Name</label>
                  <input type="text" name="user_name" placeholder="John Doe" required
                         className="w-full bg-transparent border-b border-current border-opacity-10 py-3 outline-none focus:border-blue-500 transition-colors" />
                </div>
                <div className="input-animate">
                  <label className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-2 block">Email</label>
                  <input type="email" name="user_email" placeholder="john@example.com" required
                         className="w-full bg-transparent border-b border-current border-opacity-10 py-3 outline-none focus:border-blue-500 transition-colors" />
                </div>
              </div>

              <div className="input-animate">
                <label className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-2 block">Message</label>
                <textarea name="message" rows={4} placeholder="What's on your mind?" required
                          className="w-full bg-transparent border-b border-current border-opacity-10 py-3 outline-none focus:border-blue-500 transition-colors resize-none" />
              </div>

              <button
                type="submit"
                className="group relative w-full py-6 bg-blue-600 rounded-2xl overflow-hidden text-white font-black uppercase tracking-[0.2em] text-xs transition-transform active:scale-95"
              >
                <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-500 opacity-20" />
                <span className="relative z-10 flex items-center justify-center gap-3">
                  Send Message <FaPaperPlane className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </span>
              </button>
            </form>
          </div>
        </div>

        {/* Global Professional Toast */}
        {toastMessage && (
          <div
            ref={toastRef}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] px-8 py-4 rounded-full shadow-2xl flex items-center gap-4 backdrop-blur-xl border border-white/10"
            style={{ backgroundColor: toastType === "success" ? themeColors.toastSuccess : themeColors.toastError }}
          >
            <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span className="text-white font-black text-[10px] uppercase tracking-widest">{toastMessage}</span>
          </div>
        )}
      </section>

      <style jsx>{`
        .mesh-gradient {
          background-image: 
            radial-gradient(at 0% 0%, hsla(225, 100%, 57%, 0.3) 0, transparent 50%), 
            radial-gradient(at 100% 100%, hsla(270, 100%, 57%, 0.3) 0, transparent 50%);
          filter: blur(100px);
          animation: meshFlow 20s infinite alternate;
        }
        @keyframes meshFlow {
          0% { transform: scale(1) translate(0,0); }
          100% { transform: scale(1.2) translate(5%, 5%); }
        }
        .grainy-bg {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }
      `}</style>
    </>
  );
};

export default Contact;