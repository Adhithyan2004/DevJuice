'use client';

import React from 'react';
import { Anton } from 'next/font/google';
import { useRouter } from 'next/navigation';

const anton = Anton({ subsets: ['latin'], weight: '400' });
const NavBar = () => {
  const router = useRouter();

  return (
    <nav>
      <div className="mx-4 flex items-center justify-between py-4 text-white sm:mx-8 md:mx-10 lg:mx-16 xl:mx-14 2xl:mx-20">
        <h1 className={`${anton.className} text-2xl text-white md:text-3xl`}>
          DevJuice
        </h1>
        <div className="flex gap-4">
          <button
            onClick={() => router.push('/add-tool')}
            className={`${anton.className} text-md cursor-pointer rounded-md border-1 border-white px-3 py-2 text-white hover:border-[#00CFFF] hover:bg-[#00CFFF] hover:text-black md:px-4 md:py-2 lg:text-lg`}
          >
            Add Tools
          </button>
          <button
            className={`${anton.className} text-md md:py23 cursor-pointer rounded-md border-1 border-white px-3 py-2 text-white hover:border-[#00CFFF] hover:bg-[#00CFFF] hover:text-black md:px-4 lg:text-lg`}
          >
            Contribute
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
