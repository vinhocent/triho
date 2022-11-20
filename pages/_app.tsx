import "../styles/globals.scss";
import { useState } from "react";
import type { AppProps } from "next/app";
import { useTheme, ThemeProvider } from "next-themes";

import Header from "../components/header";
import Footer from "../components/footer";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider enableSystem={true} attribute="class">
      <Header />
      <Head>
        <style>
          @import
          url(&apos;https://fonts.googleapis.com/css2?family=IBM+Plex+Mono&display=swap&apos;);
        </style>
      </Head>
      <Component {...pageProps} />

      <Footer />
    </ThemeProvider>
  );
}
