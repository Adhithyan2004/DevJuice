import React from 'react';
import NavBar from './components/NavBar';
import LanHero from './components/LanHero';
import Category from './components/Category';
import Footer from './components/Footer';
import { Anton } from 'next/font/google';

const anton = Anton({ subsets: ['latin'], weight: '400' });

const page = () => {
  return (
    <div className="bg-gray-100 text-[#C5193F]">
      {/* <NavBar />
      <LanHero />
      <Category />
      <Footer /> */}
      <div className="flex h-screen w-full flex-col items-center justify-center gap-7 bg-gray-100 text-center">
        <h1 className={`${anton.className} text-4xl text-[#3C2F54]`}>
          Temporary Downtime - Free Tier Expired 🥲
        </h1>
        <div className="flex flex-col items-center justify-center">
          <p className="text-lg font-semibold">
            Backend was running on a free plan that just ended{' '}
            <span className="text-[#3C2F54]">(thanks capitalism).</span>
          </p>
          <p className="w-4xl text-center text-lg">
            Working on shifting to a new host, still open source, still broke,
            still building. <br />{' '}
            <span className="text-[#3C2F54]">DevJuice</span> will be back online
            shortly. Appreciate your patience!
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
