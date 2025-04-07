import React from 'react';
import { Anton } from 'next/font/google';

const anton = Anton({ subsets: ['latin'], weight: '400' });

const LanHero = () => {
  return (
    <div className="2xl:12 mx-10 my-20 flex items-center justify-center gap-20 sm:mx-20 lg:mx-20 xl:mx-14">
      <div className="HroLan flex flex-col gap-4 md:items-center md:justify-between xl:items-start 2xl:items-start 2xl:justify-between">
        <h1
          className={`${anton.className} text-center text-3xl text-[#00FF9C] md:text-center md:text-4xl md:leading-11 lg:text-left xl:text-5xl xl:leading-14 2xl:w-[40vw]`}
        >
          Too lazy to make my own. <br /> So I linked the best tools for you.
        </h1>
        <p className="text-md text-center md:text-center md:text-lg lg:text-left xl:text-left xl:text-xl 2xl:w-[40vw]">
          Handpicked UI{' '}
          <span className="text-[#00FF9C]">libraries, color palettes</span> ,
          and <span className="text-[#00FF9C]">branding</span> resources so you
          can focus on making things pretty
        </p>
      </div>
      <div className="hidden p-16 lg:block lg:p-12 xl:p-16 2xl:p-20">
        <p className="text-center text-lg lg:text-base xl:text-lg">
          This side had a plan... <br />
          Then I remembered I'm the one designing it.
        </p>
      </div>
    </div>
  );
};

export default LanHero;
