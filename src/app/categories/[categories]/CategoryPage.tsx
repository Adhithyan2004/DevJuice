'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import ToolCard from '@/app/components/ToolCard';
import { fetchTools } from '@/app/api';
import { Tool, ToolResponse } from '@/app/types';
import { useDebounce } from '@/app/hooks/useDebounce';
import NavBar from '@/app/components/NavBar';
import Footer from '@/app/components/Footer';

const CategoryPage = () => {
  const params = useParams();
  const category = Array.isArray(params.categories)
    ? params.categories[0]
    : params.categories;

  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 500);
  const [page, setPage] = useState(1);
  const [limit] = useState(9);

  const { data, isLoading, isError } = useQuery<ToolResponse>({
    queryKey: ['tools', category, debouncedSearch, page],
    queryFn: async () => {
      return await fetchTools({
        category,
        search: debouncedSearch,
        page,
        limit,
      });
    },
    placeholderData: (previousData) => previousData,
    enabled: !!category,
  });

  const tools = data?.tools || [];
  const totalPages = data?.total_pages || 1;

  if (isLoading)
    return (
      <p
        className={`flex h-screen items-center justify-center bg-[#121212] text-center text-white`}
      >
        Hang tight! Our server&apos;s on a free-tier coffee break ☕️ (AKA I
        can&apos;t afford uptime 😅)
      </p>
    );

  if (isError)
    return (
      <p
        className={`flex h-screen items-center justify-center bg-[#121212] text-center text-white`}
      >
        Something went wrong fetching tools
      </p>
    );

  return (
    <div className="bg-gradient-to-b from-[#1F0033] via-[#13031F] to-[#1A002B]">
      <NavBar />
      <div className="flex min-h-screen flex-col justify-between p-8 text-center xl:mx-10">
        <div className="TitCrdSec">
          <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
            <h1
              className={`text-2xl font-semibold text-white capitalize md:text-4xl`}
            >
              <span className="radial_gra">{category}</span> Tools
            </h1>

            {/* Filter Section */}
            <div className="flex items-center gap-4 xl:gap-5">
              <input
                type="text"
                placeholder="Search..."
                className="w-xs rounded border border-[#BD8EFF] p-2 px-4 text-[#BD8EFF] lg:w-md"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setPage(1);
                }}
              />
            </div>
          </div>

          {/* Tools Grid */}
          <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {tools.length > 0 ? (
              tools.map((tool: Tool) => (
                <ToolCard key={tool.id.toString()} tool={tool} />
              ))
            ) : (
              <p className={`text-xl text-white`}>No tools found.</p>
            )}
          </div>
        </div>

        {/* Pagination */}
        <div className="PgSec mt-8 flex items-center justify-center gap-4">
          <button
            className={`rounded border px-4 py-2 text-white ${
              page === 1 ? 'cursor-not-allowed opacity-50' : ''
            }`}
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
          >
            Previous
          </button>

          <span className="text-white">
            Page {page} of {totalPages}
          </span>

          <button
            className={`rounded border px-4 py-2 text-white ${
              page === totalPages ? 'cursor-not-allowed opacity-50' : ''
            }`}
            disabled={page === totalPages}
            onClick={() => setPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CategoryPage;
