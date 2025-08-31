import React from 'react'
import { Link } from 'react-router-dom'

const HomeBottomText = () => {
  return (
    <div className='font-[font2] flex flex-col lg:flex-row items-center justify-center gap-6 relative'>
      
      {/* About / Tagline */}
      <p className='absolute lg:w-[20vw] w-72 lg:right-20 right-2 bottom-28 lg:bottom-72 font-[font1] lg:text-lg text-xs lg:leading-relaxed leading-tight text-gray-300'>
        Passionate Frontend Developer & Creative Designer — crafting digital experiences that spark imagination and leave lasting impact. Always pushing boundaries, one pixel at a time.
      </p>

      {/* Buttons */}
      <div className='flex gap-4'>
        <div className='lg:border-3 border-2 border-white rounded-full uppercase transition-all duration-300 hover:border-[#D3FD50] hover:text-[#D3FD50] lg:h-44 flex items-center justify-center px-6 lg:px-14 cursor-pointer'>
          <Link className='text-[6vw] lg:mt-6' to='/projects'>
            Projects
          </Link>
        </div>
        
        <div className='lg:border-3 border-2 border-white rounded-full uppercase transition-all duration-300 hover:border-[#D3FD50] hover:text-[#D3FD50] lg:h-44 flex items-center justify-center px-6 lg:px-14 cursor-pointer'>
          <Link className='text-[6vw] lg:mt-6' to='/about'>
            About Me
          </Link>
        </div>
      </div>
    </div>
  )
}

export default HomeBottomText
