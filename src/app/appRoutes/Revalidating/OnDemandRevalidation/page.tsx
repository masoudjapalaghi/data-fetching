import BoxCode from "@/components/BoxCode";
import BoxTranslate from "@/components/BoxTranslate";
import Slider from "@/components/Slider";
import React from "react";

const OnDemandRevalidation = () => {
  return (
    <div>
      <main>
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-bold">On-demand Revalidation :</h2>
          <BoxTranslate >
            {`Data can be revalidated on-demand by path (revalidatePath) or by cache tag (revalidateTag) inside a Server Action or Route Handler.  
                Next.js has a cache tagging system for invalidating fetch requests across routes.`}
          </BoxTranslate>
          <BoxTranslate title="revalidateTag">
            {`
                1.When using fetch, you have the option to tag cache entries with one or more tags.
                2.Then, you can call revalidateTag to revalidate all entries associated with that tag.


                For example, the following fetch request adds the cache tag collection:
                `}
          </BoxTranslate>

          <BoxCode>
            {`
export default async function Page() {
  const res = await fetch('https://...', { next: { tags: ['collection'] } })
  const data = await res.json()
  // ...
}
// app/actions.ts
'use server'
 
import { revalidateTag } from 'next/cache'
 
export default async function action() {
  revalidateTag('collection')
}
          `}
          </BoxCode>
          <BoxTranslate>
            {`
            -The first time a fetch request is called, the data will be fetched from the external data source and stored in the Data Cache.
            -When an on-demand revalidation is triggered, the appropriate cache entries will be purged from the cache.
                ----his is different from time-based revalidation, which keeps the stale data in the cache until the fresh data is fetched.
            -The next time a request is made, it will be a cache MISS again, and the data will be fetched from the external data source and stored in the Data Cache.
            `}
          </BoxTranslate>
          <Slider list={[<img src="/img/on-demand-revalidation.avif" alt="on-demand-revalidation.avif" key={"on-demand-revalidation"} />]} />
          <BoxTranslate title="revalidatePath">
            {`
               revalidatePath allows you to purge cached data on-demand for a specific path.

               Good to know:

               revalidatePath is available in both Node.js and Edge runtimes.
              
               revalidatePath only invalidates the cache when the included path is next visited. This means calling revalidatePath with a dynamic route segment will not immediately trigger many revalidations at once. The invalidation only happens when the path is next visited.
              
               Currently, revalidatePath invalidates all the routes in the client-side Router Cache. This behavior is temporary and will be updated in the future to apply only to the specific path.
              
               Using revalidatePath invalidates only the specific path in the server-side Route Cache.
                `}
          </BoxTranslate>
          <BoxCode>
            {`
revalidatePath(path: string, type?: 'page' | 'layout'): void;

//Revalidating A Specific URL
import { revalidatePath } from 'next/cache'
revalidatePath('/blog/post-1')

//Revalidating A Page Path
import { revalidatePath } from 'next/cache'
revalidatePath('/blog/[slug]', 'page')
// or with route groups
revalidatePath('/(main)/post/[slug]', 'page')

//Revalidating A Layout Path
import { revalidatePath } from 'next/cache'
revalidatePath('/blog/[slug]', 'layout')
// or with route groups
revalidatePath('/(main)/post/[slug]', 'layout')

// Revalidating All Data
import { revalidatePath } from 'next/cache'
revalidatePath('/', 'layout')

// Server Action
'use server'
 
import { revalidatePath } from 'next/cache'
 
export default async function submit() {
  await submitForm()
  revalidatePath('/')
}

// Route Handler
import { revalidatePath } from 'next/cache'
import { NextRequest } from 'next/server'
 
export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get('path')
 
  if (path) {
    revalidatePath(path)
    return Response.json({ revalidated: true, now: Date.now() })
  }
 
  return Response.json({
    revalidated: false,
    now: Date.now(),
    message: 'Missing path to revalidate',
  })
}
          `}
          </BoxCode>
        </div>
      </main>
    </div>
  );
};

export default OnDemandRevalidation;
