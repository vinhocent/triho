import Head, { defaultHead } from "next/head";
import Image from "next/image";
import { useTheme } from "next-themes";
import styles from "../styles/Home.module.css";
import css from "../styles/Home.module.css";
import { useState, useEffect, useRef, useMemo } from "react";
import type { NextPage } from "next";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRouter } from "next/router";
import { OrbitControls, SpotLight, useCursor } from "@react-three/drei";
import TorusKnot from "../components/torusKnot";
import { AsciiRenderer } from '@react-three/drei'
import { HemisphereLight } from "three";
import Link from "next/link";
// props type

const Home: NextPage = () => {
  const { theme, resolvedTheme } = useTheme();
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
        <div className="flex flex-col-reverse sm:flex-row items-start ">
          <div className="flex flex-col pr-8">
            <h1
              className={
                "font-bold text-3xl md:text-5xl tracking-tight mb-1 text-black dark:text-white transition-opacity duration-600 " +
                fading
              }
            >
              {heading}
            </h1>
            <h2
              className={
                "text-gray-700 dark:text-gray-200 mb-4 mt-2 transition-opacity duration-600  delay-600 " +
                fading
              }
            >
              {subheading}
              <span className="mx-2 text-xs md:inline-block p-1 rounded text-gray-500 dark:text-gray-400 bg-amber-100 dark:bg-gray-900 transition-colors duration-200">
                he/they
              </span>
            </h2>
            <p
              className={
                "text-gray-600 dark:text-gray-400 mb-2 break-normal transition-opacity duration-600   delay-700 " +
                fading
              }
            >
              {
                "It's pronounced 'tree'! I am a software engineer. Have a look around."
              }
            </p>
            <p
              className={
                "text-gray-600 dark:text-gray-400 mb-12 break-normal transition-opacity duration-600 delay-700 " +
                fading
              }
            >
              {"I'm currently interested in programming languages, human languages, r/floorliving, and zine-making "}

  
              </p>
          </div>
          <div className={"duration-800  delay-800 " + fading}>
            <Image
              alt="me in blue pixels"
              height={300}
              width={500}
              src="/mealt.png"
              priority
              className="dark:inline hidden "
            />
            <Image
              alt="me in red pixels"
              height={300}
              width={500}
              src="/me.png"
              priority
              className="dark:hidden"
            />
          </div>
        </div>
        <div className={"w-full max-w-2xl  "}>
          <p
            className={
              "text-gray-600 font-semibold text-xl dark:text-gray-400 break-all mb-6 transition-opacity duration-600   delay-700 " +
              fading
            }
          >
            {"Where I've Been"}
          </p>
          <div className="flex flex-col  gap-y-8">
            <div id={"blogs"} className="   items-center flex-col">

            <ul
                className={
                  "flex flex-row justify-items-start items-center mb-4 transition-opacity duration-600" +
                  fading
                }
              >
                <Image
                  alt="Tri Ho"
                  height={40}
                  width={40}
                  src="/meta.png"
                  priority
                  className={"mr-4 p-2 rounded-lg"}
                />
                <div className="w-5/12">
                  <div className="dark:text-white text-gray-800 ">
                    Meta
                  </div>
                  <span className="dark:text-gray-400 whitespace-nowrap text-gray-600 text-sm ">
                    Software Engineering Intern
                  </span>
                </div>
                <span className=" grow opacity-0 md:opacity-100 w-full border-t dark:border-gray-500 mx-4 mb-4 self-end border-dashed shrink border-gray-400"></span>

                <span className="dark:text-gray-400  sm:whitespace-nowrap whitespace-normal text-right text-gray-600 text-sm">
                  Summer 2025
                </span>
              </ul>
            <ul
                className={
                  "flex flex-row justify-items-start items-center mb-4 transition-opacity duration-600" +
                  fading
                }
              >
                <Image
                  alt="Tri Ho"
                  height={40}
                  width={40}
                  src="/wealthsimple.png"
                  priority
                  className={"mr-4 p-2 rounded-lg"}
                />
                <div className="w-5/12">
                  <div className="dark:text-white text-gray-800 ">
                    Wealthsimple
                  </div>
                  <span className="dark:text-gray-400 whitespace-nowrap text-gray-600 text-sm ">
                    Software Engineering Intern
                  </span>
                </div>
                <span className=" grow opacity-0 md:opacity-100 w-full border-t dark:border-gray-500 mx-4 mb-4 self-end border-dashed shrink border-gray-400"></span>

                <span className="dark:text-gray-400  sm:whitespace-nowrap whitespace-normal text-right text-gray-600 text-sm">
                  Fall 2024
                </span>
              </ul>
            <ul
                className={
                  "flex flex-row justify-items-start items-center mb-4 transition-opacity duration-600" +
                  fading
                }
              >
                <Image
                  alt="Tri Ho"
                  height={40}
                  width={40}
                  src="/vendia.png"
                  priority
                  className={"mr-4 p-2 rounded-lg"}
                />
                <div className="w-5/12">
                  <div className="dark:text-white text-gray-800 ">
                    Vendia
                  </div>
                  <span className="dark:text-gray-400 whitespace-nowrap text-gray-600 text-sm ">
                    Software Engineering Intern
                  </span>
                </div>
                <span className=" grow opacity-0 md:opacity-100 w-full border-t dark:border-gray-500 mx-4 mb-4 self-end border-dashed shrink border-gray-400"></span>

                <span className="dark:text-gray-400  sm:whitespace-nowrap whitespace-normal text-right text-gray-600 text-sm">
                  Summer 2024
                </span>
              </ul>
              <ul
                className={
                  "flex flex-row justify-items-start items-center mb-4 transition-opacity duration-600" +
                  fading
                }
              >
                <Image
                  alt="Tri Ho"
                  height={40}
                  width={40}
                  src="/1password.png"
                  priority
                  className={"mr-4 p-2 rounded-lg"}
                />
                <div className="w-5/12">
                  <div className="dark:text-white text-gray-800 ">
                    1Password
                  </div>
                  <span className="dark:text-gray-400 whitespace-nowrap text-gray-600 text-sm ">
                    Software Developer Intern
                  </span>
                </div>
                <span className=" grow opacity-0 md:opacity-100 w-full border-t dark:border-gray-500 mx-4 mb-4 self-end border-dashed shrink border-gray-400"></span>

                <span className="dark:text-gray-400  sm:whitespace-nowrap whitespace-normal text-right text-gray-600 text-sm">
                  Fall 2022
                </span>
              </ul>

              <ul
                className={
                  "flex flex-row justify-items-start items-center mb-4 transition-opacity duration-600" +
                  fading
                }
              >
                <Image
                  alt="Tri Ho"
                  height={40}
                  width={40}
                  src="/huawei.svg"
                  priority
                  className={"mr-4 p-2 rounded-lg"}
                />
                <div className="w-5/12">
                  <div className="dark:text-white text-gray-800 ">Huawei</div>
                  <span className="dark:text-gray-400 whitespace-nowrap text-gray-600 text-sm ">
                    Software Engineering Intern
                  </span>
                </div>
                <span className=" grow opacity-0 md:opacity-100 w-full border-t dark:border-gray-500 mx-4 mb-4 self-end border-dashed shrink border-gray-400"></span>

                <span className="dark:text-gray-400  sm:whitespace-nowrap whitespace-normal text-right text-gray-600 text-sm">
                  Winter 2022
                </span>
              </ul>

              <ul
                className={
                  "flex flex-row justify-items-start items-center mb-4 transition-opacity duration-600" +
                  fading
                }
              >
                <Image
                  alt="Tri Ho"
                  height={40}
                  width={40}
                  src="/1password.png"
                  priority
                  className={"mr-4 p-2 rounded-lg"}
                />
                <div className="w-5/12">
                  <div className="dark:text-white text-gray-800 ">
                    1Password
                  </div>
                  <span className="dark:text-gray-400 whitespace-nowrap text-gray-600 text-sm ">
                    Software Developer Intern
                  </span>
                </div>
                <span className=" grow opacity-0 md:opacity-100 w-full border-t dark:border-gray-500 mx-4 mb-4 self-end border-dashed shrink border-gray-400"></span>

                <span className="dark:text-gray-400  sm:whitespace-nowrap whitespace-normal text-right text-gray-600 text-sm">
                  Summer 2021
                </span>
              </ul>
              <ul
                className={"list-none transition-opacity duration-600" + fading}
              >
                <span className=" flex  w-full border-t opacity-60 dark:border-gray-500 my-6 self-end shrink border-gray-400"></span>
              </ul>
              <ul
                className={
                  "flex flex-row justify-items-start items-center mb-4 transition-opacity duration-600" +
                  fading
                }
              >
                <Image
                  alt="Tri Ho"
                  height={40}
                  width={40}
                  src="/waterloo.png"
                  priority
                  className={"mr-4 p-2 rounded-lg"}
                />
                <div className="w-5/12">
                  <div className="dark:text-white text-gray-800 ">
                    University of Waterloo
                  </div>
                  <span className="dark:text-gray-400 whitespace-nowrap  text-gray-600 text-sm ">
                    B.S. Computer Science & C&O
                  </span>
                </div>
                <span className=" grow opacity-0 md:opacity-100 w-full border-t dark:border-gray-500 mx-4 mb-4 self-end border-dashed shrink border-gray-400"></span>

                <span className="dark:text-gray-400  sm:whitespace-nowrap whitespace-normal text-right text-gray-600 text-sm">
                  2020-2025
                </span>
              </ul>
            </div>
          </div>
        </div>
        <div className={"max-w-2xl mx-auto w-full mt-10 mb-10 transition-opacity delay-1400 duration-1000 justify-center h-5 border-b-1px border-gray-400 dark:border-gray-500 text-2xl text-center " + fading}>
      <span className="bg-amber-50 dark:bg-black px-5 position: relative -bottom-1.5 transition-colors duration-200 inline-flex items-center gap-2">
      <Link href="https://d3l-n3st.vercel.app/prev"><span className="inline-block rotate-180 relative top-[2px]">➢</span></Link>
          <Link href="https://d3l-n3st.vercel.app/">✵</Link>
          <Link href="https://d3l-n3st.vercel.app/next" className="inline-block  relative top-[1px]">➢</Link>
        </span>
      </div>
        <div
          className={
            
            "mt-4 h-80 w-full max-w-2xl transition-opacity delay-1100 duration-600  border-dashed border-black dark:border-gray-700 " +
            fading
          }
        >
          <Canvas>
            {/* <color transparent attach="background" args={[bgColour]} /> */}

            <color attach="background" args={['black']} />
      {/* Add ambient light for overall illumination */}
      <ambientLight intensity={0.5} />
      {/* Add directional light for shadows and depth */}
      <directionalLight position={[500, 10, 20]} intensity={10} />
            <TorusKnot />
            <AsciiRenderer 
              fgColor={resolvedTheme === "dark" ? "aqua" : "coral"} 
              bgColor="transparent" 
              characters=" .:-+*=%@#"
            />

            <OrbitControls enableZoom={false} minDistance={3.5} maxDistance={3} />
          </Canvas>
        </div>
      </div>
    </div>
  );
};

export default Home;
