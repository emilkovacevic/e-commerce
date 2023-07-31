import { Html, Head, Main, NextScript } from "next/document";
import Toaster from '../components/Toaster/Toaster'
export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <title>E-Commerce</title>
      <meta name="description" content="A NextJS + Typecript E-Commerce Project." />
      <link
        rel="shortcut icon"
        href="https://raw.githubusercontent.com/antoniopataro/e-commerce/main/public/favicon.png"
      />
      <body
      className="bg-slate-200 dark:bg-slate-900"
      >
        <Toaster />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
