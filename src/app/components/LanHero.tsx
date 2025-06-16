'use client';
import React from 'react';
import { FaStar } from 'react-icons/fa';

const LanHero = () => {
  const scrollToBrowse = () => {
    const section = document.getElementById('browse-tools');
    section?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="mx-10 my-10 flex flex-col items-center gap-5 lg:my-20 xl:mx-10 xl:my-32 xl:mb-32 2xl:my-40">
      <h1 className="text-center text-3xl font-semibold text-white drop-shadow-[0_5px_10px_#A363FF47] md:text-4xl lg:text-5xl xl:text-6xl">
        A Curated Collection of
        <br />
        <span className="radial_gra">Developer Tools</span> That Just Work.
      </h1>
      <p className="hidden text-center text-sm text-white sm:block md:text-lg xl:text-xl">
        Handpicked{' '}
        <span className="text-[#B547FF]">UI libraries, color palettes</span> ,
        and <span className="text-[#B547FF]">branding</span> resources <br /> so
        you can focus on making things pretty
      </p>
      <div className="flex flex-col gap-3 sm:flex-row md:gap-5 xl:gap-6">
        <button
          onClick={scrollToBrowse}
          className="cta-button px-2 py-2 xl:px-3 xl:py-2"
        >
          Browse Tools
        </button>
        <a
          href="https://github.com/Adhithyan2004/devJuice"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="cta-button flex items-center gap-1 px-2 py-2 xl:px-3 xl:py-2">
            <FaStar color="#B547FF" /> Star on Github
          </button>
        </a>
      </div>
    </div>
  );
};

export default LanHero;
