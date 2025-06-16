'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { FaGlassMartiniAlt } from 'react-icons/fa';

const router = useRouter();
const Footer = () => {
  return (
    <div>
      <footer className="flex flex-col justify-between gap-8 px-10 pt-16 pb-1 text-white md:flex-row xl:mt-32 xl:px-20">
        <div className="FtrLft flex flex-col gap-7 xl:gap-20">
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
          <p className="text-sm">
            Brought to you by{' '}
            <span className="cursor-pointer text-[#B547FF] hover:underline">
              Adhithyan
            </span>
          </p>
        </div>
        <div className="FtrRgt flex gap-20 text-white md:gap-12">
          <div className="flex flex-col gap-1">
            <p
              onClick={() => router.push('/admin-login')}
              className="link-hover"
            >
              Admin Login
            </p>
            <a
              href="https://github.com/Adhithyan2004/devJuice/blob/main/docs/CONTRIBUTING.md"
              target="_blank"
              rel="noopener noreferrer"
            >
              <p className="link-hover">Contribute</p>
            </a>
            <p onClick={() => router.push('/add-tool')} className="link-hover">
              Add Tool
            </p>
            <a
              href="https://github.com/Adhithyan2004/devJuice"
              target="_blank"
              rel="noopener noreferrer"
            >
              <p className="link-hover">Star on Github</p>
            </a>
          </div>
          <div className="flex flex-col gap-1">
            <a
              href="https://github.com/Adhithyan2004/DevJuice/blob/main/docs/CONTRIBUTING.md#ways-to-contribute"
              target="_blank"
              rel="noopener noreferrer"
            >
              <p className="link-hover">Fix Bugs</p>
            </a>
            <p
              onClick={() => router.push('/admin-register')}
              className="link-hover"
            >
              Admin Register
            </p>
          </div>
        </div>
      </footer>
      <p className="px-10 pb-1 text-sm font-semibold text-white italic xl:px-20">
        <span className="radial_gra">
          © {new Date().getFullYear()} DevJuice
        </span>
        . All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
