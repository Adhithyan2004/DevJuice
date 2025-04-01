import React from "react";
import Link from "next/link";

interface Tool {
  id: string;  
  name: string;
  categories: string;
  image_url?: string;  // ✅ Use image_url (from backend)
}

const ToolCard: React.FC<{ tool: Tool }> = ({ tool }) => {
  return (
    <Link href={`/tools/${tool.id}`} className="block p-4 border rounded-lg hover:bg-gray-200">
      {/* ✅ Show image or fallback to a placeholder */}
      <img 
        src={tool.image_url || "/default-placeholder.png"}  
        alt={tool.name} 
        className="w-16 h-16 mb-2 object-cover rounded-md"
      />
      <h2 className="text-lg font-semibold">{tool.name}</h2>
      <p>{tool.categories}</p>
    </Link>
  );
};

export default ToolCard;
