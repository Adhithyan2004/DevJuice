'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { FaGithub, FaGlassMartiniAlt } from 'react-icons/fa';

const NavBar = () => {
  const router = useRouter();

  return (
    <nav>
      <div className="mx-20 flex items-center justify-between py-5 text-white">
        <div className="flex items-center gap-2">
          <FaGlassMartiniAlt size={26} color="#B547FF" />
          <p className="text-2xl font-bold text-white">DevJuice</p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => router.push('/add-tool')}
            className="glow-button"
          >
            Submit a Tool
          </button>{' '}
          <a
            href="https://github.com/Adhithyan2004/devJuice/blob/main/docs/CONTRIBUTING.md"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="glow-button flex gap-2">
              <FaGithub size={20} /> Contribute
            </button>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
