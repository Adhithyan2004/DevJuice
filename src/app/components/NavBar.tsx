'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { FaGithub, FaGlassMartiniAlt } from 'react-icons/fa';

const NavBar = () => {
  const router = useRouter();

  return (
    <nav>
      <div className="mx-8 flex items-center justify-between py-5 text-white xl:mx-20">
        <div className="flex cursor-pointer items-center gap-2">
          <FaGlassMartiniAlt size={26} color="#B547FF" />
          <p
            onClick={() => router.push('/')}
            className="text-lg font-bold text-white md:text-xl xl:text-2xl"
          >
            DevJuice
          </p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => router.push('/add-tool')}
            className="glow-button hidden sm:block"
          >
            Submit a Tool
          </button>{' '}
          <a
            href="https://github.com/Adhithyan2004/devJuice/blob/main/docs/CONTRIBUTING.md"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="glow-button flex gap-2">
              <FaGithub size={20} className="hidden sm:block" /> Contribute
            </button>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
