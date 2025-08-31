import React from 'react'
import HomeHeroText from '../components/home/HomeHeroText'
import HomeBottomText from '../components/home/HomeBottomText'

const Home = () => {
  return (
    <div className="relative h-screen w-screen text-white overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/bgport.jpg')" }}
      ></div>

      {/* Overlay (optional for darkening image) */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-between h-full">
        <HomeHeroText />
        <HomeBottomText />
      </div>
    </div>
  )
}

export default Home
