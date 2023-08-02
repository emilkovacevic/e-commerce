import "@styles/globals.css";
import type { AppProps } from "next/app";
import ContextProvider from "@contexts/ContextProvider";
import Toaster from "@components/Toaster/Toaster";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ContextProvider>
      <Toaster />
      <Component {...pageProps} />
    </ContextProvider>
  );
}

export default MyApp;
