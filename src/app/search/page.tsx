"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import ToolCard from "@/app/components/ToolCard";

interface Tool {
  id: string;
  name: string;
  categories: string;
  image?: string;
}

const SearchPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const categoryFilter = searchParams.get("category") || "";

  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/tools/?search=${encodeURIComponent(query)}&category=${encodeURIComponent(categoryFilter)}`)
      .then((response) => {
        setTools(response.data);
      })
      .catch((error) => {
        console.error("Error fetching tools:", error);
      })
      .finally(() => setLoading(false));
  }, [query, categoryFilter]);

  return (
    <div className="p-10 text-center">
      <h1 className="text-4xl font-bold">Search Results for "{query}"</h1>

      {/* Category Filter Dropdown */}
      <select
        className="border p-2 rounded mt-4"
        value={categoryFilter}
        onChange={(e) => {
          const selectedCategory = e.target.value;
          window.location.href = `/search?q=${query}&category=${selectedCategory}`;
        }}
      >
        <option value="">All Categories</option>
        <option value="AI">AI</option>
        <option value="Productivity">Productivity</option>
        {/* Add more categories */}
      </select>

      <div className="grid grid-cols-3 gap-4 mt-6">
        {loading ? (
          <p>Loading...</p>
        ) : tools.length > 0 ? (
          tools.map((tool) => <ToolCard key={tool.id} tool={tool} />)
        ) : (
          <p>No tools found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
