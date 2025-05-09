'use client';
import { useState } from 'react';
import axios from 'axios';
import { Anton } from 'next/font/google';

const anton = Anton({ subsets: ['latin'], weight: '400' });

const AddTool = () => {
  const [form, setForm] = useState({
    name: '',
    description: '',
    categories: '',
    url: '',
    pricing: 'free',
    problem_it_solves: '',
    key_features: '',
    requires_account: false,
  });

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    const updatedValue =
      type === 'checkbox' && 'checked' in e.target
        ? (e.target as HTMLInputElement).checked
        : value;

    setForm({
      ...form,
      [name]: updatedValue,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post(`${backendUrl}/tools/`, form);
      alert('Tool submitted for review!');
      setForm({
        name: '',
        description: '',
        categories: '',
        url: '',
        pricing: 'free',
        problem_it_solves: '',
        key_features: '',
        requires_account: false,
      });
    } catch (error) {
      console.error('Error submitting tool:', error);
    }
  };

  return (
    <div className="flex min-h-screen flex-col justify-center gap-6 bg-gray-100 p-8 py-4">
      <div className="my-4 mb-6 flex flex-col gap-2 text-center sm:items-start sm:text-left">
        <h1 className={`text-3xl font-bold text-[#C5193F]`}>
          Suggest a New Tool
        </h1>
        <p className={`text-[#C5193F] sm:text-lg`}>
          Found something useful (or borderline genius)? <br /> Add it —{' '}
          <span className="text-[#3C2F54]">we&apos;re all ears.</span>
        </p>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="FrmDiv flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between lg:gap-6">
          <div className="AddLft flex flex-col gap-4 lg:w-1/2">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Tool Name"
              className={`w-full rounded border-2 border-[#7C7C7C] p-2 font-semibold text-[#C5193F]`}
              required
            />
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Description"
              className={`h-28 w-full rounded border-2 border-[#7C7C7C] p-2 font-semibold text-[#C5193F] 2xl:h-36`}
            />
            <input
              name="categories"
              value={form.categories}
              onChange={handleChange}
              placeholder="Category"
              className={`w-full rounded border-2 border-[#7C7C7C] p-2 font-semibold text-[#C5193F]`}
              required
            />
            <input
              name="url"
              placeholder="Tool URL"
              value={form.url}
              onChange={handleChange}
              className={`w-full rounded border-2 border-[#7C7C7C] p-2 font-semibold text-[#C5193F]`}
              required
            />
          </div>
          <div className="AddRgt flex flex-col gap-4 lg:w-1/2">
            {/* Pricing Dropdown */}
            {/* <label
              className={`${anton.className} text-xl text-[#C5193F] sm:text-[#3C2F54]`}
            >
              Pricing:
            </label> */}
            <select
              name="pricing"
              value={form.pricing}
              onChange={handleChange}
              className={`custom-select w-full rounded border-2 border-[#7C7C7C] bg-gray-100 p-2 pr-8 font-semibold text-[#C5193F]`}
            >
              <option value="free">Free</option>
              <option value="premium">Premium</option>
              <option value="freemium">Freemium</option>
            </select>

            {/* Problem It Solves */}
            <textarea
              name="problem_it_solves"
              value={form.problem_it_solves}
              onChange={handleChange}
              placeholder="What problem does this tool solve?"
              className={`h-28 w-full rounded border-2 border-[#7C7C7C] p-2 font-semibold text-[#C5193F] 2xl:h-30`}
            />

            {/* Key Features */}
            <textarea
              name="key_features"
              value={form.key_features}
              onChange={handleChange}
              placeholder="List key features (comma-separated)"
              className={`h-28 w-full rounded border-2 border-[#7C7C7C] p-2 font-semibold text-[#C5193F] 2xl:h-30`}
            />

            {/* Requires Account Toggle */}
            <label className="flex items-center gap-2 text-[#C5193F]">
              <input
                type="checkbox"
                name="requires_account"
                checked={form.requires_account}
                onChange={handleChange}
                className="h-5 w-5 cursor-pointer appearance-none rounded-sm border-2 border-[#7C7C7C] bg-gray-100 font-semibold transition-all checked:border-transparent checked:bg-[#3C2F54] checked:text-gray-100 focus:outline-none"
              />
              Requires an account?
            </label>
          </div>
        </div>
        <button
          type="submit"
          className={`${anton.className} rounded bg-[#3C2F54] p-2 text-gray-100 lg:self-start lg:px-6 lg:py-2 lg:text-lg`}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddTool;
