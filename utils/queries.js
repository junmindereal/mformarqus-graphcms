import { GraphQLClient, gql } from 'graphql-request'

const { REGION, PROJECT_ID, ENVIRONMENT, PAT_TOKEN } = process.env

const endpoint = `https://${REGION}.graphcms.com/v2/${PROJECT_ID}/${ENVIRONMENT}`

const graphQLClient = new GraphQLClient(endpoint, {
  headers: {
    authorization: `Bearer ${PAT_TOKEN}`
  }
})

export async function getBlogPosts () {
  const postsQuery = gql`
    {
      posts {
        title
        excerpt
        slug
      }
    }
  `
  return graphQLClient.request(postsQuery)
}

export async function getBlogPost (slug) {
  const postQuery = gql`
    query getBlogPost($slug: String!) {
      post(where: {slug: $slug}) {
        title
        slug
        content {
          markdown
        }
      }
    }
  `
  return graphQLClient.request(postQuery, { slug })
}
