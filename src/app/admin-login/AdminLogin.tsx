'use client';
import React, { useState, useContext } from 'react';
import { AuthContext } from '../AuthContext';
import { useRouter } from 'next/navigation';
import { FaGlassMartiniAlt } from 'react-icons/fa';

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
    <div className="flex min-h-screen flex-col justify-center gap-3 bg-gradient-to-tr from-[#1F0033] via-[#13031F] to-[#1A002B] p-9 sm:p-12 md:p-14 lg:p-14">
      <div
        onClick={() => router.push('/')}
        className="mr-auto ml-auto flex cursor-pointer gap-2"
      >
        <FaGlassMartiniAlt size={26} color="#B547FF" />
        <p className="text-2xl font-bold text-white">DevJuice</p>
      </div>
      <p className="text-center text-xl text-white sm:text-3xl">
        Welcome back, <span className="radial_gra">Admin</span>. <br />{' '}
        Let&apos;s review some tools
      </p>
      <p className="text-center text-lg text-white">
        New? Register for Admin{' '}
        <span
          onClick={() => router.push('/admin-register')}
          className="cursor-pointer text-[#B547FF] hover:underline"
        >
          Here
        </span>
      </p>
      {error && <p className="text-base font-semibold text-red-500">{error}</p>}
      <form
        onSubmit={handleLogin}
        className="mt-4 flex w-full flex-col items-center gap-4"
      >
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full rounded border-1 border-[#BD8EFF] p-2 py-3 text-[#BD8EFF] lg:w-lg"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded border-1 border-[#BD8EFF] p-2 py-3 text-[#BD8EFF] lg:w-lg"
        />
        <button
          type="submit"
          className="cta-button w-full rounded py-2 text-lg text-gray-100 md:w-md lg:w-2xs lg:px-6 lg:text-xl"
        >
          Login
        </button>
      </form>
      <div className="RuleSec mt-10 flex flex-col items-center gap-5 xl:mt-10">
        <h1 className="radial_gra lg:text-2x text-xl">Admin role include :</h1>
        <ul className="flex list-disc flex-col gap-2 text-base text-white sm:text-lg">
          <li>Approving or rejecting tool submissions</li>
          <li>Check if the url is valid and not broken</li>
          <li>
            Soo...thats it for now we will be having <br /> really important
            tasks in the future for sure
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminLogin;
