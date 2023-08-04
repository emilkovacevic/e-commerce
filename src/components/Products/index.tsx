import React, { useState } from "react";

import Product from "@components/Product";

import Link from "next/link";

import { useRouter } from "next/router";

import { Category } from "@components/Sidebar";
import { ProductProps } from "@components/Product";
import useStickyNav from "src/hooks/useNavbarOnTop";

interface Props {
  showSidebar: boolean;
  category?: Category;
  products: ProductProps[];
}

function Products({ showSidebar, category, products }: Props) {
  const router = useRouter();

  const [filterByPrice, setFilterByPrice] = useState("");
  const { isNavOnTopOfPage } = useStickyNav();
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
    <main className="w-full mx-4 text-right">
      <header className="sticky top-0 z-20 bg-white dark:bg-slate-900 md:top-16">
        <div
          className={`${
            !isNavOnTopOfPage
              ? "shadow-md transition-transform flex flex-wrap justify-between px-2 "
              : "px-2"
          }
        `}
        >
          <nav className="flex gap-4 mx-2 my-4 text-gray-500 md:mx-0 md:my-0 md:pt-8 md:mb-0 dark:text-gray-300 group">
            <Link
              className={`${
                category
                  ? "text-gray-500 dark:text-gray-100"
                  : "text-gray-700 dark:text-gray-200"
              }  transition-colors hover:text-violet-700 dark:hover:text-violet-200`}
              href="/"
            >
              Main Page
            </Link>
            {category && (
              <>
                -&gt;
                <Link
                  className="text-gray-700 transition-colors dark:text-gray-100 hover:text-violet-700 dark:hover:text-violet-200"
                  href={`/${category.slug}`}
                >
                  {category.name}
                </Link>
              </>
            )}
          </nav>
          <div className="flex-wrap items-center hidden gap-4 md:flex md:my-8 md:justify-between ">
            <div className="flex flex-wrap items-stretch gap-4 ">
              <span className="px-4 py-4 text-xs transition-all bg-gray-100 rounded-md">
                {products.length} products on page
              </span>
              {formattedTags ? (
                <>
                  <span className="px-4 py-4 text-xs text-gray-500 bg-gray-100 rounded-md">
                    Tags:
                    {formattedTags?.map((tag, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 text-xs text-gray-500 bg-gray-100 rounded-md"
                      >
                        {fromSlugToName(tag)}
                      </span>
                    ))}
                  </span>
                  {tags && (
                    <button
                      title="clear tags"
                      className="px-4 py-4 text-xs text-gray-500 bg-gray-100 rounded-md"
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
                <span className="px-4 py-4 text-xs text-gray-500 bg-gray-100 rounded-md">
                  No Search Tags
                </span>
              )}
            </div>

            <div className="flex items-stretch gap-4">
              <button
                onClick={
                  filterByPrice === "low"
                    ? () => setFilterByPrice("high")
                    : () => setFilterByPrice("low")
                }
                className={`flex  items-stretch gap-1 px-4 py-4 rounded-md bg-gray-100 text-xs transition-all ${
                  filterByPrice === "low" || filterByPrice === "high"
                    ? "ring-1 ring-violet-700 text-violet-700"
                    : ""
                }`}
              >
                <span>{filterByPrice === "low" ? "↓" : "↑"} Price</span>
              </button>
            </div>
          </div>
        </div>
      </header>
      <ul className="flex flex-wrap justify-start gap-4">
        {filteredProducts?.length > 0 ? (
          filteredProducts.map((product) => (
            <Product key={product.id} product={product} />
          ))
        ) : (
          <span className="w-full text-lg text-center text-gray-700 dark:text-white">
            There are no items matching your filters.
          </span>
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
            className="w-12 h-12 text-gray-700 rounded-md dark:text-white"
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
          className="w-12 h-12 text-gray-100 transition-colors rounded-md bg-violet-700 hover:bg-violet-900 hover:text-white"
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
            className="w-12 h-12 text-gray-700 rounded-md dark:text-white"
          >
            {page + 1}
          </button>
        )}
      </div>
    </main>
  );
}

export default Products;
