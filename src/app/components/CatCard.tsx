import React from 'react'
import { Anton } from "next/font/google";
import Link from "next/link";

const anton = Anton({subsets: ["latin"],weight:'400'});

interface CatCardProps{
  icon:React.ReactNode;
  title:string;
}

const CatCard:React.FC<CatCardProps> = ({icon,title}) => {
 
  return (
  
    <Link  href={`/categories/${title.toLowerCase()}`} passHref className={`${anton.className} flex flex-col gap-2 border-1 px-14 py-8 items-center  border-[#00FF9C] rounded-lg hover:bg-gradient-to-tr from-[#15B392] via-[#73EC8B] to-[#D2FF72]  hover:border-1 hover:border-black hover:text-black transition-colors duration-400 md:px-11 lg:px-13`}>
      <p className='p-3'>{icon}</p>
      <h1 className='text-3xl'>{title}</h1>
    </Link>
  )
}

export default CatCard
