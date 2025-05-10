'use client';
import React, { useState } from 'react';
import { Anton } from 'next/font/google';

const anton = Anton({ subsets: ['latin'], weight: '400' });

const AdminRegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    setError('');
    setSuccess('');

    if (!username || !password) {
      setError('Please fill out both fields.');
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/admins/request-admin`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        }
      );

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || 'Registration failed');
      }

      setSuccess('Request submitted! Waiting for approval.');
      setUsername('');
      setPassword('');

      // Optional redirect after 2s
      // setTimeout(() => router.push('/'), 2000);
    } catch (err: any) {
      console.error('Register error:', err);
      setError(err.message);
    }
  };

  return (
    <div className="flex min-h-screen flex-col gap-4 bg-gray-100 p-9 sm:p-12 md:p-14 lg:p-16">
      <div className="flex flex-col gap-2">
        <h2 className={`${anton.className} text-3xl text-[#3C2F54]`}>
          Admin Register
        </h2>
        <p className="w-72 text-base text-[#C5193F] sm:text-lg">
          Join the Admin Team. Fill Out Your Application!
        </p>
      </div>

      {error && <p className="text-base font-semibold text-red-500">{error}</p>}
      {success && (
        <p className="text-base font-semibold text-green-600">{success}</p>
      )}

      <form onSubmit={handleRegister} className="flex w-full flex-col gap-3">
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
          Register
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
            So... that's it for now. We&apos;ll have more critical tasks soon!
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminRegisterPage;
