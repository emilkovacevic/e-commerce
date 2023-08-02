import React, { useRef } from "react";

import { useRouter } from "next/router";

import { ProductProps } from "@components/Product";
import axiosinstance from "src/axios/instance";

interface Props {
  products: ProductProps[];
}

function DeleteProduct({ products }: Props) {
  const router = useRouter();

  const productNameRef = useRef<HTMLSelectElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const productName = productNameRef.current?.value;
    const product = products.find((product) => product.name === productName);

    if (!product) return;

    const response = await axiosinstance.delete(`/api/delete/products/${product.id}`);

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
        <h1 className="text-2xl font-semibold text-left">Delete Product</h1>
      </header>
      <form className="flex flex-col w-1/3 gap-4 text-sm font-medium" noValidate onSubmit={handleSubmit}>
        <div className="flex w-full gap-4">
          <select
            ref={productNameRef}
            id="product"
            className="w-full px-4 py-2 font-normal text-black transition-all rounded outline-none ring-1 ring-gray-300 focus:ring-violet-700"
            defaultValue="Pick a product..."
          >
            <option hidden defaultValue="Pick a product...">
              Pick a product...
            </option>
            {products.map((product) => (
              <option key={product.name} defaultValue={product.name}>
                {product.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-end w-full gap-4 pt-4">
          <button type="button" onClick={() => router.push("/admin")} className="px-4 py-2 rounded bg-violet-100">
            Cancel
          </button>
          <button type="submit" className="px-4 py-2 text-white rounded bg-violet-700">
            Delete
          </button>
        </div>
      </form>
    </main>
  );
}

export async function getServerSideProps() {
  const response = await axiosinstance.get("/api/products");

  return {
    props: {
      products: response.data,
    },
  };
}

export default DeleteProduct;
