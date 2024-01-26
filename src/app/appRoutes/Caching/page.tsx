import BoxCode from "@/components/BoxCode";
import BoxTranslate from "@/components/BoxTranslate";
import Slider from "@/components/Slider";
import React from "react";

const Caching = () => {
  return (
    <div>
      <main>
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-bold">Caching :</h2>
          <BoxTranslate>
            {`
          Caching stores data so it doesn't need to be re-fetched from your data source on every request.
          `}
          </BoxTranslate>
          <BoxTranslate>
            {`
            Next.js has a built-in Data Cache that persists the result of data fetches across incoming server requests and deployments. This is possible because Next.js extends the native fetch API to allow each request on the server to set its own persistent caching semantics.          

            Good to know: In the browser, the cache option of fetch indicates how a request will interact with the browser's HTTP cache, in Next.js, the cache option indicates how a server-side request will interact with the server's Data Cache.
          `}
          </BoxTranslate>
          <BoxTranslate>{`
            How the Data Cache Works:
            -The first time a fetch request is called during rendering, Next.js checks the Data Cache for a cached response.

            -If a cached response is found, it's returned immediately and memoized.

            -If a cached response is not found, the request is made to the data source, the result is stored in the Data Cache, and memoized.

            -For uncached data (e.g. { cache: 'no-store' }), the result is always fetched from the data source, and memoized.

            -Whether the data is cached or uncached, the requests are always memoized to avoid making duplicate requests for the same data during a React render pass.
            
            Differences between the Data Cache and Request Memoization

            While both caching mechanisms help improve performance by re-using cached data, the Data Cache is persistent across incoming requests and deployments, whereas memoization only lasts the lifetime of a request.

            With memoization, we reduce the number of duplicate requests in the same render pass that have to cross the network boundary from the rendering server to the Data Cache server (e.g. a CDN or Edge Network) or data source (e.g. a database or CMS). With the Data Cache, we reduce the number of requests made to our origin data source.
          
            fetch requests that use the POST method are also automatically cached. Unless it's inside a Route Handler that uses the POST method, then it will not be cached.
            `}</BoxTranslate>
          <Slider
            list={[
              <img src="/img/caching-overview.avif" alt="caching-overview.avif" key={"caching-overview"} />,
              <img src="/img/router-cache.avif" alt="router-cache.avif" key={"router-cache"} />,
              <img src="/img/full-route-cache.avif" alt="full-route-cache.avif" key={"full-route-cache"} />,
              <img src="/img/request-memoization.avif" alt="request-memoization.avif" key={"request-memoization"} />,
              <img src="/img/memoization.avif" alt="memoization.avif" key={"memoization"} />,
              <img src="/img/data-cache.avif" alt="data-cache.avif" key={"data-cache"} />,
            ]}
          />

          <BoxTranslate title="Opting out of Data Caching">
            {`
            -The cache: 'no-store' is added to fetch requests.
            -The revalidate: 0 option is added to individual fetch requests.
            -The fetch request is inside a Router Handler that uses the POST method.
            -The fetch request comes after the usage of headers or cookies.
            -The const dynamic = 'force-dynamic' route segment option is used.
            -The fetchCache route segment option is configured to skip cache by default.
            -The fetch request uses Authorization or Cookie headers and there's an uncached request above it in the component tree.
          `}
          </BoxTranslate>
          <BoxCode>{cache}</BoxCode>
        </div>
      </main>
    </div>
  );
};

export default Caching;
const cache = `
// route segment
dynamic = 'force-dynamic'
'auto' | 'force-dynamic' | 'error' | 'force-static'

export const fetchCache = 'auto'
'auto' | 'default-cache' | 'only-cache' | 'force-cache' | 'force-no-store' | 'default-no-store' | 'only-no-store'


export default async function Page() {
   // This request should be cached until manually invalidated.
   // Similar to 'getStaticProps'.
   // 'force-cache' is the default and can be omitted.
   const staticData = await fetch('https://...', { cache: 'force-cache' })
  
   // This request should be refetched on every request.
   // Similar to 'getServerSideProps'.
   const dynamicData = await fetch('https://...', { cache: 'no-store' })
  
   // false - Cache the resource indefinitely. Semantically equivalent to revalidate: Infinity. The HTTP cache may evict older resources over time.
   const revalidatedData = await fetch('https://...', {
     next: { revalidate: false  },
   })
   // removed catch revalidate
   // 0 - Prevent the resource from being cached.
   const revalidatedData = await fetch('https://...', {
     next: { revalidate:  0 },
   })
  
   return <div>...</div>
 }
`;
