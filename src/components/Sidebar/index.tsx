import React, { useState, useEffect, useContext } from "react";

import Checkbox from "@components/Checkbox";

import { useRouter } from "next/router";

import { ProductProps } from "@components/Product";
import Link from "next/link";
import ColorThemeSwitcher from "@components/Header/ColorThemeSwitcher";
import { UserContext } from "@contexts/UserProvider";

const LABELS = [ 'Blue', 'Green', 'White', 'Men', 'Women', 'New' ]

export interface Category {
  name: string;
  products: ProductProps[];
  slug: string;
}

interface Props {
  showSidebar: boolean;
  categories: Category[];
}

function Sidebar({ showSidebar, categories }: Props) {
  const router = useRouter();
  const currentCategory = router.query.category;
  const { user, isAuthenticated } = useContext(UserContext);
  const [tags, setTags] = useState<string[]>(
    (router.query.tags as string[]) || []
  );

  useEffect(() => {
    if (router.query.category) {
      router.push({
        pathname: "/" + router.query.category,
        query: {
          tags: tags,
        },
      });
      return;
    }

    router.push({
      pathname: "/",
      query: {
        tags: tags,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tags]);

  const sortedCategories = categories.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    return 0;
  });

  return (
    <div
    className={`${
    showSidebar
    ? `translate-x-0 sticky`
    : "translate-x-[-9999px] absolute"}
     h-screen md:sticky mt-0 md:translate-x-0 bg-gray-100 top-20 md:top-0 dark:bg-gray-800 w-fit`}
    >
    <aside
      className={`
      ${
        showSidebar
          ? `translate-x-0`
          : "translate-x-[-9999px] "
      } md:relative md:translate-x-0 flex flex-col sm:w-1/3 md:w-1/5 lg:1/6 transition-all duration-300`}
    >
      <nav className="flex flex-col gap-4 md:hidden sm:mx-4 sm:py-5">
        <span className="mt-6 ml-4 text-base font-semibold dark:text-white">USER</span>
        <ul className="mx-2 text-lg dark:text-white">
          {isAuthenticated ? (
            <>
              <li className="p-2 my-2 uppercase text-md">
                <Link href="/user">Profile</Link>
              </li>
            </>
          ) : (
            <li className="p-2 my-2 uppercase text-md">
              <Link href="/login">Login</Link>
            </li>
          )}
          <li className="p-2 my-2 uppercase text-md">
            <Link href="/wishlist">Wishlist</Link>
          </li>
          <li className="p-2 my-2 uppercase text-md">
            <Link href="/cart">Cart</Link>
          </li>

          <li className="p-2 my-2 capitalize text-md">
            <ColorThemeSwitcher />
          </li>
        </ul>
      </nav>
      
      <section className="flex flex-wrap justify-start">
        <nav className="flex flex-re flex-col gap-4 mx-4 py-4 sm:mx-8 sm:py-4 md:border-b-[1px] border-gray-300 ">
          <span className="text-base font-semibold dark:text-white">
            CATEGORY
          </span>
          <Link
            className="px-3 py-2 border border-black w-fit dark:text-white hover:bg-slate-500/50 dark:border-white"
            href="/"
          >
            CLEAR
          </Link>
          {sortedCategories.map((category) => (
            <Link
              href={`/${category.slug}`}
              key={category.name}
              className={`w-fit ${
                (currentCategory as string) === category.slug
                  ? "text-violet-700"
                  : "dark:text-gray-300 text-gray-900"
              } transition-all hover:text-violet-700`}
            >
              {category.name.toUpperCase()}
            </Link>
          ))}
        </nav>
      </section>
        <menu className="flex flex-col gap-4 py-4 mx-3 sm:mx-4 sm:py-4 md:mx-6 md:py-4">
          <span className="text-base font-semibold dark:text-white">Tags</span>
          <ul className="flex flex-col gap-4 justify-evenly">
            {LABELS.map(label => (
              <li
              key={label}
              ><Checkbox label={label} tags={tags} setTags={setTags} />
              </li>
            ))}
          </ul>
        </menu>
    </aside>
    </div>
  );
}

export default Sidebar;
