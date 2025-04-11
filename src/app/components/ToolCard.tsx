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
      className="block rounded-lg border border-[#00CFFF] p-4 hover:bg-gray-200 py-7"
    >
      {/* ✅ Show image or fallback to a placeholder */}
      <h2 className="text-lg text-white font-semibold">{tool.name}</h2>
      <p className='text-[#00CFFF]'>{tool.categories}</p>
    </Link>
  );
};

export default ToolCard;
