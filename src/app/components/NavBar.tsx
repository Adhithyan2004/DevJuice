'use client';

import React from 'react';
import { Anton } from 'next/font/google';
import { useRouter } from 'next/navigation';
import { FaGithub } from 'react-icons/fa';

const anton = Anton({ subsets: ['latin'], weight: '400' });
const NavBar = () => {
  const router = useRouter();

  return (
    <nav>
      <div className="mx-4 flex items-center justify-between py-4 text-[#C5193F] sm:mx-8 md:mx-10 lg:mx-16 xl:mx-14 2xl:mx-20">
        <h1
          className={`${anton.className} text-2xl text-[#C5193F] md:text-3xl`}
        >
          DevJuice
        </h1>
        <div className="flex gap-4">
          <button
            onClick={() => router.push('/add-tool')}
            className={`${anton.className} text-md cursor-pointer rounded-md border-1 border-[#C5193F] px-3 py-2 text-[#C5193F] hover:border-[#3C2F54] hover:bg-[#3C2F54] hover:text-gray-100 md:px-4 md:py-2 lg:text-lg`}
          >
            Add Tools
          </button>{' '}
          <a
            href="https://github.com/Adhithyan2004/devJuice/blob/main/CONTRIBUTING.md"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button
              className={`${anton.className} text-md md:py23 flex cursor-pointer items-center gap-2 rounded-md border-1 border-[#C5193F] px-3 py-2 text-[#C5193F] hover:border-[#3C2F54] hover:bg-[#3C2F54] hover:text-gray-100 md:px-4 lg:text-lg`}
            >
              <FaGithub size={25} /> Contribute
            </button>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
