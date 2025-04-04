"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import ToolCard from "@/app/components/ToolCard";

interface Tool {
  id: string;
  name: string;
  categories: string;
  pricing: string;
  image?: string;
}

const CategoryPage = () => {
  const params = useParams();
  const category = Array.isArray(params.categories) ? params.categories[0] : params.categories;

  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPricing, setSelectedPricing] = useState(""); 
  const [page, setPage] = useState(1);
  const [limit] = useState(10); // Number of tools per page
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (!category) return;

    setLoading(true);
    axios
      .get(`http://127.0.0.1:8000/tools/`, {
        params: {
          category: category || undefined,
          search: searchQuery || undefined,
          pricing: selectedPricing || undefined,
          page,
          limit,
        },
      })
      .then((response) => {
        console.log("🔹 API Response:", response.data);
        setTools(response.data.tools);
        setTotalPages(response.data.total_pages);
      })
      .catch((error) => {
        console.error("❌ Error fetching tools:", error);
      })
      .finally(() => setLoading(false));
  }, [category, page, searchQuery, selectedPricing]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-10 text-center">
      <h1 className="text-4xl font-bold capitalize">{category} Tools</h1>

      {/* Filter Section */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <select
          className="border p-2 rounded"
          value={selectedPricing}
          onChange={(e) => setSelectedPricing(e.target.value)}
        >
          <option value="">All</option>
          <option value="free">Free</option>
          <option value="paid">Paid</option>
          <option value="freemium">Freemium</option>
        </select>

        <input
          type="text"
          placeholder="Search..."
          className="border p-2 rounded w-1/3"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <button
          className="bg-gray-200 px-4 py-2 rounded"
          onClick={() => {
            setSearchQuery("");
            setSelectedPricing("");
          }}
        >
          Reset Filters
        </button>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        {tools.length > 0 ? (
          tools.map((tool) => <ToolCard key={tool.id} tool={tool} />)
        ) : (
          <p>No tools found.</p>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="mt-6 flex justify-center gap-4">
        <button
          className={`px-4 py-2 border rounded ${page === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Previous
        </button>

        <span>Page {page} of {totalPages}</span>

        <button
          className={`px-4 py-2 border rounded ${page === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
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
