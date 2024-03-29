import BoxCode from "@/components/BoxCode";
import BoxTranslate from "@/components/BoxTranslate";
import GetStaticPropsLayout from "@/components/Layout/GetStaticPropsLayout";
import ProductCard from "@/components/ProductCard";
import Slider from "@/components/Slider";
import Tabs from "@/components/Tabs";
import config from "@/helpers/config";

import type { GetServerSideProps } from "next";

const GetList = ({ data }: { data: ProductCardType[] }) => {
  const tabsData = [
    {
      label: "List",
      content: (
        <div className="flex flex-wrap gap-4 ">
          {data.map((item, index) => (
            <ProductCard key={index} data={item} productId={item.id} />
          ))}
        </div>
      ),
    },
    {
      label: "Concept",
      content: (
        <div className="flex flex-col gap-4">
          <BoxTranslate size={24}>Incremental Static Regeneration</BoxTranslate>
          <BoxTranslate>
            Next.js allows you to create or update static pages after you’ve built your site. Incremental Static Regeneration (ISR) enables you to use
            static-generation on a per-page basis, without needing to rebuild the entire site. With ISR, you can retain the benefits of static while scaling to
            millions of pages.
          </BoxTranslate>
          <BoxCode>
            {`return {
    props: {
      posts,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 61 seconds
    revalidate: 61, // In seconds
  }`}
          </BoxCode>
          <BoxTranslate title="how to worked">
            {`
            When a request is made to a page that was pre-rendered at build time, it will initially show the cached page\n
            -Any requests to the page after the initial request and before 10 seconds are also cached and instantaneous.\n
            -After the 10-second window, the next request will still show the cached (stale) page\n
            -Next.js triggers a regeneration of the page in the background.\n
            Once the page generates successfully, Next.js will invalidate the cache and show the updated page. If the background regeneration fails, the old page would still be unaltered.
            When a request is made to a path that hasn’t been generated, Next.js will server-render the page on the first request. Future requests will serve the static file from the cache. 
          `}
          </BoxTranslate>
          <Slider list={[<img src="/img/isr.png" alt="csr" key={"client-side-rendering"} />]} />
        </div>
      ),
    },
    {
      label: "Code",
      content: <BoxCode>{codeString}</BoxCode>,
    },
  ];
  return <Tabs tabs={tabsData} />;
};

export default GetList;

export const getStaticProps = (async () => {
  // Fetch data from external API
  const res = await fetch(config.apiUrlServer + "/lists");
  const data = await res.json();
  // Pass data to the page via props
  return { props: { data: data }, revalidate: 61 };
}) satisfies GetServerSideProps<{ data: ProductCardType[] }>;

GetList.getLayout = function getLayout(page: any) {
  return <GetStaticPropsLayout>{page}</GetStaticPropsLayout>;
};

const codeString = `
import config from "@/helpers/config";
import ProductCard from "@/components/ProductCard";

const GetList = ({ data }: { data: ProductCardType[] }) => {

  <div className="flex flex-wrap gap-4 ">
  {data.map((item, index) => (
    <ProductCard key={index} data={item} productId={item.id} />
  ))}
}



export const getStaticProps = (async () => {
  // Fetch data from external API
  const res = await fetch(config.apiUrlServer + "/lists");
  const data = await res.json();
  // Pass data to the page via props
  return { props: { data: data }, revalidate: 61 };
}) satisfies GetServerSideProps<{ data: ProductCardType[] }>;

GetList.getLayout = function getLayout(page: any) {
  return <GetStaticPropsLayout>{page}</GetStaticPropsLayout>;
};



// pages/api/revalidate.ts

import config from "@/helpers/config";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Check for secret to confirm this is a valid request
    if (req.query.secret !== config.tokenRevalidate) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // This should be the actual path, not a rewritten path
    // e.g., for "/blog/[slug]" this should be "/blog/post-1"
    await res.revalidate(req.body.url);
    return res.json({ revalidated: true });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    console.log(err);
    return res.status(500).send("Error revalidating" + err);
  }
}

  `;
