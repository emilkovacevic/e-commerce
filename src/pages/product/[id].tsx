import { useContext } from "react";

import { CartContext } from "@contexts/CartProvider";

import Header from "@components/Header";

import { ProductProps } from "@components/Product";
import axiosinstance from "src/axios/instance";
import Checkbox from "@components/Checkbox";

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
      <main className="flex w-2/3 gap-8 ">
        <section className="max-w-[450px] h-full">
            <img
            className="object-fill"
            src={product.imageUrl} alt={product.name} title={product.name} />
        </section>
        <aside className="flex flex-col w-1/3 justify-between">
          <div
          className="flex flex-col justify-between pt-4 h-full"
          >
          <span className="text-sm text-gray-700 dark:text-white font-normal">{product.description}</span>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod reiciendis non dolores harum vitae unde odio repellendus. Corrupti eos dolorem, et asperiores officia provident laboriosam nihil aliquam commodi tempora error!</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum deleniti quaerat praesentium sed voluptatum natus enim doloribus at a beatae magni officiis eum earum, dolores minus explicabo, eveniet quibusdam in.</p>
          <div className="flex my-4 md:mt-0 flex-row flex-wrap w-full items-center gap-4">
            <span className="text-2xl font-black text-gray-700 dark:text-white">${handlePrice(product.price)}</span>
            <button
              onClick={() => addToCart(product)}
              className="p-4 rounded-xl bg-violet-700 text-gray-100 transition-colors hover:bg-violet-900 hover:text-white"
            >
              Add to Cart
            </button>
          </div>
          </div>
        </aside>
      </main>
      <footer 
      className="w-2/3"
      >
        <h2>Fullstack demo website</h2>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam eveniet repudiandae vero nobis aliquam et nemo eligendi suscipit! Error porro minus repellendus architecto quo reiciendis itaque cum commodi exercitationem inventore.</p>
      </footer>
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
