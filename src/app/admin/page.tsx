"use client";
import { useState, useEffect, useContext } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { AuthContext } from "../AuthContext";

interface Tool {
  id: number;
  name: string;
  description: string;
  categories: string;
  url: string;
}

const AdminPage = () => {
  const [pendingTools, setPendingTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const auth = useContext(AuthContext);
  const router = useRouter();

  // ✅ Ensure authentication before fetching data
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/admins/me", { withCredentials: true }) // ✅ Auth via cookie
      .then(() => setCheckingAuth(false))
      .catch((error) => {
        console.error("Auth check failed:", error);
        auth?.logout();
        router.replace("/admin-login");
      });
  }, []);

  // ✅ Fetch pending tools when authentication is confirmed
  useEffect(() => {
    if (checkingAuth) return;

    axios
      .get("http://127.0.0.1:8000/tools/pending", { withCredentials: true }) // ✅ Send cookies
      .then((res) => setPendingTools(res.data))
      .catch((error) => console.error("Error fetching pending tools:", error))
      .finally(() => setLoading(false));
  }, [checkingAuth]);

  // ✅ Approve a tool
  const approveTool = async (id: number) => {
    try {
      await axios.put(`http://127.0.0.1:8000/tools/${id}/approve`, {}, { withCredentials: true });
      setPendingTools(pendingTools.filter((tool) => tool.id !== id));
    } catch (error) {
      console.error("Error approving tool:", error);
    }
  };

  // ✅ Delete a tool
  const deleteTool = async (id: number) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/tools/${id}`, { withCredentials: true });
      setPendingTools(pendingTools.filter((tool) => tool.id !== id));
    } catch (error) {
      console.error("Error deleting tool:", error);
    }
  };

  if (checkingAuth) {
    return <p>Checking authentication...</p>;
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <p className="text-lg mb-6">Approve or Reject Submitted Tools</p>

      {loading ? (
        <p>Loading...</p>
      ) : pendingTools.length > 0 ? (
        <ul className="space-y-4">
          {pendingTools.map((tool) => (
            <li
              key={tool.id}
              className="flex flex-wrap justify-between p-4 border rounded gap-4 items-center"
            >
              <div className="flex-1">
                <h2 className="text-xl font-bold">{tool.name}</h2>
                <p>{tool.description}</p>
                <p className="text-sm text-gray-500">
                  Category: {tool.categories}
                </p>
                <a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  {tool.url}
                </a>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => approveTool(tool.id)}
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Approve
                </button>
                <button
                  onClick={() => deleteTool(tool.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Reject
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No pending tools</p>
      )}
    </div>
  );
};

export default AdminPage;
