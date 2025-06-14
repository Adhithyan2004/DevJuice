import React from 'react';
import CatCard from './CatCard';
import { MdDesignServices } from 'react-icons/md';
import { BsBox } from 'react-icons/bs';
import { SiCsswizardry, SiReact } from 'react-icons/si';
import { GiInspiration } from 'react-icons/gi';

const Category = () => {
  return (
    <div id="browse-tools" className="flex flex-col 2xl:pt-20">
      <h1 className="radial_gra text-center text-3xl font-semibold drop-shadow-[0_5px_10px_#A363FF47] md:text-4xl">
        Browse By <span className="text-white"> Categories </span>
      </h1>
      <div className="mx-4 my-8 flex justify-center gap-8 p-8">
        <CatCard
          icon={<MdDesignServices size={80} color="#B547FF" />}
          title="UiUx"
        />
        <CatCard
          icon={<SiCsswizardry size={80} color="#B547FF" />}
          title="CSS"
        />
        <CatCard icon={<SiReact size={80} color="#B547FF" />} title="React" />
        <CatCard icon={<BsBox size={80} color="#B547FF" />} title="Mockups" />
        <CatCard
          icon={<GiInspiration size={80} color="#B547FF" />}
          title="Inspos"
        />
      </div>
    </div>
  );
};

export default Category;
