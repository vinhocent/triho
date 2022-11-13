import "../styles/globals.scss";
import { useState } from "react";
import type { AppProps } from "next/app";
import { useTheme, ThemeProvider } from "next-themes";

import Header from "../components/header";
import Footer from "../components/footer";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider enableSystem={true} attribute="class">
      <Header />
      <Component {...pageProps} />
      <Footer />
    </ThemeProvider>
  );
}
