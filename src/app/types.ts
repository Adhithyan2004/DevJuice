// app/types.ts

export interface Tool {
    id: string;
    name: string;
    categories: string;
    pricing: string;
    image?: string;
  }
  
  export interface ToolResponse {
    tools: Tool[];
    total_pages: number;
  }
  