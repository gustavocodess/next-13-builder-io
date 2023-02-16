
import { headers } from 'next/headers';
import Head from 'next/head'

const PAGE_MODEL = 'page'
const BUILDER_API_KEY = '1f56510468674de0bc19bb819986e52c'

const getBuilderPage = async () => {
  const headersList = headers();
  // get the pathname of which route to fetch
  const header_url = headersList.get('x-url') || "";
  // TODO: change this to whatever host and path you use
  const urlPath = header_url.split('http://localhost:3000/builder')[1] || '/'
  console.log('pathname ', urlPath)

  return await fetch(`https://cdn.builder.io/api/v2/content/${PAGE_MODEL}?apiKey=${BUILDER_API_KEY}&userAttributes.urlPath=${urlPath}`)
  .then(res => res.json())
  .then(data => data)
}

export default async function Page() {
  const [pageData] = await Promise.all([getBuilderPage()]);

  if (!pageData || !pageData.results?.length) {
    return <p>Not found</p>
  }
  console.log('entry id', pageData.results[0].id)
  return (
    <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div>test</div>
      <builder-component entry={pageData.results[0].id} model="page" api-key="1f56510468674de0bc19bb819986e52c">
        <p>Your loading component...</p>
      </builder-component>
      

    </div>
  )
}