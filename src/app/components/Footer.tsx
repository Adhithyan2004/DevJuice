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
              className={`${anton.className} text-2xl text-[#3C2F54] 2xl:text-3xl`}
            >
              DevJuice -{' '}
              <span className="text-[#C5193F]">
                {' '}
                Open Source, Free, and Probably Buggy{' '}
              </span>
            </h1>
            <p className="text-lg font-semibold text-[#C5193F] 2xl:text-lg">
              Built with Next.js, Tailwind, and some questionable life choices
            </p>
            <p className="mt-4 text-lg font-semibold text-[#C5193F] 2xl:text-xl">
              {' '}
              <span className="text-[#3C2F54]">Admin?</span> Log in{' '}
              <u
                onClick={() => router.push('/admin-login')}
                className="cursor-pointer text-[#3C2F54]"
              >
                here
              </u>{' '}
              to manage tools
            </p>
            <p className="mt-4 text-lg font-semibold text-[#C5193F] 2xl:text-xl">
              <span className="text-[#3C2F54]">Ready to Manage?</span> Apply for
              Admin Access{' '}
              <u
                className="cursor-pointer text-[#3C2F54]"
                onClick={() => router.push('/admin-register')}
              >
                Here!
              </u>
            </p>
          </div>
        </div>
        <div className="FtrRgt flex flex-col gap-10 md:gap-5">
          <div>
            <h1 className="text-xl font-semibold text-[#C5193F] 2xl:text-xl">
              Missing a cool tool? Submit it{' '}
              <u
                className="cursor-pointer text-[#3C2F54]"
                onClick={() => router.push('/add-tool')}
              >
                Add a tool
              </u>
            </h1>
          </div>
          <div>
            <h1 className="text-xl font-medium text-[#3C2F54] 2xl:text-2xl">
              Bugs?
            </h1>
            <ol className="my-3 flex flex-col gap-1 text-lg font-medium text-[#C5193F]">
              <li>Blame Javascript</li>
              <li>Refresh the page</li>
              <li>
                If still missing fix it yourself →{' '}
                <u>
                  <a
                    href="https://github.com/Adhithyan2004/devJuice/issues"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Issues
                  </a>
                </u>
              </li>
            </ol>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
