import { useRouter } from 'next/router'

export default function Index({ data }) {
  const router = useRouter()

  // For Fallback Page
  if (router.isFallback) {
    return (
      <>
        <p>Loading Please Wait...</p>
      </>
    )
  }

  return (
    <>
      <h1>Welcome User {data}</h1>
    </>
  )
}

// Getting Path of Each Subdomain
export async function getStaticPaths() {
  const paths = [{ params: { site: 'test' } }, { params: { site: 'test2' } }]

  return {
    paths,
    fallback: true,
  }
}

// Getting data for each subdomain/user
export async function getStaticProps({ params: { site } }) {
  const data = [
    { domain: 'test', data: 'My first test project' },
    { domain: 'test2', data: 'My second test project' },
    { domain: 'test3', data: 'My third test project' },
  ]

  const project = data.find((p) => p.domain === site)
  if (!project) {
    return {
      notFound: true,
    }
  }

  console.log('This is Project', project)
  return {
    props: project,
  }
}
