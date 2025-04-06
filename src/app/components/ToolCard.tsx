import React from 'react';
import Link from 'next/link';

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
      className="block rounded-lg border p-4 hover:bg-gray-200"
    >
      {/* ✅ Show image or fallback to a placeholder */}
      <img
        src={tool.image_url || '/default-placeholder.png'}
        alt={tool.name}
        className="mb-2 h-16 w-16 rounded-md object-cover mx-auto"
      />
      <h2 className="text-lg font-semibold">{tool.name}</h2>
      <p>{tool.categories}</p>
    </Link>
  );
};

export default ToolCard;
