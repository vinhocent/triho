import type { NextPage, GetStaticProps } from "next";
import { IPost } from "../../types/post";
import Link from "next/link";
import { getAllPosts } from "../../lib/mdx";
import { useState, useEffect } from "react";

// props type
type Props = {
  posts: [IPost];
};

// component render function
const Home: NextPage<Props> = ({ posts }: Props) => {
  const [fading, setFading] = useState(" opacity-0 ease-in ");

  useEffect(() => {
    setFading(" opacity-100 ease-in ");
  }, []);

  return (
    <div className="px-8 ">
      <div className=" flex flex-col justify-center items-start max-w-2xl border-gray-200 dark:border-gray-700 mx-auto pb-12">
        <h1
          className={
            "font-bold text-3xl md:text-5xl tracking-tight mb-1 text-black dark:text-white transition-opacity duration-600 " +
            fading
          }
        >
          blog
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
              <Link href={`/blog/${post.slug}`}>
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

export default Home;

// get posts from serverside at build time
export const getStaticProps: GetStaticProps = async () => {
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
