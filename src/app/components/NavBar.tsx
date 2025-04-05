"use client"

import React from 'react'
import { Anton } from "next/font/google";
import { useRouter } from 'next/navigation';

const anton = Anton({subsets: ["latin"],weight:'400'});
const NavBar = () => {

  const router = useRouter();

  return (
      <nav>
        <div className='flex p-4  mx-2 justify-between items-center text-white md:mx-5 lg:mx-6 xl:mx-10 2xl:mx-16'>
        <h1 className={`${anton.className} text-2xl md:text-3xl text-[#00FF9C]`}>DevJuice</h1>
        <div className='flex gap-4'>
        <button onClick={()=> router.push("/add-tool")}  className={`${anton.className} p-2 border-2 border-white text-md text-white rounded-md  hover:bg-gradient-to-r from-[#15B392] via-[#73EC8B] to-[#D2FF72] hover:border-2 hover:border-black hover:text-black transition-colors duration-200 md:p-3 lg:text-lg`}>Add Tools</button>
        <button className={`${anton.className} p-2 border-2 border-white text-md text-white rounded-md  hover:bg-gradient-to-r from-[#15B392] via-[#73EC8B] to-[#D2FF72] hover:border-2 hover:border-black hover:text-black transition-colors duration-200 md:p-3 lg:text-lg`}>Contribute</button>
        </div>
        </div>
      </nav>
  )
}

export default NavBar
