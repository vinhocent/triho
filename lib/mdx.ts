import path from 'path'
import fs from 'fs'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import { sync } from 'glob'

const blogPath = path.join(process.cwd(), 'data/blog')

export async function getSlug() {
  const paths = sync(`${blogPath}/*.mdx`)

  return paths.map((path: string) => {
    // holds the paths to the directory of the article
    const pathContent = path.split('/')
    const fileName = pathContent[pathContent.length - 1]
    const [slug, _extension] = fileName.split('.')

    return slug
  })
}

export async function getArticleFromSlug(slug: any) {
    const articleDir = path.join(blogPath, `${slug}.mdx`)
    const source = fs.readFileSync(articleDir)
    const { content, data } = matter(source)
  
    return {
      content,
      frontmatter: {
        slug,
        excerpt: data.excerpt,
        title: data.title,
        publishedAt: data.publishedAt,
        readingTime: readingTime(source).text,
        ...data,
      },
    }
  }


  export async function getAllArticles() {
    const blogs = fs.readdirSync(path.join(process.cwd(), 'data/blog'))
  
    return blogs.reduce((allArticles, articleSlug) => {
      // get parsed data from mdx files in the "blog" dir
      const source = fs.readFileSync(
        path.join(process.cwd(), 'data/blog', articleSlug),
        'utf-8'
      )
      const { data } = matter(source)
  
      return [
        {
          ...data,
          slug: articleSlug.replace('.mdx', ''),
          readingTime: readingTime(source).text,
        },
        ...allArticles,
      ]
    }, [])
  }
  
