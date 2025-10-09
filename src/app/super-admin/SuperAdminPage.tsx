'use client';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { AuthContext } from '../AuthContext';
import { Tool } from '@/app/types';

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

  //  Auth check
  useEffect(() => {
    axios
      .get(`${backendUrl}/admins/me`, { withCredentials: true })
      .then((res) => {
        if (!res.data.is_superuser) {
          router.replace('/admin'); // Not a super admin → redirect
        } else {
          setCheckingAuth(false);
        }
       })
      .catch((err) => {
        console.error('Auth check failed:', err);
        auth?.logout();
        router.replace('/admin-login');
      });
  }, [auth, backendUrl, router]);

  //  Fetch data once auth is confirmed
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
  }, [checkingAuth, backendUrl]);

  //  Approve a tool
  const approveTool = async (id: number) => {
    try {
      await axios.put(
        `${backendUrl}/tools/${id}/approve`,
        {},
        { withCredentials: true }
      );
      setPendingTools(
        pendingTools.filter((tool) => String(tool.id) !== String(id))
      );
    } catch (error) {
      console.error('Error approving tool:', error);
    }
  };

  // Reject a tool
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

  //  Approve an admin
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

  const declineAdmin = async (username: string) => {
    try {
      await axios.delete(`${backendUrl}/admins/decline-admin`, {
        params: { username },
        withCredentials: true,
      });
      setPendingAdmins(
        pendingAdmins.filter((admin) => admin.username !== username)
      );
    } catch (error) {
      console.error('Error declining admin:', error);
    }
  };

  if (checkingAuth)
    return (
      <p className="flex h-screen items-center justify-center bg-[#121212] text-center text-white">
        Checking authentication...
      </p>
    );

  return (
    <div className="h-full min-h-screen bg-[#121212] p-10">
      <h1 className={`mb-4 text-4xl font-bold text-white`}>
        <span className="radial_gra">Super Admin</span> Dashboard
      </h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {/* 🔧 Pending Tools Section */}
          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-semibold text-white">
              Pending Tools
            </h2>
            {pendingTools.length > 0 ? (
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {pendingTools.map((tool) => (
                  <div
                    key={tool.id}
                    className="glass-card flex flex-wrap items-center justify-between gap-4 rounded border p-4"
                  >
                    <div className="flex flex-1 flex-col gap-3">
                      <h2 className={`text-2xl font-semibold text-white`}>
                        {tool.name}
                      </h2>

                      <p className="text-base font-semibold text-white">
                        <span className="text-lg text-[#BD8EFF]">
                          Category:
                        </span>{' '}
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
                        className="cta-button cursor-pointer border-2 px-4 py-2 font-semibold"
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
              <p className="text-lg text-white">No pending tools.</p>
            )}
          </section>
          {/*  Pending Admin Requests */}
          <section>
            <h2 className="mb-4 grid grid-cols-1 gap-5 text-2xl font-bold text-white md:grid-cols-2">
              Pending Admin Requests
            </h2>
            {pendingAdmins.length > 0 ? (
              <ul className="grid grid-cols-1 gap-5 space-y-0 md:grid-cols-2">
                {pendingAdmins.map((admin) => (
                  <li
                    key={admin.id}
                    className="flex flex-col items-center justify-between gap-5 rounded border-1 border-[#BD8EFF] p-4 sm:flex-row"
                  >
                    <div>
                      <p className="font-bold text-white">{admin.username}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => approveAdmin(admin.id)}
                        className="cta-button px-4 py-2 font-semibold"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => declineAdmin(admin.username)}
                        className="glow-button px-4 py-2 font-semibold"
                      >
                        Reject
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-lg text-white">No pending admin requests.</p>
            )}
          </section>
        </>
      )}
    </div>
  );
};

export default SuperAdminPage;
