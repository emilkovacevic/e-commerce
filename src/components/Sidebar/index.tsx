import React, { useState, useEffect, useContext } from "react";

import Checkbox from "@components/Checkbox";

import { useRouter } from "next/router";

import { ProductProps } from "@components/Product";
import Link from "next/link";
import ColorThemeSwitcher from "@components/Header/ColorThemeSwitcher";
import { UserContext } from "@contexts/UserProvider";

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
  const [scrollYPos, setScrollYPos] = useState(0)

  const currentCategory = router.query.category;
  const { user, isAuthenticated } = useContext(UserContext);
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
    const handleScroll = () => {
      setTimeout(() => {
        setScrollYPos(window.scrollY);
        window.addEventListener("scroll", handleScroll);
      }, 2000);
      window.removeEventListener("scroll", handleScroll);
    };
  
    window.addEventListener("scroll", handleScroll);
  
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  useEffect(() => {
    if (showSidebar) {
      document.body.style.overflowX = "hidden";
    } else {
      document.body.style.overflowX = "auto";
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
      style={showSidebar ? {marginTop: `${scrollYPos-1}px`} : undefined}
      className={`
      ${
        showSidebar ? `absolute translate-x-0 top-20` : "relative -translate-x-full"
      } dark:bg-gray-800 z-30 bg-gray-100 overflow-y-scroll md:relative min-h-full w-4/5 md:translate-x-0 flex flex-col  md:w-1/2 transition-all duration-300`}
    >
      <nav
      className="md:hidden flex flex-col  gap-4 mx-8 pt-4 sm:mx-16 sm:py-16 md:border-b-[1px] border-gray-300 overflow-hidden">
      <span className="text-base font-semibold dark:text-white">USER</span>
        <ul
          className="mx-2 text-lg dark:text-white"
        >
          {isAuthenticated ? 
          <>
                    <li
          className="p-2 my-2 uppercase text-md">
          <Link href='/user'>Profile</Link></li>
          </>  
          :
          <li
          className="p-2 my-2 uppercase text-md"
          ><Link href='/login'>Login</Link></li>
          }
          <li
          className="p-2 my-2 uppercase text-md"
          ><Link href='/wishlist'>Wishlist</Link></li>
          <li
          className="p-2 my-2 uppercase text-md"
          ><Link href='/cart'>Cart</Link></li>

          <li
          className="p-2 my-2 capitalize text-md"
          ><ColorThemeSwitcher /></li>
        </ul>
      </nav>
      <section
      className="flex flex-wrap justify-start"
      >
      <nav className="flex flex-re flex-col gap-4 mx-8 py-4 sm:mx-16 sm:py-16 md:border-b-[1px] border-gray-300 overflow-hidden">
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
      <menu className="flex flex-col gap-4 py-4 mx-8 sm:mx-12 sm:py-12 md:mx-16 md:py-16">
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
      </section>
    </aside>
  );
}

export default Sidebar;
