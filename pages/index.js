import Head from 'next/head'
import Link from 'next/link'
import { getBlogPosts } from '@/utils/queries'

export async function getStaticProps () {
  const { posts } = await getBlogPosts()

  return {
    props: { posts }
  }
}

export default function Home ({ posts }) {
  return (
    <>
      <Head>
        <title>M For Marqus</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <h1 className='text-5xl'>Hello World</h1>
      <ol>
        {posts.map(post => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`}>
              <a><h2>{post.title}</h2></a>
            </Link>
            <p>{post.excerpt}</p>
          </li>
        ))}
      </ol>
    </>
  )
}
