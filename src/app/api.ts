import axios from "axios";
import { ToolResponse } from "./types";

axios.defaults.withCredentials = true; //  Send cookies by default

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL; // Replace with env in production

//  Login Admin (FormData format for OAuth2PasswordRequestForm)
export const loginAdmin = async (username: string, password: string) => {
  const formData = new URLSearchParams();
  formData.append("username", username);
  formData.append("password", password);

  const response = await axios.post(`${backendUrl}/admins/admin-login`, formData, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    withCredentials: true,
  });

  return response.data; // Optional: return custom data if needed
};

//  Logout Admin
export const logoutAdmin = async () => {
  const response = await axios.post(`${backendUrl}/admins/logout`, null, {
    withCredentials: true,
  });
  return response.data;
};

// Check Authenticated Admin
export const checkAuth = async () => {
  const response = await axios.get(`${backendUrl}/admins/me`, {
    withCredentials: true,
  });
  return response.data; // Returns the admin data if logged in
};

//  Fetch Tools (with filters, pagination)
interface ToolParams {
  category?: string;
  search?: string;
  pricing?: string;
  page?: number;
  limit?: number;
}

export const fetchTools = async (params: ToolParams):Promise<ToolResponse> => {
  const response = await axios.get(`${backendUrl}/tools/`, {
    params,
    withCredentials: true,
  });
  return response.data; // Contains { tools, total_pages, etc. }
};
