import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@heroicons/react/solid";

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // check and reset theme
  const themeCheck = () => {
    if (
      localStorage.theme === "light" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: light)").matches)
    ) {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    themeCheck();
    setMounted(true);
  }, [theme]);

  // check theme on component mount
  useEffect(() => {
    themeCheck();
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const renderLogo = () => {
    if (theme === "dark") {
      return <SunIcon className="w-5 h-5" />;
    } else {
      return <MoonIcon className="w-5 h-5" />;
    }
  };

  return (
    <button
      aria-label="Toggle Dark Mode"
      type="button"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className=" w-9 h-9 bg-amber-100 rounded-lg dark:bg-gray-600 flex items-center justify-center  hover:ring-2 ring-gray-300  transition-all"
    >
      {renderLogo()}
    </button>
  );
};

export default ThemeSwitch;
