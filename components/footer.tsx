import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import ThemeSwitch from "./themeSwitch";
import Link from "next/link";

import { useRouter } from "next/router";
import NextLink from "next/link";
import styles from "../styles/Home.module.css";
import NowPlaying from "./nowPlaying";

const Footer = () => {
  const [fading, setFading] = useState(" opacity-0 ease-in ");
  const [faded, setFaded] = useState("  delay-1000 duration-900 ");
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setFading(" opacity-100  ease-in");
    setTimeout(() => {
      setFaded(" ");
    }, 1100);
    setMounted(true);
  }, []);
  // useEffect only runs on the client, so now we can safely show the UI

  return (
    <footer className={"flex flex-col justify-center px-8 " + faded + fading}>
      <div className="max-w-2xl mx-auto w-full  justify-center h-5 border-b-1px border-gray-400 dark:border-gray-500 text-2xl text-center ">
      <span className="dark:text-gray-400  bg-amber-50 dark:bg-black px-5 position: relative -bottom-1.5 transition-colors duration-200 inline-flex items-center gap-2">
      <Link href="https://cs.uwatering.com/#www.triho.dev?nav=prev"><span className="inline-block rotate-180 relative top-[1px]">➢</span></Link>
        <Link href='https://cs.uwatering.com/#www.triho.dev' target='_blank'>
            <img
                src={mounted ? `https://cs.uwatering.com/icon.${theme === 'light' ? 'black' : 'white'}.svg` : 'https://cs.uwatering.com/icon.white.svg'}
                alt='CS Webring'
                style={{ width: '24px', height: 'auto', opacity: 0.8 }}
            />
        </Link>
        <Link href="https://cs.uwatering.com/#www.triho.dev?nav=next" className="inline-block  relative right-2">➢</Link>

        </span>
 
      </div>

      <div className="max-w-2xl mx-auto w-full    pt-8 ">
        <NowPlaying />
      </div>


      <div className="max-w-2xl mx-auto w-full  grid grid-cols-1 gap-4 pb-16 pt-8 sm:grid-cols-3 ">
        <div className="flex flex-col space-y-4">
          <Link
            href="/"
            className="text-gray-500 hover:text-gray-700 transition"
          >
            About
          </Link>
          <Link
            href="/writing"
            className="text-gray-500 hover:text-gray-700 transition"
          >
            Writing
          </Link>
          <Link
            href="/pictures"
            className="text-gray-500 hover:text-gray-700 transition"
          >
            Pictures
          </Link>
        </div>
        <div className="flex flex-col space-y-4"></div>
        <div className="flex flex-col space-y-4">
          <a
            className="text-gray-500 hover:text-gray-700 transition"
            href="https://www.Github.com/vinhocent"
            target="_blank"
            rel="noreferrer noopener "
          >
            Github
          </a>
          <a
            className="text-gray-500 hover:text-gray-700 transition"
            href="https://www.twitter.com/vinhocent"
            target="_blank"
            rel="noreferrer noopener "
          >
            Twitter
          </a>
          <a
            className="text-gray-500 hover:text-gray-700 transition"
            href="https://www.linkedin.com/in/tri-ho/"
            target="_blank"
            rel="noreferrer noopener "
          >
            Linkedin
          </a>
        </div>
        
      </div>

    </footer>
  );
};

export default Footer;
