import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Page from '../components/page'

import { GetStaticProps } from 'next'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import ThemeSwitch from '../components/themeSwitch'

const components = { ThemeSwitch }

interface Props {
  mdxSource: MDXRemoteSerializeResult
}

export default function ExamplePage({ mdxSource }: Props) {
  return (
    <div>
      <MDXRemote {...mdxSource} components={components} />
    </div>
  )
}

export const getStaticProps: GetStaticProps<{mdxSource: MDXRemoteSerializeResult}> =
  async () => {
    const mdxSource = await serialize(
      'some *mdx* content: '
    )
    return { props: { mdxSource } }
  }