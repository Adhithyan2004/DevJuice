import React from 'react'
import { Anton } from "next/font/google";

const anton = Anton({subsets: ["latin"],weight:'400'});

const LanHero = () => {
  return (
    <div>
        <div className='HroLan gap-4 flex flex-col p-2 mx-7 mb-28 mt-20 md:flex-row md:justify-between md:items-center md:mx-5 md:gap-6 xl:mx-10 2xl:mx-16 2xl:gap-20'>
            <h1 className={`${anton.className} text-3xl text-center md:text-left md:text-4xl text-[#00FF9C] md:leading-11 xl:text-5xl xl:leading-14 2xl`}>Because Great Design Starts with the Right Tools</h1>
            <p className='text-md text-center md:text-left md:text-lg xl:text-xl'>Handpicked UI libraries, color palettes, and branding resources so you can focus on making things pretty</p>
        </div>
    </div>
  )
}

export default LanHero
