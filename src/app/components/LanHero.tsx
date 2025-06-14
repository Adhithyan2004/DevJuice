'use client';
import React from 'react';
import { FaStar } from 'react-icons/fa';

const LanHero = () => {
  const scrollToBrowse = () => {
    const section = document.getElementById('browse-tools');
    section?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="mx-10 my-40 mb-32 flex flex-col items-center gap-5">
      <h1 className="text-center text-6xl font-semibold text-white drop-shadow-[0_5px_10px_#A363FF47]">
        A Curated Collection of
        <br />
        <span className="radial_gra">Developer Tools</span> That Just Work.
      </h1>
      <p className="text-center text-xl text-white">
        Handpicked{' '}
        <span className="text-[#B547FF]">UI libraries, color palettes</span> ,
        and <span className="text-[#B547FF]">branding</span> resources <br /> so
        you can focus on making things pretty
      </p>
      <div className="flex gap-6">
        <button onClick={scrollToBrowse} className="cta-button">
          Browse Tools
        </button>
        <a
          href="https://github.com/Adhithyan2004/devJuice"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="cta-button flex items-center gap-2">
            <FaStar color="#B547FF" /> Star on Github
          </button>
        </a>
      </div>
    </div>
  );
};

export default LanHero;
