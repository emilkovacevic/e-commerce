import React, { useEffect, useContext } from "react";

import Header from "@components/Header";

import { UserContext } from "@contexts/UserProvider";

import { useRouter } from "next/router";
import { ProductProps } from "@components/Product";
import axiosinstance from "src/axios/instance";

interface Props {
  products: ProductProps[];
}

function Profile({ products }: Props) {
  const router = useRouter();

  const { user, logOut } = useContext(UserContext);

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }
  }, [router, user]);

  return (
    <main className="flex flex-col items-center w-screen h-screen text-sm font-medium text-text bg-white dark:bg-slate-800">
      <Header products={products} />
      <main className="flex justify-center w-full h-full">
        <section className="flex flex-col w-1/3 gap-8 py-8 pr-8 h-fit">
          <header className="flex justify-between w-full">
            <div className="flex flex-col justify-between w-fit">
              <div>
                <h1 className="w-full text-2xl font-black text-left text-gray-700 dark:text-gray-300">{user?.name}</h1>
                <span
                className="text-gray-700 dark:text-gray-300"
                >email:{user?.email}</span>
              </div>
              <button
                onClick={logOut}
                className="p-4 text-gray-100 transition-colors w-fit rounded-xl bg-violet-700 hover:bg-violet-900 hover:text-white"
              >
                Log Out
              </button>
            </div>
            <img src={user?.imageUrl} alt={user?.name} width={150} className="rounded-full" />
          </header>
        </section>
        <aside className="flex flex-col w-1/3 h-full gap-8 py-8 pl-8">
          <header className="flex w-2/3">
            <h1 className="w-full text-2xl font-black text-left text-gray-700 dark:text-gray-300">Your Purchases</h1>
          </header>
          <ul>
            {user?.purchases && user.purchases.length > 1 ? (
              user.purchases.map((purchase) => (
                <li key={purchase.id}>
                  <p>{purchase.items.map((item) => item.name).join(", ")}</p>
                  <p>{purchase.purchasedAt.toLocaleDateString()}</p>
                  <p>${purchase.total}</p>
                </li>
              ))
            ) : (
              <span 
              className="text-gray-700 dark:text-gray-300"
              >You havent purchased anything yet.</span>
            )}
          </ul>
        </aside>
      </main>
    </main>
  );
}

export async function getServerSideProps() {
  const products = await axiosinstance.get("/api/products");

  return {
    props: {
      products: products.data,
    },
  };
}

export default Profile;
