import { useContext } from "react";

import { CartContext } from "@contexts/CartProvider";

import Header from "@components/Header";

import { ProductProps } from "@components/Product";
import axiosinstance from "src/axios/instance";

interface Props {
  product: ProductProps;
  products: ProductProps[];
}

function Product({ product, products }: Props) {
  const { addToCart } = useContext(CartContext);

  const handlePrice = (price: number) => {
    return price.toFixed(2);
  };

  return (
    <div className="flex flex-col w-screen min-h-screen items-center gap-8 pb-16 font-medium text-sm text-text">
      <Header products={products} />
      <header className="flex w-2/3">
        <h1 className="w-full text-left font-black text-2xl text-gray-700 dark:text-white">{product.name}</h1>
      </header>
      <main className="flex w-2/3 h-fit justify-center gap-8 bg-slate-300 py-10 dark:bg-slate-700">
        <section className="flex flex-col w-1/3 h-fit">
          <span className="flex items-center justify-center aspect-square">
            <img src={product.imageUrl} alt={product.name} title={product.name} />
          </span>
        </section>
        <aside className="flex flex-col w-1/3 justify-between">
          <span className="text-sm text-gray-700 dark:text-white font-normal">{product.description}</span>
          <div className="flex my-4 md:mt-0 flex-row flex-wrap w-full items-center gap-4">
            <span className="text-2xl font-black text-gray-700 dark:text-white">${handlePrice(product.price)}</span>
            <button
              onClick={() => addToCart(product)}
              className="p-4 rounded-xl bg-violet-700 text-gray-100 transition-colors hover:bg-violet-900 hover:text-white"
            >
              Add to Cart
            </button>
          </div>
        </aside>
      </main>
    </div>
  );
}

export default Product;

export async function getServerSideProps(context: any) {
  const product = await axiosinstance.get(`/api/products/${context.params.id}`);
  const products = await axiosinstance.get("/api/products");

  return {
    props: {
      product: product.data,
      products: products.data,
    },
  };
}
