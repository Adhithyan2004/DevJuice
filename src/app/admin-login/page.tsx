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
    const success = await auth.login(username, password);
    if (success) {
      router.push('/admin'); // ✅ Redirect after login
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-start bg-black p-14">
      <h2 className={`${anton.className} text-3xl text-white`}>
        Admin Login
      </h2>
      <p className="text-lg text-white">
        Help us keep things useful, usable, and uniquely brilliant.
      </p>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-lg rounded border border-[#7C7C7C] p-2 text-white"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-lg rounded border border-[#7C7C7C] p-2 text-white"
        />
        <button
          type="submit"
          className={`${anton.className} w-fit rounded bg-[#00CFFF] px-6 py-2 text-xl text-black`}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
