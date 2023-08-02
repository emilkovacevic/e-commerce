import React, { useState, useEffect } from "react";

import Checkbox from "@components/Checkbox";

import { useRouter } from "next/router";

import { ProductProps } from "@components/Product";
import Link from "next/link";

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

  const [tags, setTags] = useState<string[]>((router.query.tags as string[]) || []);

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

  useEffect(() => {
    if (showSidebar) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
}, [showSidebar]);


  const sortedCategories = categories.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    return 0;
  });

  return (
    <aside
      className={`${
        showSidebar ? "absolute left-0 z-50 dark:bg-black bg-white" : "hidden md:block"
      } flex flex-row md:flex-col w-full md:w-1/3`}
    >
      <nav className="flex flex-col gap-4 mx-8 py-8 sm:mx-16 sm:py-16 border-b-[1px] border-gray-300 overflow-hidden">
        <span className="text-base font-semibold dark:text-white">CATEGORY</span>
        <Link
        className="px-6 py-2 ml-4 border border-black w-fit dark:text-white hover:bg-slate-500/50 dark:border-white"
        href="/" >CLEAR</Link>
        {sortedCategories.map((category) => (
          <Link
            href={`/${category.slug}`}
            key={category.name}
            className={`w-fit pl-4 ${
              (currentCategory as string) === category.slug ? "text-violet-700" : "dark:text-gray-300 text-gray-900"
            } transition-all hover:text-violet-700`}
          >
            {category.name.toUpperCase()}
          </Link>
        ))}
      </nav>
      <menu className="flex flex-col gap-4 py-8 mx-8 sm:mx-12 sm:py-12 md:mx-16 md:py-16">
        <span className="text-base font-semibold dark:text-white">Tags</span>
          <section
          className="flex flex-col gap-4 justify-evenly"
          >
          <Checkbox label="Red" tags={tags} setTags={setTags} />
        <Checkbox label="Blue" tags={tags} setTags={setTags} />
        <Checkbox label="Green" tags={tags} setTags={setTags} />
        <Checkbox label="White" tags={tags} setTags={setTags} />
        <Checkbox label="Men" tags={tags} setTags={setTags} />
        <Checkbox label="Women" tags={tags} setTags={setTags} />
        <Checkbox label="New" tags={tags} setTags={setTags} />
          </section>
      </menu>
    </aside>
  );
}

export default Sidebar;
