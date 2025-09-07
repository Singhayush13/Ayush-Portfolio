import React from "react";
import HomeHeroText from "../components/home/HomeHeroText";
import HomeBottomText from "../components/home/HomeBottomText";

const Home = () => {
  return (
    <div className="relative min-h-screen w-screen text-white overflow-hidden flex flex-col">
      {/* Deep Professional Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#080808] to-[#0a0a0a]"></div>

      {/* Subtle Vignette Overlay for Depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_80%,black_100%)] opacity-70 pointer-events-none"></div>

      {/* Decorative Blurred Accent Blobs */}
      <div className="absolute top-[-15%] left-[-15%] w-[450px] h-[450px] bg-[#4E9EFF]/15 rounded-full blur-[220px] animate-pulse-slow"></div>
      <div className="absolute bottom-[-15%] right-[-15%] w-[450px] h-[450px] bg-[#D3FD50]/12 rounded-full blur-[220px] animate-pulse-slower"></div>

      {/* Optional Soft Noise Texture (Gives "Premium" Look) */}
      <div className="absolute inset-0 opacity-5 mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: "url('/textures/noise.png')",
          backgroundSize: "200px",
        }}
      ></div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col justify-between flex-1">
        <HomeHeroText />
        <HomeBottomText />
      </div>
    </div>
  );
};

export default Home;
