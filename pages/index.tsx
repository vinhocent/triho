import Head from "next/head";
import Image from "next/image";
import { useTheme } from "next-themes";
import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";
import type { NextPage } from "next";
import { IPost } from "../../types/post";

// props type
type Props = {
  posts: [IPost];
};
const Home: NextPage = () => {
  const [fading, setFading] = useState(" opacity-0 ease-in ");

  useEffect(() => {
    setFading(" opacity-100 ease-in ");
  }, []);

  let src = "/mikupinkpfp.jpg";

  return (
    <div>
      <div className="flex flex-col justify-center items-start max-w-2xl border-gray-200 dark:border-gray-700 mx-auto pb-12">
        <div className="flex flex-col-reverse sm:flex-row items-start ">
          <div className="flex flex-col pr-8">
            <h1
              className={
                "font-bold text-3xl md:text-5xl tracking-tight mb-1 text-black dark:text-white transition-opacity duration-600 " +
                fading
              }
            >
              tr1e_
            </h1>
            <h2
              className={
                "text-gray-700 dark:text-gray-200 mb-4 mt-2 transition-opacity duration-600  delay-600 " +
                fading
              }
            >
              student/developer/learner
            </h2>
            <p
              className={
                "text-gray-600 dark:text-gray-400 mb-16 break-normal transition-opacity duration-600   delay-700 " +
                fading
              }
            >
              {
                "I'm a student studying Computer Science. What do I do? I am not sure haha? I love learning thats for sure."
              }
            </p>
          </div>
          <div className={"duration-800  delay-800 " + fading}>
            <Image alt="Tri Ho" height={300} width={300} src={src} priority />
          </div>
        </div>
        <div className={"w-full max-w-2xl "}>
          <p
            className={
              "text-gray-600 font-semibold text-xl dark:text-gray-400 break-all mb-6 transition-opacity duration-600   delay-700 " +
              fading
            }
          >
            {"Where I've Been"}
          </p>
          <div className="flex flex-col  gap-y-8">
            <div className="   items-center flex-col">
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
                  <span className="dark:text-gray-400 whitespace-nowrap text-gray-600 text-sm ">
                    Computer Science + C&O , Bachelors
                  </span>
                </div>
                <span className=" grow opacity-0 md:opacity-100 w-full border-t dark:border-gray-500 mx-4 mb-4 self-end border-dashed shrink border-gray-400"></span>

                <span className="dark:text-gray-400  sm:whitespace-nowrap whitespace-normal text-right text-gray-600 text-sm">
                  2020-2024
                </span>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
