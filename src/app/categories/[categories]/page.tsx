'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import ToolCard from '@/app/components/ToolCard';
import { fetchTools } from '@/app/api';
import { useDebounce } from '@/app/hooks/useDebounce';
import { Anton } from 'next/font/google';

const anton = Anton({ subsets: ['latin'], weight: '400' });

interface Tool {
  id: string;
  name: string;
  categories: string;
  pricing: string;
  image?: string;
}

interface ToolResponse {
  tools: Tool[];
  total_pages: number;
}

const CategoryPage = () => {
  const params = useParams();
  const category = Array.isArray(params.categories)
    ? params.categories[0]
    : params.categories;

  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 500);
  const [selectedPricing, setSelectedPricing] = useState('');
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const { data, isLoading, isError } = useQuery<ToolResponse>({
    queryKey: ['tools', category, debouncedSearch, selectedPricing, page],
    queryFn: () =>
      fetchTools({
        category,
        search: debouncedSearch,
        pricing: selectedPricing,
        page,
        limit,
      }),
    placeholderData: (previousData) => previousData, // ✅ replaces keepPreviousData
    enabled: !!category,
  });

  const tools = data?.tools || [];
  const totalPages = data?.total_pages || 1;

  if (isLoading)
    return <p className={`${anton.className} text-white`}>Loading...</p>;
  if (isError)
    return (
      <p className={`${anton.className} text-white`}>
        Something went wrong fetching tools 😢
      </p>
    );

  return (
    <div className="flex min-h-screen flex-col justify-between bg-black p-10 text-center">
      <div className="TitCrdSec">
        <h1
          className={`${anton.className} text-4xl font-bold text-white capitalize`}
        >
          {category} Tools
        </h1>

        {/* Filter Section */}
        <div className="mt-6 flex items-center justify-center gap-4">
          <select
            className={`${anton.className} rounded border border-[#7C7C7C] p-2 text-[#7C7C7C]`}
            value={selectedPricing}
            onChange={(e) => {
              setSelectedPricing(e.target.value);
              setPage(1);
            }}
          >
            <option className="text-black" value="">
              All
            </option>
            <option value="free">Free</option>
            <option value="paid">Paid</option>
            <option value="freemium">Freemium</option>
          </select>

          <input
            type="text"
            placeholder="Search..."
            className="w-1/3 rounded border border-[#7C7C7C] p-2 text-white"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setPage(1);
            }}
          />

          <button
            className={` ${anton.className} rounded border border-[#00CFFF] px-4 py-2 text-[#00CFFF] hover:bg-[#00CFFF] hover:text-black`}
            onClick={() => {
              setSearchQuery('');
              setSelectedPricing('');
              setPage(1);
            }}
          >
            Reset Filters
          </button>
        </div>

        {/* Tools Grid */}
        <div className="mt-6 grid grid-cols-3 gap-4">
          {tools.length > 0 ? (
            tools.map((tool: Tool) => <ToolCard key={tool.id} tool={tool} />)
          ) : (
            <p>No tools found.</p>
          )}
        </div>
      </div>
      {/* Pagination */}
      <div className="PgSec mt-6 flex items-center justify-center gap-4">
        <button
          className={`${anton.className} rounded border px-4 py-2 text-white ${page === 1 ? 'cursor-not-allowed opacity-50' : ''}`}
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Previous
        </button>

        <span className={`${anton.className} text-white`}>
          Page {page} of {totalPages}
        </span>

        <button
          className={`${anton.className} rounded border px-4 py-2 text-white ${page === totalPages ? 'cursor-not-allowed opacity-50' : ''}`}
          disabled={page === totalPages}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CategoryPage;
