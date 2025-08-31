import React from "react";
import HomeHeroText from "../components/home/HomeHeroText";
import HomeBottomText from "../components/home/HomeBottomText";

const Home = () => {
  return (
    <div className="relative min-h-screen w-screen text-white overflow-hidden flex flex-col">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/bgport.jpg')" }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-between flex-1">
        <HomeHeroText />
        <HomeBottomText />
      </div>
    </div>
  );
};

export default Home;
