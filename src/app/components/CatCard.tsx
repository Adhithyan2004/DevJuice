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
      className={`${anton.className} flex flex-col items-center gap-2 rounded-lg border-1 border-[#00FF9C] from-[#15B392] via-[#73EC8B] to-[#D2FF72] px-14 py-8 transition-colors duration-400 hover:border-1 hover:border-black hover:bg-gradient-to-tr hover:text-black md:px-11 lg:px-13 2xl:px-16`}
    >
      <p className="p-3">{icon}</p>
      <h1 className="text-3xl">{title}</h1>
    </Link>
  );
};

export default CatCard;
