import '../styles/globals.css'
import { useState } from "react"
import type { AppProps } from 'next/app'
import {ThemeProvider} from "styled-components"
import { lightTheme, darkTheme, GlobalStyles } from "../ThemeConfig"


export default function App({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState("light")

  const toggleTheme = () => {
    theme == 'light' ? setTheme('dark') : setTheme('light')

  }


  return (
    <ThemeProvider theme={theme == 'light' ? lightTheme : darkTheme}>
      <GlobalStyles/>
      <button onClick={toggleTheme}> Switch </button>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}