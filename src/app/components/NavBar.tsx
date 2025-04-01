"use client"

import React from 'react'
import { Anton } from "next/font/google";
import { useRouter } from 'next/navigation';

const anton = Anton({subsets: ["latin"],weight:'400'});
const NavBar = () => {

  const router = useRouter();

  return (
      <nav>
        <div className='flex p-4 mx-10 justify-between items-center text-white'>
        <h1 className={`${anton.className} text-3xl text-[#00FF9C]`}>DevJuice</h1>
        <div className='flex gap-5'>
        <button onClick={()=> router.push("/add-tool")}  className={`${anton.className} p-3 border-2 border-white text-lg text-white rounded-md  hover:bg-gradient-to-r from-[#15B392] via-[#73EC8B] to-[#D2FF72] hover:border-2 hover:border-black hover:text-black transition-colors duration-200`}>Add Tools</button>
        <button className={`${anton.className} p-3 border-2 border-white text-lg text-white rounded-md  hover:bg-gradient-to-r from-[#15B392] via-[#73EC8B] to-[#D2FF72] hover:border-2 hover:border-black hover:text-black transition-colors duration-200`}>Contribute</button>
        </div>
        </div>
      </nav>
  )
}

export default NavBar
