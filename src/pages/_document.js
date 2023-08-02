import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head >
      <meta name="description" content="A NextJS + Typecript E-Commerce Project." />
      <link
        rel="shortcut icon"
        href="https://raw.githubusercontent.com/antoniopataro/e-commerce/main/public/favicon.png"
      />
      </Head>
      <body
      className="relative bg-white dark:bg-slate-900"
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
