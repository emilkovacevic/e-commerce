import React, { useState } from "react";

import { useRouter } from "next/router";

import axiosinstance from "src/axios/instance";

function CreateCategory() {
  const router = useRouter();

  const [category, setCategory] = useState("");

  const fromNameToSlug = (name: string) => {
    return name
      .split(" ")
      .map((s) => {
        return s.toLowerCase();
      })
      .join("-");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!category) return;

    const response = await axiosinstance.post("/api/create/category", {
      name: category,
      slug: fromNameToSlug(category),
    });

    if (response.status === 200) {
      router.reload();
      return;
    }
  };

  return (
    <main className="flex flex-col items-center w-screen min-h-screen gap-8 p-16 bg-white dark:bg-slate-900">
      <span className="text-sm font-semibold text-gray-500">E-Commerce</span>
      <header className="flex w-1/3 gap-4 text-gray-700">
        <button onClick={() => router.push("/admin")} className="text-2xl font-semibold text-left">
          &lt;-
        </button>
        <h1 className="text-2xl font-semibold text-left">New Category</h1>
      </header>
      <form className="flex flex-col w-1/3 gap-4 text-sm font-medium" noValidate onSubmit={handleSubmit}>
        <div className="flex flex-col w-full">
          <label htmlFor="category" className="pb-2">
            Category
          </label>
          <input
            autoComplete="off"
            type="text"
            id="category"
            className="w-full px-4 py-2 font-normal transition-all bg-transparent rounded outline-none ring-1 ring-gray-300 focus:ring-violet-700"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <span className="text-gray-500">Slug: {fromNameToSlug(category)}</span>
        <div className="flex justify-end w-full gap-4 pt-4">
          <button type="button" onClick={() => router.push("/admin")} className="px-4 py-2 rounded bg-violet-100">
            Cancel
          </button>
          <button type="submit" className="px-4 py-2 text-white rounded bg-violet-700">
            Add
          </button>
        </div>
      </form>
    </main>
  );
}

export default CreateCategory;
