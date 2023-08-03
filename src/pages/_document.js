import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head >
      <meta name="description" content="A NextJS + Typecript E-Commerce Project." />
      <link
        rel="icon"
        href="/favicon.ico"
      />
      </Head>
      <body
      className="bg-white dark:bg-slate-900"
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
