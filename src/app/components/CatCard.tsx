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
      className="glass-card flex flex-col items-center gap-2 px-16 py-8 transition-transform duration-300 hover:scale-105"
    >
      <p className="p-3">{icon}</p>
      <h1 className="text-3xl font-semibold">{title}</h1>
    </Link>
  );
};

export default CatCard;
