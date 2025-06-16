'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const Cta = () => {
  const router = useRouter();

  return (
    <div className="glass-card mx-8 my-10 flex flex-col items-center gap-6 p-6 text-white md:my-16 md:p-10 xl:mx-20 xl:my-32 xl:gap-5 xl:p-12 2xl:p-16">
      <h1 className="text-center text-xl font-semibold drop-shadow-[0_5px_10px_#A363FF47] sm:text-3xl lg:text-4xl xl:text-5xl">
        Know a tool that deserves a{' '}
        <span className="radial_gra">spotlight?</span>
      </h1>
      <p className="hidden sm:block sm:text-center xl:text-lg">
        We love tools that make dev life easier — and chances are, others will
        too. <br /> Suggest your favorite tool and help fellow developers
        discover it.
      </p>
      <button
        onClick={() => router.push('/add-tool')}
        className="cta-button px-3 py-2"
      >
        Submit a Tool
      </button>
    </div>
  );
};

export default Cta;
