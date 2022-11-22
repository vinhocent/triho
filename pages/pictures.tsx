import type { NextPage, GetStaticProps } from "next";
import { IPost } from "../types/post";
import Link from "next/link";
import { getAllPosts } from "../lib/art";
import Head, { defaultHead } from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";

// props type
type Props = {
  posts: [IPost];
};

// component render function
const Blog: NextPage<Props> = ({ posts }: Props) => {
  const [fading, setFading] = useState(" opacity-0 ease-in ");

  useEffect(() => {
    setFading(" opacity-100 ease-in ");
  }, []);

  return (
    <div className="px-8 ">
      <div className=" flex flex-col justify-center items-start max-w-2xl border-gray-200 dark:border-gray-700 mx-auto pb-12">
        <h1
          className={
            "font-bold text-3xl md:text-5xl tracking-tight mb-4 flex text-black dark:text-white transition-opacity duration-600 " +
            fading
          }
        >
          pictures
        </h1>

        <section
          className={
            "overflow-hidden transition-opacity duration-600 delay-800 " +
            fading
          }
        >
          <div className="container mx-auto ">
            <div className="  -m-1 md:-m-2">
              <div className="grid  grid-cols-3 grid-rows-2 ">
                {posts.map((post, i) => (
                  <li key={i} className="list-none  p-1 md:p-2">
                    <Image
                      alt="image"
                      width={10000}
                      height={1000}
                      className="block object-cover object-center w-full h-full rounded-lg"
                      src={post.thumbnail}
                      priority
                    />
                  </li>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Blog;

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
