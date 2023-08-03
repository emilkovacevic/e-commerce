import { useContext } from "react";
import { CartContext } from "@contexts/CartProvider";
import Header from "@components/Header";
import { ProductProps } from "@components/Product";
import axiosinstance from "src/axios/instance";
import Image from "next/image";
import SizeSelector from "@components/SizeSelector/SizeSelector";
import { useRouter } from "next/router";

interface Props {
  product: ProductProps;
  products: ProductProps[];
}

function Product({ product, products }: Props) {
  const { addToCart } = useContext(CartContext);
  const router = useRouter()
  const handlePrice = (price: number) => {
    return price.toFixed(2);
  };

  return (
    <div className="flex flex-col items-center min-h-screen gap-8 pb-16 text-sm font-medium ">
      <Header products={products}>
      <button
      onClick={()=> router.back()}
      title="back"
      className="px-4 border dark:text-white text-slate-900 hover:bg-slate-400"
      >&lt;-</button>
      </Header>
      <header className="flex px-4 md:w-2/3">
        <h1 className="w-full text-2xl font-black text-center text-gray-700 md:text-left dark:text-white">{product.name}</h1>
      </header>
      <main className="flex flex-col gap-8 mx-auto md:px-4 md:flex-row md:w-2/3 ">
        <section className="h-full my-4">
            <Image
            className="object-fill border"
            width={800}
            height={1024}
            src={product.imageUrl} alt={product.name} title={product.name} />
        </section>
        <aside className="flex flex-col justify-between text-gray-700 dark:text-white">
          <div
          className="flex flex-col justify-between h-full pt-4"
          >
          <section>
          <p className="text-sm font-normal">{product.description}</p>
          <br />
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod reiciendis non dolores harum vitae unde odio repellendus. Corrupti eos dolorem, et asperiores officia provident laboriosam nihil aliquam commodi tempora error!</p>
          <br />
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum deleniti quaerat praesentium sed voluptatum natus enim doloribus at a beatae magni officiis eum earum, dolores minus explicabo, eveniet quibusdam in.</p>
          </section>
          <br />
          <SizeSelector />
          <div className="flex flex-row flex-wrap items-center justify-center w-full gap-4 mt-8 md:justify-start md:mt-10">
            <span className="text-2xl font-black text-gray-700 dark:text-white">${handlePrice(product.price)}</span>
            <button
              onClick={() => addToCart(product)}
              className="px-4 py-2 text-gray-100 transition-colors rounded-md bg-violet-700 hover:bg-violet-900 hover:text-white"
            >
              Add to Cart
            </button>
          </div>
          </div>
        </aside>
      </main>
      <footer 
      className="px-4 text-justify text-gray-700 md:w-2/3 dark:text-white"
      >
        <h2
        className="my-8 text-xl"
        >Fullstack demo website made with <a 
        className="underline"
        href="https://nextjs.org/" target="_blank" rel="noopener noreferrer">NextJS</a></h2>
        <p>Thank you for visiting! Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure reiciendis, nisi assumenda sint cum maxime iusto voluptate tenetur sed quas rerum distinctio fugiat consequuntur voluptatibus nulla alias ratione. Ad, delectus?</p>
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
