import { useRouter } from "next/router";

function Admin() {
  const router = useRouter();

  return (
    <div className="text-sm font-medium text-black bg-white dark:text-white dark:bg-slate-900">
        <header className="flex justify-center gap-4 my-8">
        <h1 className="text-sm font-bold text-center text-gray-500 dark:text-white md:text-xl">E-Commerce Admin Dashboard</h1>
        <div className="flex gap-2 text-2xl font-semibold text-gray-700 dark:text-white">
          <button onClick={() => router.push("/")}>&lt;-</button>
          <span>Exit</span>
        </div>
      </header>
      <main className="flex flex-col items-center gap-16">
        <section className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-700 dark:text-slate-200">Products</span>
          <div className="flex gap-4">
            <button
              onClick={() => router.push("/admin/products")}
              className="px-4 py-2 text-sm font-medium text-gray-500 rounded bg-violet-100"
            >
              See All
            </button>
            <button
              onClick={() => router.push("/admin/create/product")}
              className="px-4 py-2 text-sm font-medium text-gray-100 rounded bg-violet-700"
            >
              Add
            </button>
            <button
              onClick={() => router.push("/admin/delete/product")}
              className="px-4 py-2 text-sm font-medium text-gray-100 rounded bg-violet-700"
            >
              Delete
            </button>
          </div>
        </section>
        <section className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-700 text-slate-200">Categories</span>
          <div className="flex gap-4">
            <button
              onClick={() => router.push("/admin/categories")}
              className="px-4 py-2 text-sm font-medium text-gray-500 rounded bg-violet-100"
            >
              See All
            </button>
            <button
              onClick={() => router.push("/admin/create/category")}
              className="px-4 py-2 text-sm font-medium text-gray-100 rounded bg-violet-700"
            >
              Add
            </button>
            <button
              onClick={() => router.push("/admin/delete/category")}
              className="px-4 py-2 text-sm font-medium text-gray-100 rounded bg-violet-700"
            >
              Delete
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Admin;
