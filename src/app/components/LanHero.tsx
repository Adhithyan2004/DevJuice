import React from 'react';
import { Anton } from 'next/font/google';

const anton = Anton({ subsets: ['latin'], weight: '400' });

const LanHero = () => {
  return (
    <div className="mx-20 my-30 flex items-center justify-between gap-20 ">
      <div className="HroLan flex flex-col gap-4 md:items-center md:justify-between">
        <h1
          className={`${anton.className} text-center text-3xl text-[#00FF9C] md:text-left md:text-4xl md:leading-11 xl:text-5xl xl:leading-14 2xl:w-[40vw]`}
        >
          Great Design Starts with the Right Tools.
        </h1>
        <p className="text-md text-center md:text-center md:text-lg lg:text-left xl:text-xl xl:text-left xl:w-[45vw] 2xl:w-[40vw]">
          Handpicked UI{' '}
          <span className="text-[#00FF9C]">libraries, color palettes</span> ,
          and <span className="text-[#00FF9C]">branding</span> resources so you
          can focus on making things pretty
        </p>
      </div>
      <div className="hidden rounded-lg border-1 border-dotted border-[#00FF9C] p-16 lg:block lg:p-12 xl:p-16 2xl:p-16">
        <p className="text-md text-center">
          Welcome to the right side of the header. <br /> Here we have a
          sophisticated mix of intentional whitespace <br />
          and artistic procrastination. (I'm experiencing creative block.){' '}
        </p>
      </div>
    </div>
  );
};

export default LanHero;
