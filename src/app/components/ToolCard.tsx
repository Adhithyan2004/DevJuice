import React from 'react';
import Link from 'next/link';

interface Tool {
  id: string;
  name: string;
  categories: string;
  image_url?: string;
  url: string;
  pricing?: string;
  problem_it_solves?: string;
  key_features?: string;
  requires_account?: boolean; // ✅ Use image_url (from backend)
}

const ToolCard: React.FC<{ tool: Tool }> = ({ tool }) => {
  const blogContent = `${tool.name} is a ${tool.pricing || 'free'} tool designed to ${tool.problem_it_solves || 'various use cases'}. 
  It offers features like ${tool.key_features || 'many advanced functionalities'}. ${tool.requires_account ? 'Requires an account to use.' : 'No account needed to use this tool.'}`;

  return (
    <a
      href={tool.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group glass-tool-card flex flex-col gap-4 rounded-lg border-1 border-[#3C2F54] px-6 py-8"
    >
      <div className="flex flex-col gap-2">
        <h2 className="radial_gra text-left text-xl font-semibold text-white 2xl:text-3xl">
          {tool.name}
        </h2>
        <div className="flex gap-4">
          <p className="text-left text-lg text-white">{tool.categories}</p>
          <p className="text-left text-lg text-white">{tool.pricing}</p>
        </div>
      </div>
      <p className="text-left text-sm leading-6 text-white">{blogContent}</p>
    </a>
  );
};

export default ToolCard;
