import React, { useContext, useRef, useState } from "react";

import Header from "@components/Header";

import { CartContext, CartProps } from "@contexts/CartProvider";
import { UserContext } from "@contexts/UserProvider";

import { useRouter } from "next/router";
import { ProductProps } from "@components/Product";
import axiosinstance from "src/axios/instance";
import Image from "next/image";
import { toast } from "react-toastify";

interface Props {
  products: ProductProps[];
}

function Cart({ products }: Props) {
  const router = useRouter();

  const { isAuthenticated } = useContext(UserContext);
  const { cart, addToCart, removeFromCart, removeMultipleProductsFromCart } =
    useContext(CartContext);

  const handlePrice = (price: number) => {
    return price.toFixed(2);
  };

  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);

  const [cartError, setCartError] = useState(false);
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [countryError, setCountryError] = useState(false);
  const [addressError, setAddressError] = useState(false);

  const validateInputs = (
    firstName?: string,
    lastName?: string,
    country?: string,
    address?: string,
    products?: CartProps[]
  ) => {
    if (products?.length === 0) {
      toast.error('cart is empty, pleas add items in the cart.')
      return "ERROR: There are no products in cart";
    }

    if (!firstName || firstName.split(" ").length > 1) {
      toast.error('You must enter a first name.')
      return "ERROR: You must enter a single first name";
    }

    if (!lastName || lastName.split(" ").length > 1) {
      toast.error('You must enter a last name.')
      return "ERROR: You must enter a single last name";
    }

    if (!country) {
      toast.error('You must enter a country.')
      return "ERROR: You must enter a country";
    }

    if (!address) {
      toast.error('You must enter an address.')
      return "ERROR: You must enter a address";
    }

    return { user: { firstName, lastName, country, address }, products };
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) return router.push("/login");

    const firstName = firstNameRef.current?.value;
    const lastName = lastNameRef.current?.value;
    const country = countryRef.current?.value;
    const address = addressRef.current?.value;
    const products = cart;

    const response = validateInputs(
      firstName,
      lastName,
      country,
      address,
      products
    );

    response === "ERROR: There are no products in cart"
      ? setCartError(true)
      : setCartError(false);
    response === "ERROR: You must enter a single first name"
      ? setFirstNameError(true)
      : setFirstNameError(false);
    response === "ERROR: You must enter a single last name"
      ? setLastNameError(true)
      : setLastNameError(false);
    response === "ERROR: You must enter a country"
      ? setCountryError(true)
      : setCountryError(false);
    response === "ERROR: You must enter a address"
      ? setAddressError(true)
      : setAddressError(false);

    if (typeof response === "string") return;

    console.log(response);
    alert("Purchase not available | Demo website" + `\nPayload: ${JSON.stringify(response)}`);
  };

  const total = cart.reduce((acc, curr) => acc + curr.total, 0);
  const formattedTotal = handlePrice(total);

  return (
    <div className="min-h-screen text-sm font-medium text-black bg-white dark:text-white dark:bg-slate-800">
      <Header products={products} />
      <main
      className="py-16 mx-4"
      >
        <section className="py-8 mx-auto md:w-2/3 ">
          <header className="flex ">
            <h1 className="w-full mb-2 text-2xl font-black text-left text-gray-700 dark:text-white">
              Information
            </h1>
          </header>
          <form
            id="information"
            className="flex flex-col w-full gap-4 text-sm font-medium "
            noValidate
            onSubmit={handleCheckout}
          >
            <div className="flex gap-4">
              <div className="flex flex-col w-full">
                <label
                  htmlFor="first-name"
                  className={`pb-2 ${firstNameError ? "text-red-500" : ""}`}
                >
                  First Name
                </label>
                <input
                  ref={firstNameRef}
                  autoComplete="name"
                  type="text"
                  id="first-name"
                  className={`w-full px-4 py-2 ring-1 ${
                    firstNameError ? "ring-red-500" : "ring-gray-300"
                  } dark:bg-slate-600 bg-white outline-none rounded bg-transparent font-normal transition-all focus:ring-violet-700`}
                />
              </div>
              <div className="flex flex-col w-full">
                <label
                  htmlFor="last-name"
                  className={`pb-2 ${lastNameError ? "text-red-500" : ""}`}
                >
                  Last Name
                </label>
                <input
                  ref={lastNameRef}
                  autoComplete="name"
                  type="text"
                  id="last-name"
                  className={`w-full px-4 py-2 ring-1 ${
                    lastNameError ? "ring-red-500" : "ring-gray-300"
                  } dark:bg-slate-600 bg-white outline-none rounded bg-transparent font-normal transition-all focus:ring-violet-700`}
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex flex-col w-1/2">
                <label
                  htmlFor="country"
                  className={`pb-2 ${countryError ? "text-red-500" : ""}`}
                >
                  Country
                </label>
                <input
                  ref={countryRef}
                  autoComplete="country"
                  type="country"
                  id="country"
                  className={`w-full px-4 py-2 ring-1 ${
                    countryError ? "ring-red-500" : "ring-gray-300"
                  } dark:bg-slate-600 bg-white outline-none rounded bg-transparent font-normal transition-all focus:ring-violet-700`}
                />
              </div>
              <div className="flex flex-col w-full">
                <label
                  htmlFor="address"
                  className={`pb-2 ${addressError ? "text-red-500" : ""}`}
                >
                  Address
                </label>
                <input
                  ref={addressRef}
                  autoComplete="address"
                  type="address"
                  id="address"
                  className={`w-full px-4 py-2 ring-1 ${
                    addressError ? "ring-red-500" : "ring-gray-300"
                  } dark:bg-slate-600 bg-white outline-none rounded bg-transparent font-normal transition-all focus:ring-violet-700`}
                />
              </div>
            </div>
          </form>
        </section>
        <aside className="mx-auto md:w-2/3">
          <header>
            <h2 className="mb-2 text-2xl font-black text-gray-700 dark:text-white">
              Your Cart
            </h2>
          </header>
          <div className="flex flex-col gap-8 ">
            {cart.map((product, index) => (
              <div key={index} className="flex flex-row ">
                <div className="w-1/3">
                  <Image
                    width={450}
                    height={450}
                    className="object-cover w-full h-full max-h-[250px] rounded-lg shadow-md"
                    src={product.imageUrl}
                    alt={product.name}
                  />
                </div>
                <div className="relative flex flex-col justify-between p-4 ml-4 bg-gray-100 rounded-lg shadow-md dark:bg-slate-600 dark:text-white md:w-2/3">
                <h2 className="text-base md:text-xl">{product.name}</h2> 
                <p>Type: 
                  {
                product.categoryName === 'shirts' ?
                  product.categoryName.slice(0, -1)
                :  product.categoryName
                }
                </p>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex">
                    <h3
                    className="text-lg"
                    >Quantity:</h3>
                    <button
                      onClick={() => addToCart(product)}
                      className="p-2 ml-4 bg-gray-300 dark:bg-slate-900 "
                    >
                      +
                    </button>
                    <span className="py-2 mx-4">{product.quantity}</span>
                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="p-2 bg-gray-300 dark:bg-slate-900"
                    >
                      -
                    </button>
                    </div>
                    <button
                    onClick={() => removeMultipleProductsFromCart(product.id)}
                    className="p-4 ml-8 font-semibold text-red-700 bg-gray-300 hover:bg-red-500/50 dark:hover:bg-red-800/50 dark:bg-slate-800"
                  >
                   Remove item
                  </button>
                  </div>
                  <h2 className="absolute text-lg font-semibold top-5 right-5">
                    ${handlePrice(product.price)}
                  </h2>
                </div>
              </div>
            ))}
            {cart.length === 0 && (
              <div
                className={`flex justify-center my-8 ${
                  cartError ? "text-red-500" : ""
                }`}
              >
                <span>There are no items in your cart.&nbsp;</span>
                <button
                  onClick={() => router.push("/")}
                  className="underline transition-colors text-violet-700 hover:text-violet-900"
                >
                  Go shopping.
                </button>
              </div>
            )}
          </div>
          <div className="flex justify-end w-full mt-8 text-xl font-extrabold md:text-2xl">
            Total:&nbsp;<span className="font-bold">${formattedTotal}</span>
          </div>
          <div className="flex justify-end w-full gap-4 pt-4">
            <button
              onClick={() => router.push("/")}
              type="button"
              className="px-4 py-2 transition-colors hover:text-violet-700"
            >
              Continue Buying
            </button>
            <button
              form="information"
              type="submit"
              className="px-4 py-2 text-white rounded bg-violet-700"
            >
              Checkout
            </button>
          </div>
        </aside>
      </main>
    </div>
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

export default Cart;
