import React from 'react';
import { AiFillThunderbolt } from 'react-icons/ai';
import { FaUserGroup } from 'react-icons/fa6';
import { TiTick } from 'react-icons/ti';
import { DiOpensource } from 'react-icons/di';

const Bento = () => {
  return (
    <div className="mx-28 my-24 hidden h-[76vh] grid-cols-12 grid-rows-12 gap-3 text-white xl:grid">
      <div className="Fast glass-card bento col-span-4 flex flex-col justify-center gap-4 p-6">
        <AiFillThunderbolt
          size={100}
          color="#B547FF"
          className="mr-auto ml-auto"
        />
        <div className="flex flex-col gap-1">
          <h2 className="radial_gra text-2xl font-bold">
            Fast, Minimal Interface
          </h2>
          <p>
            Built for speed and focus.No ads, no clutter, just a clean space to
            discover the right tools, effortlessly.
          </p>
        </div>
      </div>
      <div className="Com bento glass-card col-span-8 flex flex-col justify-center gap-4 p-6">
        <FaUserGroup size={100} color="#B547FF" className="mr-auto ml-auto" />
        <div>
          <h2 className="radial_gra text-2xl font-bold">Community Curated</h2>
          <p>
            Every tool featured on DevJuice is added with care — no automated
            scraping, no random GitHub links.Each submission is reviewed to
            ensure it's genuinely useful for developers, designers, or indie
            makers.
          </p>
        </div>
      </div>
      <div className="Test bento glass-card col-span-8 flex flex-col justify-center gap-4 p-6">
        <TiTick size={100} color="#B547FF" className="mr-auto ml-auto" />
        <div>
          <h2 className="radial_gra text-2xl font-bold">
            Dev-Tested & Actually Useful
          </h2>
          <p>
            This isn't just another list of tools.Every item here has a clear
            purpose — whether it's speeding up your workflow, generating better
            UI, or solving niche dev problems.
          </p>
        </div>
      </div>
      <div className="Open glass-card bento col-span-4 flex flex-col justify-center gap-4 p-6">
        <DiOpensource size={100} color="#B547FF" className="mr-auto ml-auto" />
        <div>
          <h2 className="radial_gra text-2xl font-bold">Open Source </h2>
          <p>
            Built in public. Shaped by devs.Contribute tools, suggest features,
            or just follow the journey from day one.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Bento;
