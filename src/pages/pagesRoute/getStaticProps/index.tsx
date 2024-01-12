import BoxCode from "@/components/BoxCode";
import BoxTranslate from "@/components/BoxTranslate";
import GetStaticPropsLayout from "@/components/Layout/GetStaticPropsLayout";
import Slider from "@/components/Slider";
import React from "react";

const GetStaticPropsComponents = () => {
  return (
    <div>
      <main>
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-bold">static rendering by data :</h2>
          <BoxTranslate>
            If you export a function called getStaticProps (Static Site Generation) from a page, Next.js will pre-render this page at build time using the props returned by getStaticProps.
          </BoxTranslate>
          <BoxTranslate title="When should I use getStaticProps?">
            {`
            -The data required to render the page is available at build time ahead of a user’s  request\n
            -The data comes from a headless CMS.\n
            -The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance\n 
            -The data can be publicly cached (not user-specific). This condition can be bypassed in certain specific situation by using a Middleware to rewrite the path.
            `}
          </BoxTranslate>
          <BoxTranslate title="When does getStaticProps run">
            {`
             getStaticProps always runs on the server and never on the client .\n
            -getStaticProps runs in the background when using fallback: true\n
            -getStaticProps is called before initial render when using fallback: blocking.\n
            -getStaticProps runs in the background when using revalidate\n
            -getStaticProps runs on-demand in the background when using revalidate()\n 
            -When combined with Incremental Static Regeneration, getStaticProps will run in the background while the stale page is being revalidated, and the fresh page served to the browser..
            `}
          </BoxTranslate>
          <BoxTranslate title="Good to know:">
            {`
             As getStaticProps runs only on the server-side, it will never run on the client-side. It won’t even be included in the JS bundle for the browser, so you can write direct database queries without them being sent to browsers.\n
             This means that instead of fetching an API route from getStaticProps (that itself fetches data from an external source), you can write the server-side code directly in getStaticProps.\n
             
             Take the following example. An API route is used to fetch some data from a CMS. That API route is then called directly from getStaticProps. This produces an additional call, reducing performance. Instead, the logic for fetching the data from the CMS can be shared by using a lib/ directory. Then it can be shared with getStaticProps.
            
             Runs on every request in development
             In development (next dev), getStaticProps will be called on every request.
           `}
          </BoxTranslate>
          <BoxCode syntax="jsx">
            {`
//lib/load-posts.js
// The following function is shared
// with getStaticProps and API routes
// from a lib/ directory
  export async function loadPosts() {
      // Call an external API endpoint to get posts
      const res = await fetch('https://.../posts/')
      const data = await res.json()
 
      return data
  }

// pages/blog.js
  import { loadPosts } from '../lib/load-posts'

// This function runs only on the server side
  export async function getStaticProps() {
      // Instead of fetching your /api route you can call the same
      // function directly in getStaticProps
      const posts = await loadPosts()

     // Props returned will be passed to the page component
      return { props: { posts } }
  }    
            `}
          </BoxCode>
          <BoxTranslate title="Statically generates both HTML and JSON">
            {`
              When a page with getStaticProps is pre-rendered at build time, in addition to the page HTML file, Next.js generates a JSON file holding the result of running getStaticProps.
              
              This JSON file will be used in client-side routing through next/link or next/router. When you navigate to a page that’s pre-rendered using getStaticProps, Next.js fetches this JSON file (pre-computed at build time) and uses it as the props for the page component. This means that client-side page transitions will not call getStaticProps as only the exported JSON is used.
             
              When using Incremental Static Generation, getStaticProps will be executed in the background to generate the JSON needed for client-side navigation. You may see this in the form of multiple requests being made for the same page, however, this is intended and has no impact on end-user performance.
            `}
          </BoxTranslate>
          <BoxTranslate title="Where can I use getStaticProps">
            {`
              getStaticProps can only be exported from a page. You cannot export it from non-page files, _app, _document, or _error.

              One of the reasons for this restriction is that React needs to have all the required data before the page is rendered.

              Also, you must use export getStaticProps as a standalone function — it will not work if you add getStaticProps as a property of the page component.
            `}
          </BoxTranslate>
        </div>
        <Slider list={[<img src="/img/static-generation-with-data.png" alt="ssr" key={"client-side-rendering"} />, <img src="/img/ssg.jpeg" alt="csr" key={"ssr"} />]} />
      </main>
    </div>
  );
};

export default GetStaticPropsComponents;

GetStaticPropsComponents.getLayout = function getLayout(page: any) {
  return <GetStaticPropsLayout>{page}</GetStaticPropsLayout>;
};
