'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { Anton } from 'next/font/google';

const anton = Anton({ subsets: ['latin'], weight: '400' });

const Footer = () => {
  const router = useRouter();

  return (
    <div>
      <footer className="mx-20 flex flex-col items-between justify-between gap-20 py-28 md:items-center md:flex-row md:gap-14 lg:flex-row lg:gap-10 2xl:mx-22 2xl:justify-evenly 2xl:gap-20 2xl:pt-36">
        <div className="FtrLft flex flex-col">
          <div className="flex flex-col gap-4 md:gap-3">
            <h1 className={`${anton.className} text-3xl text-[#00FF9C]`}>
              DevJuice - Open Source, Free, and Probably Buggy
            </h1>
            <p className="text-xl">
              Built with Next.js, Tailwind, and some questionable life choices
            </p>
          </div>
        </div>
        <div className="FtrRgt flex flex-col gap-10 md:gap-5">
          <div>
            <h1 className="text-xl">
              Missing a cool tool? Submit it{' '}
              <u
                className="cursor-pointer text-[#00FF9C]"
                onClick={() => router.push('/add-tool')}
              >
                Add a tool
              </u>
            </h1>
          </div>
          <div>
            <h1 className="text-xl font-medium text-[#00FF9C]">Bugs?</h1>
            <ol className="my-3 flex flex-col gap-1">
              <li>Blame Javascript</li>
              <li>Refresh the page</li>
              <li>
                If still missing fix it yourself → <u>Issues</u>
              </li>
            </ol>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
