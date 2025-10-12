'use client';
import { useState } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { useRouter } from 'next/navigation';

const AddTool = () => {
  const router = useRouter();

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
        ? // checkboxes values are boolean, so using ".checked"
          (e.target as HTMLInputElement).checked
        : value;

    // Updating only the changed fields , mapping all the old datas
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
      // Reset all fields after submitting a tool
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
    <div className="bg-gradient-to-t from-[#1F0033] via-[#13031F] to-[#0d0016]">
      <NavBar />
      <div className="mx-8 flex flex-col gap-6 pt-6 xl:mx-20">
        <div className="flex flex-col items-start gap-2 text-left">
          <h1 className="text-xl font-bold text-white sm:text-2xl xl:text-3xl">
            Suggest a <span className="radial_gra">New Tool</span>
          </h1>
          <p className="text-white sm:text-lg">
            Found something useful (or borderline genius)? <br /> Add it —{' '}
            <span className="text-[#B547FF]">we&apos;re all ears.</span>
          </p>
        </div>
        <div className="items-start py-3 text-left">
          <p className="text-white sm:text-lg">
            Before submitting, read the tool submission rules -{' '}
            <a
              href="https://github.com/Adhithyan2004/devJuice/blob/main/docs/TOOL_ADDING.md"
              target="_blank"
              rel="noopener noreferrer"
            >
              <u className="text-[#B547FF]">Rules</u>
            </a>
          </p>
          <p className="mt-2 text-white sm:text-lg">
            Admin? Login{' '}
            <span
              onClick={() => router.push('/admin-login')}
              className="cursor-pointer text-[#B547FF] hover:underline"
            >
              here
            </span>
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
                className="w-full rounded-md border-1 border-[#BD8EFF] p-2 font-semibold text-white"
                required
              />
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Description"
                className="h-28 w-full rounded-md border-1 border-[#BD8EFF] p-2 font-semibold text-white 2xl:h-36"
              />
              <input
                name="categories"
                value={form.categories}
                onChange={handleChange}
                placeholder="Category"
                className="w-full rounded-md border-1 border-[#BD8EFF] p-2 font-semibold text-white"
                required
              />
              <input
                name="url"
                placeholder="Tool URL"
                value={form.url}
                onChange={handleChange}
                className="w-full rounded-md border-1 border-[#BD8EFF] p-2 font-semibold text-white"
                required
              />
            </div>
            <div className="AddRgt flex flex-col gap-4 lg:w-1/2">
              <select
                name="pricing"
                value={form.pricing}
                onChange={handleChange}
                className="custom-select w-full rounded border-1 border-[#BD8EFF] bg-[#121212] p-2 pr-8 font-semibold text-white"
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
                className="h-28 w-full rounded border-1 border-[#BD8EFF] p-2 font-semibold text-white 2xl:h-30"
              />

              {/* Key Features */}
              <textarea
                name="key_features"
                value={form.key_features}
                onChange={handleChange}
                placeholder="List key features (comma-separated)"
                className="h-28 w-full rounded border-1 border-[#BD8EFF] p-2 font-semibold text-white 2xl:h-30"
              />

              {/* Requires Account Toggle */}
              <label className="flex items-center gap-2 text-white">
                <input
                  type="checkbox"
                  name="requires_account"
                  checked={form.requires_account}
                  onChange={handleChange}
                  className="h-5 w-5 cursor-pointer appearance-none rounded-sm border-1 border-[#632ead] bg-gray-100 font-semibold transition-all checked:border-transparent checked:bg-[#B547FF] checked:text-gray-100 focus:outline-none"
                />
                Requires an account?
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="cta-button py-2 lg:self-start lg:px-6 lg:py-2 lg:text-lg"
          >
            Submit
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default AddTool;
