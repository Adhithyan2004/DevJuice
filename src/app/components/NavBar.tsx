'use client';

import React from 'react';
import { Anton } from 'next/font/google';
import { useRouter } from 'next/navigation';

const anton = Anton({ subsets: ['latin'], weight: '400' });
const NavBar = () => {
  const router = useRouter();

  return (
    <nav>
      <div className="mx-2 flex items-center justify-between p-4 text-white md:mx-5 lg:mx-6 xl:mx-10 2xl:mx-16">
        <h1
          className={`${anton.className} text-2xl text-[#00FF9C] md:text-3xl`}
        >
          DevJuice
        </h1>
        <div className="flex gap-4">
          <button
            onClick={() => router.push('/add-tool')}
            className={`${anton.className} text-md rounded-md border-2 border-white from-[#15B392] via-[#73EC8B] to-[#D2FF72] p-2 text-white transition-colors duration-200 hover:border-2 hover:border-black hover:bg-gradient-to-r hover:text-black md:p-3 lg:text-lg`}
          >
            Add Tools
          </button>
          <button
            className={`${anton.className} text-md rounded-md border-2 border-white from-[#15B392] via-[#73EC8B] to-[#D2FF72] p-2 text-white transition-colors duration-200 hover:border-2 hover:border-black hover:bg-gradient-to-r hover:text-black md:p-3 lg:text-lg`}
          >
            Contribute
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
