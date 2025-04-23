'use client';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { AuthContext } from '../AuthContext';
import { Anton } from 'next/font/google';

interface Tool {
  id: number;
  name: string;
  description: string;
  categories: string;
  url: string;
}

const anton = Anton({ subsets: ['latin'], weight: '400' });

const AdminPage = () => {
  const [pendingTools, setPendingTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const auth = useContext(AuthContext);
  const router = useRouter();

  // ✅ Ensure authentication before fetching data
  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/admins/me', { withCredentials: true }) // ✅ Auth via cookie
      .then(() => setCheckingAuth(false))
      .catch((error) => {
        console.error('Auth check failed:', error);
        auth?.logout();
        router.replace('/admin-login');
      });
  }, []);

  // ✅ Fetch pending tools when authentication is confirmed
  useEffect(() => {
    if (checkingAuth) return;

    axios
      .get('http://127.0.0.1:8000/tools/pending', { withCredentials: true }) // ✅ Send cookies
      .then((res) => setPendingTools(res.data))
      .catch((error) => console.error('Error fetching pending tools:', error))
      .finally(() => setLoading(false));
  }, [checkingAuth]);

  // ✅ Approve a tool
  const approveTool = async (id: number) => {
    try {
      await axios.put(
        `http://127.0.0.1:8000/tools/${id}/approve`,
        {},
        { withCredentials: true }
      );
      setPendingTools(pendingTools.filter((tool) => tool.id !== id));
    } catch (error) {
      console.error('Error approving tool:', error);
    }
  };

  // ✅ Delete a tool
  const deleteTool = async (id: number) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/tools/${id}`, {
        withCredentials: true,
      });
      setPendingTools(pendingTools.filter((tool) => tool.id !== id));
    } catch (error) {
      console.error('Error deleting tool:', error);
    }
  };

  if (checkingAuth) {
    return <p>Checking authentication...</p>;
  }

  return (
    <div className="h-screen bg-gray-100 p-10">
      <h1
        className={`${anton.className} mb-4 text-3xl font-bold text-[#3C2F54]`}
      >
        Admin Dashboard
      </h1>
      <p className="mb-6 text-lg font-semibold text-[#C5193F]">
        Approve or Reject Submitted Tools
      </p>

      {loading ? (
        <p>Loading...</p>
      ) : pendingTools.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {pendingTools.map((tool) => (
            <div
              key={tool.id}
              className="TolGlass flex flex-wrap items-center justify-between gap-4 rounded border border-[#C5193F] p-4"
            >
              <div className="flex flex-1 flex-col gap-3">
                <h2 className={`${anton.className} text-xl text-[#3C2F54]`}>
                  {tool.name}
                </h2>
                <p className="font-semibold text-[#C5193F]">
                  {tool.description}
                </p>
                <p className="text-base font-semibold text-[#C5193F]">
                  <span className="text-[#3C2F54]">Category:</span>{' '}
                  {tool.categories}
                </p>
                <a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#C5193F] underline"
                >
                  {tool.url}
                </a>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => approveTool(tool.id)}
                  className="cursor-pointer rounded border-2 border-[#C5193F] px-4 py-2 font-semibold text-[#C5193F] hover:bg-[#C5193F] hover:text-white"
                >
                  Approve
                </button>
                <button
                  onClick={() => deleteTool(tool.id)}
                  className="cursor-pointer rounded bg-[#C5193F] px-4 py-2 font-semibold text-white"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No pending tools</p>
      )}
    </div>
  );
};

export default AdminPage;
