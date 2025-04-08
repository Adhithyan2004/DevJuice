import React from 'react';
import { Anton } from 'next/font/google';
import CatCard from './CatCard';
import { MdDesignServices } from 'react-icons/md';
import { BsBoxFill } from 'react-icons/bs';
import { SiCsswizardry, SiReact } from 'react-icons/si';
import { GiInspiration } from 'react-icons/gi';

const anton = Anton({ subsets: ['latin'], weight: '400' });

const Category = () => {
  return (
    <div className="flex flex-col 2xl:pt-20">
      <h1 className={`${anton.className} text-center text-3xl md:text-4xl`}>
        Browse By <span className="text-[#00CFFF]"> Categories </span>
      </h1>
      <div className="mx-4 my-8 flex flex-col justify-center gap-5 p-8 text-white sm:mx-6 sm:my-4 md:mx-2 md:flex-row md:flex-wrap lg:gap-10 xl:gap-5 2xl:justify-center 2xl:gap-10">
        <CatCard icon={<MdDesignServices size={80} />} title="UiUx" />
        <CatCard icon={<SiCsswizardry size={80} />} title="CSS" />
        <CatCard icon={<SiReact size={80} />} title="React" />
        <CatCard icon={<BsBoxFill size={80} />} title="Mockups" />
        <CatCard icon={<GiInspiration size={80} />} title="Inspos" />
      </div>
    </div>
  );
};

export default Category;
