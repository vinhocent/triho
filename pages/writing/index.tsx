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
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

  useEffect(() => {
    setFading(" opacity-100 ease-in ");
  }, []);

  return (
    <div className="px-8 ">
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

        <ul
          id={"blogs"}
          className={
            "flex flex-col items-stretch justify-between w-full relative max-w-2xl list-none border-gray-200 dark:border-gray-700 mx-auto p-0 pt-8 pb-8 "
          }
        >
          {posts.map((post, i) => (
            <li
              key={post.slug}
              onMouseEnter={() => setHoveredSlug(post.slug)}
              onMouseLeave={() => setHoveredSlug(null)}
              className={
                "group/item flex w-full flex-row justify-items-start items-center mb-4 transition-opacity duration-500" +
                fading
              }
            >
              <Link href={`/writing/${post.slug}`}>
                <div
                  className={
                    "duration-300 " +
                    (hoveredSlug === null || hoveredSlug === post.slug
                      ? "dark:text-white text-gray-800"
                      : "dark:text-gray-500 text-gray-400")
                  }
                >
                  {post.title}
                </div>

                <span
                  className={
                    "whitespace-nowrap text-sm duration-300 " +
                    (hoveredSlug === null || hoveredSlug === post.slug
                      ? "dark:text-gray-400 text-gray-700"
                      : "dark:text-gray-500 text-gray-400")
                  }
                >
                  {post.description}
                </span>
              </Link>
              <span className=" grow opacity-0 md:opacity-100 w-full border-t dark:border-gray-500 mx-4 mb-4 self-end border-dashed shrink border-gray-400 duration-300"></span>

              <span
                className={
                  "sm:whitespace-nowrap whitespace-normal text-right text-sm duration-300 " +
                  (hoveredSlug === null || hoveredSlug === post.slug
                    ? "dark:text-gray-400 text-gray-700"
                    : "dark:text-gray-500 text-gray-400")
                }
              >
                {post.date}
              </span>
            </li>
          ))}
        </ul>
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
