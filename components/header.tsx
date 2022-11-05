import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import ThemeSwitch from './themeSwitch'
import Link from 'next/link'


import { useRouter } from 'next/router';
import NextLink from 'next/link';


function NavItem({  href, text }) {
  const router = useRouter();
  const isActive = router.asPath === href;

  return (
    <NextLink
      href={href}
      className={
        'hidden md:inline-block p-1 sm:px-3 sm:py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-all'
    }
    >
      <span className="capsize">{text}</span>
    </NextLink>
  );
}

const Header = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // useEffect only runs on the client, so now we can safely show the UI

  return (              
        <div className="flex flex-col justify-center px-8">
        <nav className="flex items-center justify-between w-full relative max-w-2xl border-gray-200 dark:border-gray-700 mx-auto pt-8 pb-8 sm:pb-16 ">
        <div className="ml-[-0.60rem]">
            <NavItem href="/" text = "about"/>
            <NavItem href="/blog" text = "blog"/>
            <NavItem href="/" text = "code"/>
            <NavItem href="/" text = "photo"/>
            <NavItem href="/" text = "anime"/>

        </div>
        <ThemeSwitch/>

        </nav>
        </div>
  )
}

export default Header
