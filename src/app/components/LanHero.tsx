import React from 'react'
import { Anton } from "next/font/google";

const anton = Anton({subsets: ["latin"],weight:'400'});

const LanHero = () => {
  return (
    <div>
        <div className='HroLan gap-7 flex flex-col p-4 mx-10 my-28'>
            <h1 className={`${anton.className} text-5xl leading-14 w-[45vw] text-[#00FF9C]`}>Because Great Design Starts with the Right Tools</h1>
            <p className='w-[45vw] text-lg'>Handpicked UI libraries, color palettes, and branding resources so you can focus on making things pretty</p>
        </div>
    </div>
  )
}

export default LanHero
