import type { NextPage, GetStaticProps } from 'next'
import { IPost } from "../../types/post";
import Link from 'next/link'
import { getAllPosts } from "../../lib/mdx";

// props type
type Props = {
  posts: [IPost]
}

// component render function
const Home: NextPage<Props> = ({ posts }: Props) => {
  return (
    <div className="flex flex-col justify-center items-start max-w-2xl border-gray-200 dark:border-gray-700 mx-auto pb-12">
    <h1 className={'font-bold text-3xl md:text-5xl tracking-tight mb-1 text-black dark:text-white transition-opacity duration-600 ' }>
                blog
              </h1>
    <div className=" flex-col items-center justify-between w-full relative max-w-2xl border-gray-200 dark:border-gray-700 mx-auto pt-8 pb-8 ">
       
      {posts.map((post) => (
        <div key={post.slug} className=" flex flex-row justify-items-start items-center mb-4 " >



          <Link href={`/blog/${post.slug}`}>
            <div className="dark:text-white text-gray-800 ">
              {post.title}
            </div>

            <span className="dark:text-gray-400 whitespace-nowrap text-gray-600 text-sm ">
              {post.description}
            </span>
          </Link>
          <span className=" grow opacity-0 md:opacity-100 w-full border-t dark:border-gray-500 mx-4 mb-4 self-end border-dashed shrink border-gray-400"></span>


          <span className="dark:text-gray-400  sm:whitespace-nowrap whitespace-normal text-right text-gray-600 text-sm">
            {post.date}
          </span>
        </div>
      ))}
    </div>
    </div>
  )
}

{/* 
            <h2 className="text-2xl font-bold mb-4">
              <Link href={`/blog/${post.slug}`}>
                {post.title}
              </Link>
            </h2>

            <p>{post.description}</p> */}
export default Home

// get posts from serverside at build time
export const getStaticProps: GetStaticProps = async () => {
  const posts = getAllPosts([
    'title',
    'slug',
    'date',
    'description',
    'thumbnail'
  ]);

  // retunr the posts props
  return { props: { posts } }
}