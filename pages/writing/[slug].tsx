import { serialize } from "next-mdx-remote/serialize";
import { GetStaticProps, GetStaticPaths } from "next";
import { useState, useEffect } from "react";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { join } from "path";
import readingTime from "reading-time";
import Head, { defaultHead } from "next/head";
import Image from "next/image";
import { Highlight, themes } from "prism-react-renderer";
import Code from "../../components/codeBlock";
import { IPost } from "../../types/post";
import { ParsedUrlQuery } from "querystring";

// props type
type Props = {
  source: MDXRemoteSerializeResult;
  frontMatter: Omit<IPost, "slug">;
};

// components to render
const components = {
  pre: (props: any) => <Code {...props} />,
  Image,
};

// Get post content by slug
const getPost = (slug: string) => {
  const postsDirectory = join(process.cwd(), 'data/writing');
  const fullPath = join(postsDirectory, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  return { content, data };
};

// Get all post slugs
const getAllPostSlugs = () => {
  const postsDirectory = join(process.cwd(), 'data/writing');
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((fileName) => /\.mdx?$/.test(fileName))
    .map((fileName) => {
      return {
        params: {
          slug: fileName.replace(/\.mdx?$/, ''),
        },
      };
    });
};

const PostPage: React.FC<Props> = ({ source, frontMatter }: Props) => {
  const [fading, setFading] = useState(" opacity-0 ease-in ");
  const [heading, setHeading] = useState("tr1e_");
  const [subheading, setSubHeading] = useState("digital warlord @f0r3st");

  useEffect(() => {
    setFading(" opacity-100 ease-in ");
  }, []);

  // get setters
  return (
    <div className="flex flex-col justify-center items-start max-w-2xl border-gray-200 dark:border-gray-700 px-8 sm:px-0 mx-auto pb-12">
      <div
        className={
          " flex-col items-center justify-between w-full relative max-w-2xl border-gray-200 dark:border-gray-700 mx-auto pt-2 pb-8 "
        }
      >
        <div id={"blogs"}>
          <h1
            className={
              "font-bold text-2xl md:text-4xl tracking-tight mb-1 text-black dark:text-white transition-opacity duration-600 " +
              fading
            }
          >
            {frontMatter.title}
          </h1>
          <ul
            className={
              " flex flex-row justify-items-start items-center mb-4 transition-opacity duration-600 " +
              fading
            }
          >
            <div className="dark:text-white text-gray-800 ">
              {frontMatter.date}
            </div>
          </ul>

          <ul
            className={
              " flex flex-row justify-items-start items-center mb-4 transition-opacity duration-600 " +
              fading
            }
          >
            <div className="dark:text-white text-gray-800 ">
              {frontMatter.description}
            </div>
          </ul>
          <ul className={"transition-opacity duration-600 " + fading}>
            <span className=" flex  w-full border-t opacity-60 dark:border-gray-500 my-6 self-end shrink border-gray-400"></span>
          </ul>
        </div>
        <article
          className={"dark:text-gray-300 transition-opacity delay-1200 duration-600" + fading}
        >
          <MDXRemote components={components} {...source} />
        </article>
      </div>
    </div>
  );
};

{
  /* <MDXRemote  {...source} /> */
}

interface Iparams extends ParsedUrlQuery {
  slug: string;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as Iparams;
  // get the slug
  const { content, data } = getPost(slug);
  // serialize the data on the server side
  const mdxSource = await serialize(content, { scope: data });
  return {
    props: {
      source: mdxSource,
      frontMatter: data,
    },
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  //only get the slug from posts
  const posts = getAllPostSlugs();

  // map through to return post paths
  const paths = posts.map((post) => ({
    params: {
      slug: post.params.slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export default PostPage;
