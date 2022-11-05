import '../styles/globals.css'
import { useState } from "react"
import type { AppProps } from 'next/app'
import { useTheme , ThemeProvider } from 'next-themes'


import Page from '../components/page'



export default function App({ Component, pageProps }: AppProps) {



  return (
  <ThemeProvider enableSystem={true} attribute="class">
      <Component {...pageProps} />
  </ThemeProvider>
  )
}