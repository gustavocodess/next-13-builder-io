
import { headers } from 'next/headers';
import Head from 'next/head'
const getBuilderPage = async () => {
  const headersList = headers();
  // read the custom x-url header
  const header_url = headersList.get('x-url') || "";
  // TODO: change this to whatever host and path you use
  const urlPath = header_url.split('http://localhost:3000/builder')[1] || '/'
  console.log('pathname ', urlPath)
  const PAGE_MODEL = 'page'

  return await fetch(`https://cdn.builder.io/api/v2/content/${PAGE_MODEL}?apiKey=1f56510468674de0bc19bb819986e52c&userAttributes.urlPath=${urlPath}`)
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
        <p>Loading...</p>
      </builder-component>
      

    </div>
  )
}