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

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/tools/', form);
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
    <div className="bg-black h-screen p-10">
      <div className="my-4 mb-6  gap-3 text-center sm:items-start sm:text-left">
        <h1 className={`${anton.className} text-3xl font-bold text-white`}>
          Suggest a New Tool
        </h1>
        <p className={`${anton.className} text-white sm:text-lg`}>
          Found something useful (or borderline genius)? <br /> Add it —{' '}
          <span className="text-[#00CFFF]">we're all ears.</span>
        </p>
      </div>
      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
        <div className="AddLft">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Tool Name"
            className={`${anton.className} rounded border border-[#7C7C7C] p-2 text-white`}
            required
          />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className={`${anton.className} rounded border border-[#7C7C7C] p-2 text-white`}
          />
          <input
            name="categories"
            value={form.categories}
            onChange={handleChange}
            placeholder="Category"
            className={`${anton.className} rounded border border-[#7C7C7C] p-2 text-white`}
            required
          />
          <input
            name="url"
            placeholder="Tool URL"
            value={form.url}
            onChange={handleChange}
            className={`${anton.className} rounded border border-[#7C7C7C] p-2 text-white`}
            required
          />
        </div>
        <div className="AddRgt">
          {/* Pricing Dropdown */}
          <label
            className={`${anton.className} text-xl text-white sm:text-[#00CFFF]`}
          >
            Pricing:
          </label>
          <select
            name="pricing"
            value={form.pricing}
            onChange={handleChange}
            className={`${anton.className} custom-select w-full rounded border border-[#7C7C7C] bg-black p-2 pr-8 text-white`}
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
            className={`${anton.className} rounded border border-[#7C7C7C] p-2 text-white`}
          />

          {/* Key Features */}
          <textarea
            name="key_features"
            value={form.key_features}
            onChange={handleChange}
            placeholder="List key features (comma-separated)"
            className={`${anton.className} rounded border border-[#7C7C7C] p-2 text-white`}
          />

          {/* Requires Account Toggle */}
          <label className="flex items-center gap-2 text-white">
            <input
              type="checkbox"
              name="requires_account"
              checked={form.requires_account}
              onChange={handleChange}
              className="h-5 w-5 cursor-pointer appearance-none rounded-sm border border-[#7C7C7C] bg-black transition-all checked:border-transparent checked:bg-[#00CFFF] checked:text-black focus:outline-none"
            />
            Requires an account?
          </label>
        </div>
        <button
          type="submit"
          className={`${anton.className} rounded bg-[#00CFFF] p-2 font-semibold text-black`}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddTool;
