import React from 'react';
import Link from 'next/link';
import { Anton } from 'next/font/google';

const anton = Anton({ subsets: ['latin'], weight: '400' });
interface Tool {
  id: string;
  name: string;
  categories: string;
  image_url?: string; // ✅ Use image_url (from backend)
}

const ToolCard: React.FC<{ tool: Tool }> = ({ tool }) => {
  return (
    <Link
      href={`/tools/${tool.id}`}
      className="group hover:bg-opacity-10 flex flex-col items-center justify-center gap-4 rounded-lg border border-[#3C2F54] p-4 py-7 transition duration-300 ease-in-out hover:bg-[#3C2F54]"
    >
      {/* ✅ Show image or fallback to a placeholder */}
      <h2
        className={`${anton.className} text-xl font-semibold text-[#C5193F] group-hover:text-gray-100 2xl:text-2xl`}
      >
        {tool.name}
      </h2>
      <p
        className={`${anton.className} text-lg text-[#3C2F54] group-hover:text-gray-100`}
      >
        {tool.categories}
      </p>
    </Link>
  );
};

export default ToolCard;
