'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const Cta = () => {
  const router = useRouter();

  return (
    <div className="glass-card mx-28 my-32 flex flex-col items-center gap-5 p-16 text-white">
      <h1 className="text-5xl">
        Know a tool that deserves a{' '}
        <span className="radial_gra">spotlight?</span>
      </h1>
      <p className="text-lg">
        We love tools that make dev life easier — and chances are, others will
        too. <br /> Suggest your favorite tool and help fellow developers
        discover it.
      </p>
      <button onClick={() => router.push('/add-tool')} className="cta-button">
        Submit a Tool
      </button>
    </div>
  );
};

export default Cta;
