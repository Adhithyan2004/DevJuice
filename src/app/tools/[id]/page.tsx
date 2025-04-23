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

  const blogContent = `${tool.name} is a ${tool.pricing || 'free'} tool designed to solve the problem of ${tool.problem_it_solves || 'various use cases'}. 
  It offers features like ${tool.features || 'many advanced functionalities'}. ${tool.requires_account ? 'Requires an account to use.' : 'No account needed to use this tool.'}`;

  return (
    <div className="flex min-h-screen flex-col bg-gray-100 text-[#3C2F54]">
      <div className="mx-auto flex max-w-4xl flex-col gap-6 px-6 py-12">
        {/* Decorative Card / Banner */}
        <div className="flex h-48 w-full items-center justify-center rounded-xl bg-gradient-to-r from-[#fce4ec] to-[#f3e5f5] shadow-md">
          <span className="text-5xl font-extrabold text-[#C5193F]">
            {tool.name}
          </span>
        </div>

        {/* Category Tag */}
        <div className="text-base font-semibold tracking-wide text-[#C5193F] uppercase">
          Category: {tool.categories}
        </div>

        {/* Description */}
        <p className="text-lg leading-relaxed text-gray-800">
          {tool.description}
        </p>

        {/* Tool Link Button */}
        <a
          href={tool.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block w-max rounded-md bg-[#C5193F] px-6 py-3 font-semibold text-white transition hover:bg-[#a81435]"
        >
          Visit {tool.name}
        </a>

        {/* Blog Content */}
        <div className="mt-6 rounded-lg bg-white p-6 shadow-inner">
          <h2 className="mb-4 text-xl font-bold text-[#C5193F]">
            What this tool offers
          </h2>
          <p className="text-base leading-7">{blogContent}</p>
        </div>
      </div>

      {/* Optional Footer */}
      {/* <Footer /> */}
    </div>
  );
};

export default ToolDetailPage;
