import React, { useState, useEffect, useContext } from "react";

import Checkbox from "@components/Checkbox";
import { useRouter } from "next/router";
import { ProductProps } from "@components/Product";
import Link from "next/link";
import ColorThemeSwitcher from "@components/Header/ColorThemeSwitcher";
import { UserContext } from "@contexts/UserProvider";
import useScreenWidth from "src/hooks/useScreenWidth";

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
  const { isScreenSizeWiderThan768px } = useScreenWidth()
  const currentCategory = router.query.category;
  const { isAuthenticated } = useContext(UserContext);
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
<aside
  className='bg-gray-300 dark:bg-gray-800'
>
  <div
    className={`
       ${isScreenSizeWiderThan768px ? 'h-fit sticky top-20' : showSidebar ? ' w-full fixed z-50 bg-slate-200 dark:bg-slate-700 border-t top-16 flex translate-x-0 ' : 'flex absolute opacity-20 -translate-x-full'}
       transition-all
      `}
  >
      <nav
        className='flex flex-col gap-4 md:hidden'
      >
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
    </div>
    </aside>
  );
}

export default Sidebar;
