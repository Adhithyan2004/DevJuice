'use client';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { AuthContext } from '../AuthContext';

interface Tool {
  id: string;
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
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  //  Ensure authentication before fetching data
  useEffect(() => {
    axios
      .get(`${backendUrl}/admins/me`, { withCredentials: true }) //  Auth via cookie
      .then(() => setCheckingAuth(false))
      .catch((error) => {
        console.error('Auth check failed:', error);
        auth?.logout();
        router.replace('/admin-login');
      });
  }, [auth, backendUrl, router]);

  //  Fetch pending tools when authentication is confirmed
  useEffect(() => {
    if (checkingAuth) return;

    axios
      .get(`${backendUrl}/tools/pending`, { withCredentials: true }) //  Send cookies
      .then((res) => setPendingTools(res.data))
      .catch((error) => console.error('Error fetching pending tools:', error))
      .finally(() => setLoading(false));
  }, [checkingAuth, backendUrl]);

  //  Approve a tool
  const approveTool = async (id: number) => {
    try {
      await axios.put(
        `${backendUrl}/tools/${id}/approve`,
        {},
        { withCredentials: true }
      );
      setPendingTools(pendingTools.filter((tool) => tool.id !== id.toString()));
    } catch (error) {
      console.error('Error approving tool:', error);
    }
  };

  //  Delete a tool
  const deleteTool = async (id: number) => {
    try {
      await axios.delete(`${backendUrl}/tools/${id}`, {
        withCredentials: true,
      });
      setPendingTools(pendingTools.filter((tool) => Number(tool.id) !== id));
    } catch (error) {
      console.error('Error deleting tool:', error);
    }
  };

  if (checkingAuth) {
    return (
      <p className="flex h-screen items-center justify-center bg-[#121212] text-center text-white">
        Checking authentication...
      </p>
    );
  }

  return (
    <div className="h-screen bg-gradient-to-b from-[#1F0033] via-[#13031F] to-[#0d0016] p-10">
      <h1 className={`mb-4 text-3xl font-bold text-white`}>
        {' '}
        <span className="radial_gra">Admin</span> Dashboard
      </h1>
      {loading ? (
        <p className="text-white">Loading...</p>
      ) : pendingTools.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {pendingTools.map((tool) => (
            <div
              key={tool.id}
              className="glass-card flex flex-wrap items-center justify-between gap-4 rounded border p-4"
            >
              <div className="flex flex-1 flex-col gap-3">
                <h2 className={`text-xl font-semibold text-white`}>
                  {tool.name}
                </h2>
                <p className="text-base font-semibold text-white">
                  <span className="text-lg text-[#BD8EFF]">Category:</span>{' '}
                  {tool.categories}
                </p>
                <a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white underline"
                >
                  {tool.url}
                </a>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => approveTool(Number(tool.id))}
                  className="cta-button cursor-pointer rounded border-2 px-4 py-2 font-semibold"
                >
                  Approve
                </button>
                <button
                  onClick={() => deleteTool(Number(tool.id))}
                  className="glow-button cursor-pointer"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-lg text-white">No pending tools</p>
      )}
    </div>
  );
};

export default AdminPage;
