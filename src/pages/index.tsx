import React, { useState } from "react";

import Header from "@components/Header";
import Products from "@components/Products";
import Sidebar, { Category } from "@components/Sidebar";

import { ProductProps } from "@components/Product";

import { NextPageContext } from "next";

import Footer from "@components/Footer/Footer";
import axiosinstance from "src/axios/instance";

interface Props {
  products: ProductProps[];
  categories: Category[];
}

function Home({ products, categories }: Props) {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="flex flex-col w-screen min-h-screen h-full font-medium text-sm text-text bg-slate-200 dark:bg-slate-800">
      <div
      className="bg-gray-400 dark:bg-gray-900"
      >
        <Header setShowSidebar={setShowSidebar} products={products} />
      </div>
      <main className="flex w-full">
        <Sidebar showSidebar={showSidebar} categories={categories} />
        <Products showSidebar={showSidebar} products={products} />
      </main>
      <Footer />
    </div>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const { page, tags } = context.query;

  const products = await axiosinstance.get("/api/products", {
    params: {
      take: 10,
      skip: 10 * (Number(page) - 1),
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
