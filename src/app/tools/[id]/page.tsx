'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { Anton } from 'next/font/google';
import Footer from '@/app/components/Footer';

const anton = Anton({
  subsets: ['latin'],
  weight: '400',
});

interface Tool {
  id: string;
  name: string;
  categories: string;
  image_url?: string; // ✅ Use image_url
  description: string;
  url: string;
  pricing?: string;
  problem_it_solves?: string;
  features?: string;
  requires_account?: boolean;
}

const ToolDetailPage = () => {
  const params = useParams();
  const id = params?.id;

  const [tool, setTool] = useState<Tool | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    axios
      .get(`http://127.0.0.1:8000/tools/${id}`)
      .then((response) => {
        setTool(response.data);
        console.log('Tool fetched:', response.data);
      })
      .catch((error) => {
        console.error('Error fetching tool:', error);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!tool) return <p>Tool not found.</p>;

  // ✅ Dynamically generate blog content in the frontend
  const blogTitle = `Exploring ${tool.name}: A ${tool.pricing ? tool.pricing.charAt(0).toUpperCase() + tool.pricing.slice(1) : 'Free'} ${tool.categories} Tool`;

  const blogContent = `${tool.name} is a ${tool.pricing || 'free'} tool designed to solve the problem of ${tool.problem_it_solves || 'various use cases'}. 
  It offers features like ${tool.features || 'many advanced functionalities'}. ${tool.requires_account ? 'Requires an account to use.' : 'No account needed to use this tool.'}`;

  return (
    <div className="bg-black">
      <div className="bg-black p-10 text-white">
        <h1 className={`${anton.className} text-3xl font-bold`}>{tool.name}</h1>
        <p className="text-lg font-semibold">
          Category: <span className="text-[#00CFFF]"> {tool.categories} </span>
        </p>

        <p className="mt-4 text-lg leading-9">{tool.description}</p>
        <p className="mt-4 text-lg font-semibold">
          Tool Link:{' '}
          <a
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#00CFFF] underline"
          >
            {tool.url}
          </a>
        </p>

        {/* ✅ Display auto-generated blog content in frontend */}
        <div className="mt-4">
          {/* <h2 className="text-2xl font-semibold">{blogTitle}</h2> */}
          <p className="mt-6 text-lg leading-9">{blogContent}</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ToolDetailPage;
