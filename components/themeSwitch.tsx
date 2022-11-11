import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import {MoonIcon, SunIcon} from '@heroicons/react/solid'


const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setTheme('light')
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }


  const renderLogo = () => {
    if (theme === 'dark'){
      return(
        <SunIcon 
        className = "w-5 h-5"          
            
        onClick={() =>
          setTheme(theme === 'dark' ? 'light' : 'dark')}
          />
  
      )
    } else {
      return(
        <MoonIcon   
        className = "w-5 h-5"          
        onClick={() =>
          setTheme(theme === 'dark' ? 'light' : 'dark')}
          />
      )


    }

  }


  return (
         <button
            aria-label="Toggle Dark Mode"
            type="button"
            className=" w-9 h-9 bg-amber-100 rounded-lg dark:bg-gray-600 flex items-center justify-center  hover:ring-2 ring-gray-300  transition-all" >
              {renderLogo()}

            </button>

     
      
  )
}

export default ThemeSwitch;