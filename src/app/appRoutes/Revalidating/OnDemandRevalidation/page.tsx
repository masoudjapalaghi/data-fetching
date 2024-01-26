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
          <BoxTranslate>
            {`
                Data can be revalidated on-demand by path (revalidatePath) or by cache tag (revalidateTag) inside a Server Action or Route Handler.  
                Next.js has a cache tagging system for invalidating fetch requests across routes.

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
        </div>
      </main>
    </div>
  );
};

export default OnDemandRevalidation;
