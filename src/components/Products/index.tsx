import React, { useState } from "react";

import Product from "@components/Product";

import Link from "next/link";

import { useRouter } from "next/router";

import { Category } from "@components/Sidebar";
import { ProductProps } from "@components/Product";

interface Props {
  showSidebar: boolean;
  category?: Category;
  products: ProductProps[];
}

function Products({ showSidebar, category, products }: Props) {
  const router = useRouter();

  const [filterByPrice, setFilterByPrice] = useState("");

  const fromSlugToName = (slug: string) => {
    return slug
      .split("-")
      .map((s) => {
        return s.charAt(0).toUpperCase() + s.slice(1);
      })
      .join(" ");
  };

  const tags = router.query.tags;

  const formatTags = () => {
    if (typeof tags === "string") {
      return Array(tags);
    }
    return tags;
  };

  const formattedTags = formatTags();

  const productsFilteredByPrice = () => {
    if (filterByPrice === "low") {
      return products.sort((a, b) => {
        if (a.price < b.price) {
          return -1;
        }
        return 0;
      });
    }

    if (filterByPrice === "high") {
      return products.sort((a, b) => {
        if (a.price > b.price) {
          return -1;
        }
        return 0;
      });
    }

    return products;
  };

  const filteredProducts = productsFilteredByPrice();

  const page = Number(router.query.page) || 1;

  return (
    <main className="flex flex-col w-full h-full">
      <nav className="flex gap-4 px-8 pt-8 text-gray-500 group">
        <Link
        className={`${category ? "text-gray-500" : "text-gray-700 dark:text-gray-200"} transition-colors hover:text-violet-700`}
        href="/">
            Main Page
        </Link>
        {category && (
          <>
            -&gt;
            <Link 
            className="text-gray-700 transition-colors hover:text-violet-700"
            href={`/${category.slug}`}>
            {category.name}
            </Link>
          </>
        )}
      </nav>
      <h1 className="px-8 pt-8 text-2xl font-black text-gray-700 dark:text-white">{category ? category.name : "Main Page"}</h1>
      <div className="flex items-center justify-between w-full gap-4 p-8">
        <div className="flex items-center gap-4">
          {formattedTags ? (
            <>
              {formattedTags?.map((tag, index) => (
                <span key={index} className="px-4 py-2 text-xs text-gray-500 bg-gray-100 rounded-xl">
                  {fromSlugToName(tag)}
                </span>
              ))}
              {tags && (
                <button
                  onClick={() =>
                    router
                      .push({
                        pathname: category ? "/" + category.slug : "/",
                      })
                      .then(() => router.reload())
                  }
                >
                  &times;
                </button>
              )}
            </>
          ) : (
            <span className="px-4 py-2 text-xs text-gray-500 bg-gray-100 rounded-xl">No Search Tags</span>
          )}
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={filterByPrice === "low" ? () => setFilterByPrice("high") : () => setFilterByPrice("low")}
            className={`flex items-center gap-1 px-4 py-2 rounded-xl bg-gray-100 text-xs transition-all ${
              filterByPrice === "low" || filterByPrice === "high" ? "ring-1 ring-violet-700 text-violet-700" : ""
            }`}
          >
            <span>{filterByPrice === "low" ? "↓" : "↑"}</span>
            <span>Price</span>
          </button>
          <button 
          className="gap-1 px-4 py-2 text-xs transition-all bg-gray-100 ring-1 rounded-xl"
          onClick={() => setFilterByPrice("")}>&times;</button>
        </div>
      </div>
      <ul
        className={`flex gap-4 flex-wrap justify-center`}
      >
        {filteredProducts?.length > 0 ? (
          filteredProducts.map((product) => <Product key={product.id} showSidebar={showSidebar} product={product} />)
        ) : (
          <span className="w-full text-lg text-center text-gray-700 dark:text-white">There are no items matching your filters.</span>
        )}
      </ul>
      <div className="flex items-center justify-center w-full gap-4 px-8 py-16">
        {page > 1 && (
          <button
            onClick={() =>
              router.push({
                pathname: category ? "/" + category.slug : "/",
                query: {
                  page: page - 1,
                },
              })
            }
            className="w-12 h-12 text-gray-700 dark:text-white rounded-xl"
          >
            {page - 1}
          </button>
        )}
        <button
          onClick={() =>
            router.push({
              pathname: category ? "/" + category.slug : "/",
              query: {
                page: page,
              },
            })
          }
          className="w-12 h-12 text-gray-100 transition-colors rounded-xl bg-violet-700 hover:bg-violet-900 hover:text-white"
        >
          {page}
        </button>
        {filteredProducts?.length >= 10 && (
          <button
            onClick={() =>
              router.push({
                pathname: category ? "/" + category.slug : "/",
                query: {
                  page: page + 1,
                },
              })
            }
            className="w-12 h-12 text-gray-700 dark:text-white rounded-xl"
          >
            {page + 1}
          </button>
        )}
      </div>
    </main>
  );
}

export default Products;
