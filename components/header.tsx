import { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import ThemeSwitch from "./themeSwitch";
import Link from "next/link";

import { useRouter } from "next/router";
import NextLink from "next/link";

const tabsData = [
  {
    label: "about",
    href: "/",
    left: -10,
    width: 70,
  },
  {
    label: "writing",
    href: "/writing",
    left: 65,
    width: 85,
  },
  {
    label: "pictures",
    href: "/pictures",
    left: 155,
    width: 100,
  },
  {
    label: "resume",
    href: "TriHo_Resume.pdf",
    left: 255,
    width: 80,
  },
];
//  href='TriHo_Resume.pdf' target="_blank" rel="noreferrer"
const Header = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  const [fading, setFading] = useState(" opacity-0 ease-in ");
  const [faded, setFaded] = useState("  delay-1000 duration-900 ");
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [tabUnderlineWidth, setTabUnderlineWidth] = useState<any | null>(null);
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState<any | null>(null);
  const [opac, setOpac] = useState(" opacity-0 ");

  const tabsRef = useRef([]);
  useEffect(() => {
    setFading(" opacity-100  ease-in");
    setTimeout(() => {
      setFaded(" ");
    }, 1100);
  }, []);

  function setTabPosition(idx: number) {
    setTabUnderlineLeft(tabsData[idx].left);
    setTabUnderlineWidth(tabsData[idx].width);
    setOpac(" opacity-100 ");
  }
  function setTabPosition2(idx: number) {
    setOpac(" opacity-0 ");
  }

  // useEffect only runs on the client, so now we can safely show the UI

  return (
    <div
      className={"w-full flex flex-col justify-center px-8 " + faded + fading}
    >
      {/* // <div className= {'flex flex-col justify-center px-8 ' + (faded)+ (fading ? 'opacity-100 ease-in ' : 'opacity-0 ease-in ' )}> */}
      <nav className="flex items-center justify-between w-full relative max-w-2xl border-gray-200 dark:border-gray-700 mx-auto pt-8 pb-8 sm:pb-16 ">
        <div className="ml-[-0.60rem]">
          {tabsData.map((tab, idx) => {
            return (
              <NextLink
                href={tab.href}
                key={idx}
                className={
                  "hidden md:inline-block p-1 sm:px-3 sm:py-2 z-20 rounded-lg  transition-all text-gray-600 dark:text-gray-400 dark:hover:text-white hover:text-black ease-in-out"
                }
                // hover:bg-amber-100 dark:hover:bg-gray-800
                onMouseEnter={() => setTabPosition(idx)}
                onMouseLeave={() => setTabPosition2(idx)}
              >
                {tab.label}
              </NextLink>
            );
          })}
          <span
            className={
              "absolute top-70 block h-10 -z-10 md:inline-block p-1 sm:px-3 sm:py-2 rounded  bg-amber-100 dark:bg-gray-800 transition-all duration-300" +
              opac
            }
            style={{ left: tabUnderlineLeft, width: tabUnderlineWidth }}
          />
        </div>
        <ThemeSwitch />
      </nav>
    </div>
  );
};

export default Header;
