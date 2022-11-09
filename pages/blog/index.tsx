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
    <div>
      <h1 className="text-4xl font-bold mb-4">Blog</h1>

      <div className="space-y-12">
        {posts.map((post) => (
          <div key={post.slug}>


            <h2 className="text-2xl font-bold mb-4">
              <Link href={`/blog/${post.slug}`}>
                {post.title}
              </Link>
            </h2>

            <p>{post.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

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