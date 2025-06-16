'use client';
import React, { useState } from 'react';
import { FaGlassMartiniAlt } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const AdminRegisterPage = () => {
  const router = useRouter();
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
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error('Register error:', err);
        setError(err.message);
      } else {
        console.error('Unknown error:', err);
        setError('Something went wrong.');
      }
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
        Want to help manage the tools? <br /> Request{' '}
        <span className="radial_gra">admin access below.</span>
      </p>
      <p className="text-center text-lg text-white">
        Already an admin? Login{' '}
        <span
          onClick={() => router.push('/admin-login')}
          className="cursor-pointer text-[#B547FF] hover:underline"
        >
          Here
        </span>
      </p>
      {error && <p className="text-base font-semibold text-red-300">{error}</p>}
      {success && (
        <p className="text-center text-base font-semibold text-green-500">
          {success}
        </p>
      )}
      <form
        onSubmit={handleRegister}
        className="mt-8 flex w-full flex-col items-center gap-4"
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
          Register
        </button>
      </form>
      <div className="RuleSec mt-10 flex flex-col items-center gap-5 xl:mt-10">
        <h1 className="radial_gra lg:text-2x text-xl">Admin role include :</h1>
        <ul className="flex list-disc flex-col gap-2 pl-5 text-base text-white sm:text-lg">
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

export default AdminRegisterPage;
