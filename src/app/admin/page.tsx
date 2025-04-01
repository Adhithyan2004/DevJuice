"use client";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { AuthContext } from "../AuthContext";

// Define the type for tools
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
  const [authChecked, setAuthChecked] = useState(false); // ✅ Prevents flash before redirect
  const auth = useContext(AuthContext);
  const router = useRouter();

  // ✅ Redirect if not authenticated (fixes flash issue)
  useEffect(() => {
    if (!auth?.token) {
      router.replace("/admin-login"); // 🔥 Use `replace` to prevent going back to admin page after login
    } else {
      setAuthChecked(true);
    }
  }, [auth?.token, router]);

  // ✅ Fetch pending tools only if authenticated
  useEffect(() => {
    if (!auth?.token || !authChecked) return;

    axios
      .get("http://127.0.0.1:8000/tools/pending", {
        headers: { Authorization: `Bearer ${auth.token}` },
      })
      .then((res) => setPendingTools(res.data))
      .catch((err) => console.error("Error fetching pending tools:", err))
      .finally(() => setLoading(false));
  }, [auth?.token, authChecked]);

  const approveTool = async (id: number) => {
    try {
      await axios.put(
        `http://127.0.0.1:8000/tools/${id}/approve`,
        {},
        { headers: { Authorization: `Bearer ${auth?.token}` } }
      );
      setPendingTools(pendingTools.filter((tool) => tool.id !== id));
    } catch (error) {
      console.error("Error approving tool:", error);
    }
  };

  const deleteTool = async (id: number) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/tools/${id}`, {
        headers: { Authorization: `Bearer ${auth?.token}` },
      });
      setPendingTools(pendingTools.filter((tool) => tool.id !== id));
    } catch (error) {
      console.error("Error deleting tool:", error);
    }
  };

  // 🔥 Don't render anything until auth is checked
  if (!authChecked) return null;

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <p className="text-lg mb-6">Approve or Reject Submitted Tools</p>

      {loading ? (
        <p>Loading...</p>
      ) : pendingTools.length > 0 ? (
        <ul className="space-y-4">
          {pendingTools.map((tool) => (
            <li key={tool.id} className="flex flex-wrap justify-between p-4 border rounded gap-4 items-center">
              <div className="flex-1">
                <h2 className="text-xl font-bold">{tool.name}</h2>
                <p>{tool.description}</p>
                <p className="text-sm text-gray-500">Category: {tool.categories}</p>
                <a href={tool.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                  {tool.url}
                </a>
              </div>
              <div className="flex gap-2">
                <button onClick={() => approveTool(tool.id)} className="bg-green-500 text-white px-4 py-2 rounded">
                  Approve
                </button>
                <button onClick={() => deleteTool(tool.id)} className="bg-red-500 text-white px-4 py-2 rounded">
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
