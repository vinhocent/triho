import '../styles/globals.css'
import { useState } from "react"
import type { AppProps } from 'next/app'
import { useTheme , ThemeProvider } from 'next-themes'

import { lightTheme, darkTheme, GlobalStyles } from "../ThemeConfig"

import ThemeSwitch from '../components/themeSwitch'


export default function App({ Component, pageProps }: AppProps) {



  return (
  <ThemeProvider forcedTheme={Component.theme || undefined} attribute="class">
        <div className="flex flex-col justify-center px-8">
        <nav className="flex items-center justify-between w-full relative max-w-2xl border-gray-200 dark:border-gray-700 mx-auto pt-8 pb-8 sm:pb-16 ">
          <div className="ml-[-0.60rem]">
              <div className='hidden md:inline-block p-1 sm:px-3 sm:py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-all'>
                <span className="capsize">PlaceHolder</span>
              </div>
              <div className='hidden md:inline-block p-1 sm:px-3 sm:py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-all'>
                <span className="capsize">PlaceHolder</span>
              </div>
              <div className='hidden md:inline-block p-1 sm:px-3 sm:py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-all'>
                <span className="capsize">PlaceHolder</span>
              </div>
              <div className='hidden md:inline-block p-1 sm:px-3 sm:py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-all'>
                <span className="capsize">PlaceHolder</span>
              </div>
              <div className='hidden md:inline-block p-1 sm:px-3 sm:py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-all'>
                <span className="capsize">PlaceHolder</span>
              </div>
          </div>
          <ThemeSwitch/>

        </nav>
      </div>
    </ThemeProvider>
  )
}