"use client";
import { useState } from "react";
import axios from "axios";

const AddTool = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    categories: "",
    url: "",
    pricing: "free",
    problem_it_solves: "",
    key_features: "",
    requires_account: false,
  });

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/tools/", form);
      alert("Tool submitted for review!");
      setForm({
        name: "",
        description: "",
        categories: "",
        url: "",
        pricing: "free",
        problem_it_solves: "",
        key_features: "",
        requires_account: false,
      });
    } catch (error) {
      console.error("Error submitting tool:", error);
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">Suggest a New Tool</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Tool Name" className="p-2 border rounded" required />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="p-2 border rounded"  />
        <input name="categories" value={form.categories} onChange={handleChange} placeholder="Category" className="p-2 border rounded" required />
        <input name="url" placeholder="Tool URL" value={form.url} onChange={handleChange} className="w-full p-2 border rounded mb-2" required />

        {/* Pricing Dropdown */}
        <label className="font-semibold">Pricing:</label>
        <select name="pricing" value={form.pricing} onChange={handleChange} className="p-2 border rounded">
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
          className="p-2 border rounded"
        />

        {/* Key Features */}
        <textarea
          name="key_features"
          value={form.key_features}
          onChange={handleChange}
          placeholder="List key features (comma-separated)"
          className="p-2 border rounded"
        />

        {/* Requires Account Toggle */}
        <label className="flex items-center gap-2">
          <input type="checkbox" name="requires_account" checked={form.requires_account} onChange={handleChange} />
          Requires an account?
        </label>

        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Submit</button>
      </form>
    </div>
  );
};

export default AddTool;
