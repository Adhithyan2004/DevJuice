import React from 'react'
import { Anton } from "next/font/google";
import CatCard from './CatCard';
import { MdDesignServices } from "react-icons/md";
import { BsBoxFill } from "react-icons/bs";
import { SiCsswizardry, SiReact } from "react-icons/si";
import { GiInspiration } from "react-icons/gi";


const anton = Anton({subsets: ["latin"],weight:'400'});

const Category = () => {
  return (
    <div className='flex flex-col gap-3'>
      <h1 className={`${anton.className} text-4xl text-center`}>Browse By Categories</h1>
    <div className='text-white flex gap-5 justify-center my-6'>
        <CatCard icon={<MdDesignServices size={80} />} title='UiUx'/>
        <CatCard icon={<SiCsswizardry size={80} />} title='CSS'/>
        <CatCard icon={<SiReact size={80} />} title='React'/>
        <CatCard icon={<BsBoxFill size={80} />} title='Mockups'/>
        <CatCard icon={<GiInspiration size={80} />} title='Inspos'/>
    </div>
    </div>
  )
}

export default Category
