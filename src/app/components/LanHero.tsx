import React from 'react';
import { Anton } from 'next/font/google';

const anton = Anton({ subsets: ['latin'], weight: '400' });

const LanHero = () => {
  return (
    <div className="mx-10 my-20 flex items-center justify-center gap-20 sm:mx-20 md:mx-30 lg:mx-16 lg:justify-between xl:mx-14 2xl:mx-20 2xl:justify-between">
      <div className="HroLan flex flex-col gap-4 md:items-center md:justify-between lg:w-[40vw] lg:items-start xl:items-start 2xl:w-[40vw] 2xl:items-start 2xl:justify-between">
        <h1
          className={`${anton.className} text-center text-3xl text-[#C5193F] sm:text-4xl sm:leading-11 md:text-center md:text-4xl md:leading-11 lg:text-left xl:text-5xl xl:leading-14`}
        >
          Too lazy to make my own. <br /> So I linked the best tools.
        </h1>
        <p className="text-md text-center font-semibold md:text-center md:text-lg lg:text-left xl:text-left xl:text-xl">
          Handpicked{' '}
          <span className="text-[#3C2F54]">UI libraries, color palettes</span> ,
          and <span className="text-[#3C2F54]">branding</span> resources so you
          can focus on making things pretty
        </p>
      </div>
      <div className="hidden rounded-lg border-2 border-dashed p-16 lg:block lg:p-12 xl:p-16 2xl:rounded-2xl 2xl:p-22">
        <p className="text-md xl:text-md text-center font-semibold lg:text-base">
          This side had a plan... <br />
          Then I remembered I&apos;m the one designing it.
        </p>
      </div>
    </div>
  );
};

export default LanHero;
