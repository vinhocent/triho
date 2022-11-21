import Head, { defaultHead } from "next/head";
import Image from "next/image";
import { useTheme } from "next-themes";
import styles from "../styles/Home.module.css";
import css from "../styles/Home.module.css";
import { useState, useEffect, useRef, useMemo } from "react";
import type { NextPage } from "next";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRouter } from "next/router";

// props type

const Other: NextPage = () => {
  const [fading, setFading] = useState(" opacity-0 ease-in ");
  const [heading, setHeading] = useState("tr1e_");
  const [subheading, setSubHeading] = useState("digital warlord @f0r3st");

  useEffect(() => {
    setFading(" opacity-100 ease-in ");

    if (window.location.hostname.toString() == "www.triho.dev") {
      setHeading("Tri Ho");
      setSubHeading("CS Student @ UWaterloo");
    }
  }, []);

  return (
    <div className="px-8">
      <Head>
        <title>{heading}</title>
        <meta name="robots" content="follow, index" />
        <meta content={subheading} name="description" />
        <meta property="og:site_name" content={heading} />
        <meta property="og:description" content={subheading} />
        <meta property="og:title" content={heading} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@vinhocent" />
        <meta name="twitter:title" content={heading} />
        <meta name="twitter:description" content={subheading} />
        <link rel="shortcut icon" href="/tr1e.svg" />
      </Head>
      <div className="flex flex-col justify-center items-start max-w-2xl border-gray-200 dark:border-gray-700 mx-auto pb-12">
        <div className={"w-full max-w-2xl  "}>
          <p
            className={
              "text-gray-600 font-semibold text-xl dark:text-gray-400 break-all mb-6 transition-opacity duration-600   delay-700 " +
              fading
            }
          >
            {"Uses"}
          </p>
          <div className="flex flex-col  gap-y-8">
            <div className="   items-center flex-col">
              <ul
                className={
                  "flex flex-row justify-items-start items-center mb-4 transition-opacity duration-600" +
                  fading
                }
              >
                <div className="w-5/12">
                  <div className="dark:text-white text-gray-800 ">
                    KBDFANS D65
                  </div>
                  <span className="dark:text-gray-400  text-gray-600 text-sm ">
                    Gateron Black Inks + EPBT Kuro Shiro
                  </span>
                </div>
                <span className=" grow opacity-0 md:opacity-100 w-full border-t dark:border-gray-500 mx-4 mb-4 self-end border-dashed shrink border-gray-400"></span>
              </ul>
              <ul
                className={
                  "flex flex-row justify-items-start items-center mb-4 transition-opacity duration-600" +
                  fading
                }
              >
                <div className="w-5/12">
                  <div className="dark:text-white text-gray-800 ">
                    Logitech GPRO Wireless
                  </div>
                  <span className="dark:text-gray-400 whitespace-nowrap text-gray-600 text-sm ">
                    + Esports Tiger Ice Feet
                  </span>
                </div>
                <span className=" grow opacity-0 md:opacity-100 w-full border-t dark:border-gray-500 mx-4 mb-4 self-end border-dashed shrink border-gray-400"></span>
              </ul>
              <ul
                className={"list-none transition-opacity duration-600" + fading}
              >
                <span className=" flex  w-full border-t opacity-60 dark:border-gray-500 my-6 self-end shrink border-gray-400"></span>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Other;
