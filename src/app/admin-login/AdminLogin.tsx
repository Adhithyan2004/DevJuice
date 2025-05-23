'use client';
import React, { useState, useContext } from 'react';
import { AuthContext } from '../AuthContext';
import { useRouter } from 'next/navigation';
import { Anton } from 'next/font/google';

const anton = Anton({ subsets: ['latin'], weight: '400' });

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const auth = useContext(AuthContext);
  const router = useRouter();

  if (!auth) {
    return <p>Error: AuthContext not available.</p>;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }

    const success = await auth.login(username, password);
    if (success) {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/admins/me`,
          { credentials: 'include' }
        );
        const data = await res.json();

        if (data.is_superuser) {
          router.push('/super-admin');
        } else {
          router.push('/admin');
        }
      } catch (err) {
        console.error('Error fetching admin info:', err);
        setError('Something went wrong after login.');
      }
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="flex min-h-screen flex-col gap-4 bg-gray-100 p-9 sm:p-12 md:p-14 lg:p-16">
      <div className="flex flex-col gap-2">
        <h2 className={`${anton.className} text-3xl text-[#3C2F54]`}>
          Admin Login
        </h2>
        <p className="w-72 text-base text-[#C5193F] sm:text-lg">
          The fate of submitted tools rests in your hands!
        </p>
      </div>
      {error && <p className="text-base font-semibold text-red-500">{error}</p>}
      <form onSubmit={handleLogin} className="flex w-full flex-col gap-3">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full rounded border-2 border-[#7C7C7C] p-2 text-[#C5193F] lg:w-lg"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded border-2 border-[#7C7C7C] p-2 text-[#C5193F] lg:w-lg"
        />
        <button
          type="submit"
          className={`${anton.className} mt-4 w-fit rounded bg-[#3C2F54] px-5 py-2 text-lg text-gray-100 lg:px-6 lg:text-xl`}
        >
          Login
        </button>
      </form>
      <div className="RuleSec mt-12 flex flex-col gap-5 xl:mt-20">
        <h1
          className={`${anton.className} text-2xl text-[#C5193F] lg:text-3xl`}
        >
          <span className="text-[#3C2F54]">Admin</span> role include :
        </h1>
        <ul className="flex list-disc flex-col gap-2 pl-5 text-base text-[#C5193F] sm:text-lg">
          <li>Approving or rejecting tool submissions</li>
          <li>Check if the url is valid and not broken</li>
          <li>
            Soo...thats it for now we will be having really important tasks in
            the future for sure
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminLogin;
