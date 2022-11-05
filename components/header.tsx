import { useState, useEffect , useRef} from 'react'
import { useTheme } from 'next-themes'
import ThemeSwitch from './themeSwitch'
import Link from 'next/link'


import { useRouter } from 'next/router';
import NextLink from 'next/link';


function NavItem({  href, text }: {href: string, text:string}) {
  const router = useRouter();
  const isActive = router.asPath === href;

  return (
    <NextLink
      href={href}
      className={
        'hidden md:inline-block p-1 sm:px-3 sm:py-2 rounded-lg hover:bg-amber-100 dark:hover:bg-gray-800 transition-all'
    }
    >
      <span className="capsize">{text}</span>
    </NextLink>
  );
}




const Header = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

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
    <div className= {'flex flex-col justify-center px-8 ' + (faded) + (fading) }>
        {/* // <div className= {'flex flex-col justify-center px-8 ' + (faded)+ (fading ? 'opacity-100 ease-in ' : 'opacity-0 ease-in ' )}> */}
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
