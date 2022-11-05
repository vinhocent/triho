import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
         <button
            aria-label="Toggle Dark Mode"
            type="button"
            className=" w-9 h-9 bg-amber-100 rounded-lg dark:bg-gray-600 flex items-center justify-center  hover:ring-2 ring-gray-300  transition-all"
            onClick={() =>
              setTheme(theme === 'dark' ? 'light' : 'dark')
            }
          ></button>
  )
}

export default ThemeSwitch