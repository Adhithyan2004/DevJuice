export interface Tool {
  id: string;
  name: string;
  categories: string;
  pricing: string;
  image?: string;
  url: string;
  problem_it_solves?: string;
  key_features?: string;
  requires_account?: boolean;
}

export interface ToolResponse {
  tools: Tool[];
  total_pages: number;
}
