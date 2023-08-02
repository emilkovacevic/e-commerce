import { useState, useEffect } from "react";

import Header from "@components/Header";
import Products from "@components/Products";
import Sidebar, { Category } from "@components/Sidebar";

import { NextPageContext } from "next";
import { useRouter } from "next/router";

import { ProductProps } from "@components/Product";
import axiosinstance from "src/axios/instance";

interface Props {
  categories: Category[];
  products: ProductProps[];
}

function Home({ products, categories }: Props) {
  const router = useRouter();

  const [showSidebar, setShowSidebar] = useState(false);

  const category = categories.find((c) => c.slug === (router.query.category as string));

  useEffect(() => {
    if (!categories.map((c) => c.slug).includes(category?.slug as string)) {
      router.push("/");
      return;
    }
  }, [category, categories, router]);

  return (
    <main className="flex flex-col w-screen min-h-screen text-sm font-medium text-text">
      <Header setShowSidebar={setShowSidebar} products={products} />
      <main className="flex w-full h-full">
        <Sidebar showSidebar={showSidebar} categories={categories} />
        <Products showSidebar={showSidebar} category={category} products={products} />
      </main>
    </main>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const { page, category, tags } = context.query;

  const products = await axiosinstance.get("/api/products", {
    params: {
      take: 10,
      skip: 10 * (Number(page) - 1),
      category: category,
      tags: JSON.stringify(tags),
    },
  });
  const categories = await axiosinstance.get("/api/categories");

  return {
    props: {
      products: products.data,
      categories: categories.data,
    },
  };
}

export default Home;
