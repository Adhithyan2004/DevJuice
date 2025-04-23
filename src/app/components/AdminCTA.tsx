'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Anton } from 'next/font/google';

const anton = Anton({ subsets: ['latin'], weight: '400' });

const AdminCTA = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center gap-12 py-20 text-center">
      <h1 className="text-2xl text-[#C5193F]">
        {' '}
        <span className="text-[#3C2F54]">Admin?</span> Log in here to manage
        tools.
      </h1>
      <button
        onClick={() => router.push('/admin-login')}
        className={`${anton.className} text-md md:py23 cursor-pointer rounded-md border-1 border-[#C5193F] px-3 py-2 text-[#C5193F] hover:border-[#3C2F54] hover:bg-[#3C2F54] hover:text-gray-100 md:px-4 lg:text-lg`}
      >
        Admin Log in
      </button>
    </div>
  );
};

export default AdminCTA;
