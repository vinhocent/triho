import type { NextPage, GetStaticProps } from "next";
import { IPost } from "../../types/post";
import Link from "next/link";
import { getAllPosts } from "../../lib/mdx";
import generateRssFeed from "../../lib/generateRSSFeed";
import Head, { defaultHead } from "next/head";

import { useState, useEffect } from "react";

// props type
type Props = {
  posts: [IPost];
};

// component render function
const Blog: NextPage<Props> = ({ posts }: Props) => {
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
    <div className="px-8 ">
      <Head>
        <title>{heading + " Blog"}</title>
        <meta name="robots" content="follow, index" />
        <meta content={subheading} name="description" />
        <meta property="og:site_name" content={heading + " Blog"} />
        <meta property="og:description" content={subheading} />
        <meta property="og:title" content={heading + " Blog"} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@vinhocent" />
        <meta name="twitter:title" content={heading + " Blog"} />
        <meta name="twitter:description" content={subheading} />
        <link rel="shortcut icon" href="/tr1e.svg" />
      </Head>
      <div className=" flex flex-col justify-center items-start max-w-2xl border-gray-200 dark:border-gray-700 mx-auto pb-12">
        <h1
          className={
            "font-bold text-3xl md:text-5xl tracking-tight mb-1 flex text-black dark:text-white transition-opacity duration-600 " +
            fading
          }
        >
          writing
          <a
            href="/rss.xml"
            rel="noreferrer"
            target="_blank"
            className="px-3 my-4 "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-6 h-6 fill-black  hover:fill-gray-400  dark:fill-white  dark:hover:fill-gray-400 transition-colors duration-300"
            >
              <path
                fillRule="evenodd"
                d="M3.75 4.5a.75.75 0 01.75-.75h.75c8.284 0 15 6.716 15 15v.75a.75.75 0 01-.75.75h-.75a.75.75 0 01-.75-.75v-.75C18 11.708 12.292 6 5.25 6H4.5a.75.75 0 01-.75-.75V4.5zm0 6.75a.75.75 0 01.75-.75h.75a8.25 8.25 0 018.25 8.25v.75a.75.75 0 01-.75.75H12a.75.75 0 01-.75-.75v-.75a6 6 0 00-6-6H4.5a.75.75 0 01-.75-.75v-.75zm0 7.5a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </h1>

        <div
          className={
            "group flex-col items-center justify-between w-full relative max-w-2xl border-gray-200 dark:border-gray-700 mx-auto pt-8 pb-8 "
          }
        >
          {posts.map((post, i) => (
            <li
              key={post.slug}
              className={
                "group/item flex flex-row justify-items-start items-center mb-4 transition-opacity duration-500" +
                fading
              }
            >
              <Link href={`/writing/${post.slug}`}>
                <div className="dark:text-white text-gray-800 dark:group-hover:text-gray-500 dark:group-hover/item:text-gray-100 duration-300 group-hover:text-gray-400 group-hover/item:text-black ">
                  {post.title}
                </div>

                <span className="dark:text-gray-400 whitespace-nowrap text-gray-600 text-sm dark:group-hover:text-gray-500 dark:group-hover/item:text-gray-300 duration-300 group-hover:text-gray-400 group-hover/item:text-black">
                  {post.description}
                </span>
              </Link>
              <span className=" grow opacity-0 md:opacity-100 w-full border-t dark:border-gray-500 mx-4 mb-4 self-end border-dashed shrink border-gray-400 duration-300"></span>

              <span className="dark:text-gray-400  sm:whitespace-nowrap whitespace-normal text-right text-gray-600 text-sm dark:group-hover:text-gray-500 dark:group-hover/item:text-gray-300 duration-300 group-hover:text-gray-400 group-hover/item:text-black">
                {post.date}
              </span>
            </li>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;

// get posts from serverside at build time
export const getStaticProps: GetStaticProps = async () => {
  await generateRssFeed();
  const posts = getAllPosts([
    "title",
    "slug",
    "date",
    "description",
    "thumbnail",
  ]);

  // retunr the posts props
  return { props: { posts } };
};
