'use client';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { AuthContext } from '../AuthContext';
import { Anton } from 'next/font/google';

const anton = Anton({ subsets: ['latin'], weight: '400' });

interface Tool {
  id: number;
  name: string;
  description: string;
  categories: string;
  url: string;
}

interface PendingAdmin {
  id: number;
  username: string;
  email: string;
}

const SuperAdminPage = () => {
  const [pendingTools, setPendingTools] = useState<Tool[]>([]);
  const [pendingAdmins, setPendingAdmins] = useState<PendingAdmin[]>([]);
  const [loading, setLoading] = useState(true);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const auth = useContext(AuthContext);
  const router = useRouter();
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  // 🔐 Auth check
  useEffect(() => {
    axios
      .get(`${backendUrl}/admins/me`, { withCredentials: true })
      .then((res) => {
        if (!res.data.is_superuser) {
          router.replace('/admin'); // 🛑 Not a super admin → redirect
        } else {
          setCheckingAuth(false);
        }
      })
      .catch((err) => {
        console.error('Auth check failed:', err);
        auth?.logout();
        router.replace('/admin-login');
      });
  }, []);

  // 🔄 Fetch data once auth is confirmed
  useEffect(() => {
    if (checkingAuth) return;

    const fetchData = async () => {
      try {
        const toolsRes = await axios.get(`${backendUrl}/tools/pending`, {
          withCredentials: true,
        });
        setPendingTools(toolsRes.data);

        const adminsRes = await axios.get(`${backendUrl}/admins/pending`, {
          withCredentials: true,
        });
        setPendingAdmins(adminsRes.data);
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [checkingAuth]);

  // ✅ Approve a tool
  const approveTool = async (id: number) => {
    try {
      await axios.put(
        `${backendUrl}/tools/${id}/approve`,
        {},
        { withCredentials: true }
      );
      setPendingTools(pendingTools.filter((tool) => tool.id !== id));
    } catch (error) {
      console.error('Error approving tool:', error);
    }
  };

  // ❌ Reject a tool
  const deleteTool = async (id: number) => {
    try {
      await axios.delete(`${backendUrl}/tools/${id}`, {
        withCredentials: true,
      });
      setPendingTools(pendingTools.filter((tool) => tool.id !== id));
    } catch (error) {
      console.error('Error deleting tool:', error);
    }
  };

  // ✅ Approve an admin
  const approveAdmin = async (id: number) => {
    try {
      await axios.put(
        `${backendUrl}/admins/${id}/approve`,
        {},
        { withCredentials: true }
      );
      setPendingAdmins(pendingAdmins.filter((admin) => admin.id !== id));
    } catch (error) {
      console.error('Error approving admin:', error);
    }
  };

  if (checkingAuth) return <p>Checking authentication...</p>;

  return (
    <div className="h-full min-h-screen bg-gray-100 p-10">
      <h1
        className={`${anton.className} mb-4 text-3xl font-bold text-[#3C2F54]`}
      >
        Super Admin Dashboard
      </h1>
      <p className="mb-6 text-lg font-semibold text-[#C5193F]">
        Approve Tools & New Admin Requests
      </p>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {/* 🔧 Pending Tools Section */}
          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-bold text-[#3C2F54]">
              Pending Tools
            </h2>
            {pendingTools.length > 0 ? (
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {pendingTools.map((tool) => (
                  <div
                    key={tool.id}
                    className="TolGlass flex flex-wrap items-center justify-between gap-4 rounded border border-[#C5193F] p-4"
                  >
                    <div className="flex flex-1 flex-col gap-3">
                      <h2
                        className={`${anton.className} text-xl text-[#3C2F54]`}
                      >
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
              <p>No pending tools.</p>
            )}
          </section>

          {/* 👤 Pending Admin Requests */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-[#3C2F54]">
              Pending Admin Requests
            </h2>
            {pendingAdmins.length > 0 ? (
              <ul className="space-y-4">
                {pendingAdmins.map((admin) => (
                  <li
                    key={admin.id}
                    className="flex items-center justify-between rounded border border-[#C5193F] p-4"
                  >
                    <div>
                      <p className="font-bold text-[#3C2F54]">
                        {admin.username}
                      </p>
                      <p className="text-[#C5193F]">{admin.email}</p>
                    </div>
                    <button
                      onClick={() => approveAdmin(admin.id)}
                      className="rounded bg-[#3C2F54] px-4 py-2 font-semibold text-white hover:bg-[#C5193F]"
                    >
                      Approve
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No pending admin requests.</p>
            )}
          </section>
        </>
      )}
    </div>
  );
};

export default SuperAdminPage;
