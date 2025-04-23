'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Anton } from 'next/font/google';

const anton = Anton({ subsets: ['latin'], weight: '400' });

const AdminCTA = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center gap-12 py-20 text-center">
      <h1 className="text-2xl text-white">
        {' '}
        <span className="text-[#00CFFF]">Admin?</span> Log in here to manage
        tools.
      </h1>
      <button
        onClick={() => router.push('/admin-login')}
        className={`${anton.className} text-md md:py23 cursor-pointer rounded-md border-1 border-white px-3 py-2 text-white hover:border-[#00CFFF] hover:bg-[#00CFFF] hover:text-black md:px-4 lg:text-lg`}
      >
        Admin Log in
      </button>
    </div>
  );
};

export default AdminCTA;
