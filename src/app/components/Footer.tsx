'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { FaGlassMartiniAlt } from 'react-icons/fa';

const Footer = () => {
  const router = useRouter();

  return (
    <div>
      <footer className="mt-32 flex justify-between px-20 pt-16 pb-6 text-white">
        <div className="FtrLft flex flex-col gap-20">
          <div className="LftTop flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <FaGlassMartiniAlt size={25} color="#B547FF" />
              <h1 className="text-2xl font-bold">DevJuice</h1>
            </div>
            <p className="text-lg">
              Built with Next.js, Tailwind, and <br /> some questionable life
              choices
            </p>
          </div>
          <div className="LftBot flex flex-col gap-2 text-white">
            <p className="text-sm">
              © {new Date().getFullYear()} DevJuice. All rights reserved.
            </p>
            <p className="text-sm">
              Brought to you by{' '}
              <span className="cursor-pointer text-[#B547FF] hover:underline">
                Adhithyan
              </span>
            </p>
          </div>
        </div>
        <div className="FtrRgt flex gap-20 text-white">
          <div className="flex flex-col gap-1">
            <p className="link-hover">Admin Login</p>
            <p className="link-hover">Contribute</p>
            <p className="link-hover">Add Tool</p>
            <p className="link-hover">Stan on Github</p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="link-hover">Fix Bugs</p>
            <p className="link-hover">Admin Register</p>
            <p className="link-hover">Categories</p>
            <p className="link-hover">About</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
