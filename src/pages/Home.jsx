import React, { useContext } from "react";
import HomeHeroText from "../components/home/HomeHeroText";
import HomeBottomText from "../components/home/HomeBottomText";
import { ThemeContext } from "../context/ThemeContext";

const Home = () => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  return (
    <div
      className={`relative min-h-screen w-screen overflow-hidden flex flex-col transition-colors duration-500`}
      style={{ color: isDark ? "#ffffff" : "#1f2937" }}
    >
      {/* Background Gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: isDark
            ? "linear-gradient(to bottom, #101010, #0a0a0a)"
            : "linear-gradient(to bottom, #f9fafb, #e6eef9)",
        }}
      ></div>

      {/* Vignette Overlay for Depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isDark
            ? "radial-gradient(circle at center, transparent 80%, rgba(0,0,0,0.5) 100%)"
            : "radial-gradient(circle at center, transparent 80%, rgba(0,0,0,0.1) 100%)",
        }}
      ></div>

      {/* Decorative Blurred Accent Blobs */}
      <div
        className="absolute top-[-15%] left-[-15%] w-[450px] h-[450px] rounded-full blur-[220px] animate-pulse-slow"
        style={{
          backgroundColor: isDark
            ? "rgba(78,158,255,0.15)"
            : "rgba(59,130,246,0.2)",
        }}
      ></div>
      <div
        className="absolute bottom-[-15%] right-[-15%] w-[450px] h-[450px] rounded-full blur-[220px] animate-pulse-slower"
        style={{
          backgroundColor: isDark
            ? "rgba(59,130,246,0.1)"
            : "rgba(37,99,235,0.15)",
        }}
      ></div>

      {/* Optional Soft Noise Texture */}
      <div
        className="absolute inset-0 opacity-5 mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: "url('/textures/noise.png')",
          backgroundSize: "200px",
        }}
      ></div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col justify-between flex-1 px-6 lg:px-12">
        <HomeHeroText />
        <HomeBottomText />
      </div>
    </div>
  );
};

export default Home;
