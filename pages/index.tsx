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
  const heading = "Trí Ho";
  const subheading = "/trē/";

  useEffect(() => {
    setFading(" opacity-100 ease-in ");
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
      </Head>
      <div className="flex flex-col justify-center items-start max-w-2xl border-gray-200 dark:border-gray-700 mx-auto pb-12">
        <div className="flex flex-col-reverse gap-y-6 sm:flex-row sm:gap-y-0 items-start ">
          <div className="flex flex-col pr-8">
            <h1
              className={
                "font-bold text-2xl md:text-4xl tracking-tight mb-1 text-black dark:text-white transition-opacity duration-600 " +
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
          </h2>
            <p
              className={
                "text-sm leading-7 text-gray-700 dark:text-gray-400 mb-2 break-normal transition-opacity duration-600   delay-700 " +
                fading
              }
            >
              I work on OpenAI&apos;s Multimodal API team.
            </p>
            <p
              className={
                "text-sm leading-7 text-gray-700 dark:text-gray-400 mb-2 break-normal transition-opacity duration-600 delay-700 " +
                fading
              }
            >
              I grew up in Toronto, Canada. I studied Computer Science with a
              minor in Combinatorics & Optimization at the University of
              Waterloo, and now live in San Francisco.
            </p>
            <div
              className={
                "text-sm leading-7 text-gray-700 dark:text-gray-400 mb-2 break-normal transition-opacity duration-600 delay-700 " +
                fading
              }
            >
              <p className="mb-2">I am broadly interested in:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>the role of voice in the future of computing</li>
                <li>experimenting w/ my day-to-day ergonomics</li>
                <li>publishing and creating my own zine</li>
                <li>backpacking/thru-hiking</li>
              </ul>
            </div>
            <div
              className={
                "mt-8 mb-12 flex items-center gap-3 text-sm leading-7 text-gray-500 dark:text-gray-500 transition-opacity duration-600 delay-700 " +
                fading
              }
            >
              <span className="h-px w-8 bg-gray-300 dark:bg-gray-700"></span>
              <span>thank you for visiting, and take care</span>
            </div>
          </div>
          <div className={"duration-800  delay-800 " + fading}>
            <Image
              alt="me in blue pixels"
              height={360}
              width={600}
              src="/mealt.png"
              priority
              className="dark:inline hidden "
            />
            <Image
              alt="me in red pixels"
              height={360}
              width={600}
              src="/me.png"
              priority
              className="dark:hidden"
            />
          </div>
        </div>
        <div className={"dark:text-gray-400 max-w-2xl mx-auto w-full mt-10 mb-10 transition-opacity delay-1400 duration-1000 justify-center h-5 border-b-1px border-gray-400 dark:border-gray-500 text-2xl text-center " + fading}>
      <span className="bg-amber-50 dark:bg-black px-5 position: relative -bottom-1.5 transition-colors duration-200 inline-flex items-center gap-2">
      <Link href="https://d3l-n3st.vercel.app/prev"><span className="inline-block rotate-180 relative top-[2px]">➢</span></Link>
          <Link href="https://d3l-n3st.vercel.app/">✵</Link>
          <Link href="https://d3l-n3st.vercel.app/next" className=" inline-block  relative top-[1px]">➢</Link>
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
