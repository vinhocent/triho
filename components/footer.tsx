import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import ThemeSwitch from './themeSwitch'
import Link from 'next/link'


import { useRouter } from 'next/router';
import NextLink from 'next/link';
import styles from '../styles/Home.module.css'




const Footer = () => {


  
  

    const [fading, setFading] = useState(' opacity-0 ease-in ');
    const [faded, setFaded] = useState('  delay-700 duration-500 ')
  
    useEffect( () =>{
      setFading(' opacity-100  ease-in')
      setTimeout(() => {
         setFaded(' ') 
  
  
      }, 1100)
      // setFading(true);
  
  
    
      
    }, []);
  // useEffect only runs on the client, so now we can safely show the UI

  return (              
    <footer className= {'flex flex-col justify-center items-start max-w-2xl mx-auto w-full mb-8 ' + (faded) + (fading)}>

    <div className="max-w-2xl mx-auto w-full  justify-center h-5 border-b-1px border-black dark:border-white text-2xl text-center ">
        <span className="bg-amber-50 dark:bg-black px-5 position: relative -bottom-1.5">✵ ✵ ✵</span>
    </div>

    <div className="w-full max-w-2xl grid grid-cols-1 gap-4 pb-16 pt-8 sm:grid-cols-3">
      <div className="flex flex-col space-y-4">
        <Link
          href="/"
          className="text-gray-500 hover:text-gray-600 transition"
        >
          Home
        </Link>
        <Link
          href="/about"
          className="text-gray-500 hover:text-gray-600 transition"
        >
          About
        </Link>
        <Link
          href="/newsletter"
          className="text-gray-500 hover:text-gray-600 transition"
        >
          Newsletter
        </Link>
      </div>
      <div className="flex flex-col space-y-4">
  
      </div>
      <div className="flex flex-col space-y-4">
        <Link
          href="/uses"
          className="text-gray-500 hover:text-gray-600 transition"
        >
          Uses
        </Link>
        <Link
          href="/guestbook"
          className="text-gray-500 hover:text-gray-600 transition"
        >
          Guestbook
        </Link>
        <Link
          href="/snippets"
          className="text-gray-500 hover:text-gray-600 transition"
        >
          Snippets
        </Link>

      </div>
    </div>
  </footer>
  )
}

export default Footer
