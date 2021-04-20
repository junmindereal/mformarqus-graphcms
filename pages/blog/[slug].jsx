import Markdown from 'markdown-to-jsx'
import { getBlogPosts, getBlogPost } from '@/utils/queries'

export async function getStaticPaths () {
  const { posts } = await getBlogPosts()
  const paths = posts.map(post => {
    return {
      params: {
        slug: post.slug
      }
    }
  })

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps (context) {
  const { post } = await getBlogPost(context.params.slug)
  const props = { post }

  return { props }
}

export default function BlogPost ({ post }) {
  return (
    <>
      <h1 className='text-5xl'>{post.title}</h1>
      <Markdown>{post.content.markdown}</Markdown>
    </>
  )
}
