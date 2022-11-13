import "../styles/globals.scss";
import { useState, useEffect } from "react";
import type { AppProps } from "next/app";
import { useTheme, ThemeProvider } from "next-themes";

import Header from "../components/header";
import Footer from "../components/footer";

export default function App({ Component, pageProps }: AppProps) {
  const { theme, setTheme } = useTheme();
  const themeCheck = () => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  useEffect(() => {
    themeCheck();
  }, []);
  return (
    <ThemeProvider enableSystem={true} attribute="class">
      <Header />
      <Component {...pageProps} />
      <Footer />
    </ThemeProvider>
  );
}
