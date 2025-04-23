'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { Anton } from 'next/font/google';

const anton = Anton({ subsets: ['latin'], weight: '400' });

const Footer = () => {
  const router = useRouter();

  return (
    <div>
      <footer className="items-between mx-12 flex flex-col justify-between gap-20 py-28 md:flex-row md:items-center md:gap-14 lg:flex-row lg:gap-10 2xl:mx-20 2xl:justify-between 2xl:gap-20 2xl:pt-30">
        <div className="FtrLft flex flex-col">
          <div className="flex flex-col gap-4 md:gap-3">
            <h1
              className={`${anton.className} text-2xl text-[#00CFFF] 2xl:text-3xl`}
            >
              DevJuice -{' '}
              <span className="text-white">
                {' '}
                Open Source, Free, and Probably Buggy{' '}
              </span>
            </h1>
            <p className="text-lg text-white 2xl:text-lg">
              Built with Next.js, Tailwind, and some questionable life choices
            </p>
            <p className="mt-4 text-lg text-white 2xl:text-xl">
              {' '}
              <span className="text-[#00CFFF]">Admin?</span> Log in{' '}
              <u
                onClick={() => router.push('/admin-login')}
                className="cursor-pointer text-[#00CFFF]"
              >
                here
              </u>{' '}
              to manage tools
            </p>
          </div>
        </div>
        <div className="FtrRgt flex flex-col gap-10 md:gap-5">
          <div>
            <h1 className="text-xl text-white 2xl:text-xl">
              Missing a cool tool? Submit it{' '}
              <u
                className="cursor-pointer text-[#00CFFF]"
                onClick={() => router.push('/add-tool')}
              >
                Add a tool
              </u>
            </h1>
          </div>
          <div>
            <h1 className="text-xl font-medium text-[#00CFFF] 2xl:text-2xl">
              Bugs?
            </h1>
            <ol className="my-3 flex flex-col gap-1 text-lg text-white">
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
