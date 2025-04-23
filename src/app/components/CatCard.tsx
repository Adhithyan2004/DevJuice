import React from 'react';
import { Anton } from 'next/font/google';
import Link from 'next/link';

const anton = Anton({ subsets: ['latin'], weight: '400' });

interface CatCardProps {
  icon: React.ReactNode;
  title: string;
}

const CatCard: React.FC<CatCardProps> = ({ icon, title }) => {
  return (
    <Link
      href={`/categories/${title.toLowerCase()}`}
      passHref
      className={`${anton.className} flex flex-col items-center gap-2 rounded-lg border-1 border-[#3C2F54] px-14 py-8 transition-colors duration-400 hover:border-1 hover:border-[#C5193F] hover:bg-[#C5193F] hover:text-gray-100 md:px-11 lg:px-13 2xl:px-16`}
    >
      <p className="p-3">{icon}</p>
      <h1 className="text-3xl">{title}</h1>
    </Link>
  );
};

export default CatCard;
