import BoxCode from "@/components/BoxCode";
import BoxTranslate from "@/components/BoxTranslate";
import GetStaticPropsLayout from "@/components/Layout/GetStaticPropsLayout";
import ProductCard from "@/components/ProductCard";
import Tabs from "@/components/Tabs";
import config from "@/helpers/config";

import type { GetServerSideProps } from "next";
import { useRouter } from "next/router";

const GetList = ({ data }: { data: ProductCardType[] }) => {
  const { pathname } = useRouter();
  const tabsData = [
    {
      label: "List",
      content: (
        <div className="flex flex-wrap gap-4 ">
          {data.map((item, index) => (
            <ProductCard key={index} data={item} href={pathname + "/" + item.id} />
          ))}
        </div>
      ),
    },
    {
      label: "Concept",
      content: (
        <div className="flex flex-col gap-4">
          <BoxTranslate size={24}>On-Demand Revalidation</BoxTranslate>
          <BoxTranslate>
            {`
         If you set a revalidate time of 60, all visitors will see the same generated version of your site for one minute. The only way to invalidate the cache is from someone visiting that page after the minute has passed.

         Starting with v12.2.0, Next.js supports On-Demand Incremental Static Regeneration to manually purge the Next.js cache for a specific page. This makes it easier to update your site when:
         
         -Content from your headless CMS is created or updated

         -Ecommerce metadata changes (price, description, category, reviews, etc.)

         Inside getStaticProps, you do not need to specify revalidate to use on-demand revalidation. If revalidate is omitted, Next.js will use the default value of false (no revalidation) and only revalidate the page on-demand when revalidate() is called.`}
          </BoxTranslate>
          <BoxTranslate title="Using On-Demand Revalidation">
            First, create a secret token only known by your Next.js app. This secret will be used to prevent unauthorized access to the revalidation API Route. You can access the route (either
            manually or with a webhook) with the following URL structure:
          </BoxTranslate>

          <BoxCode>
            {`
 // in env
 TOKEN_REVALIDATE="IS_TOKEN_FOR_REVALIDATE"
 `}
          </BoxCode>
          <BoxCode>
            {`
 // /api/revalidate
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
    await res.revalidate("/pageRoute/getStaticProps/onDemandRevalidation/[id]");
    return res.json({ revalidated: true });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send("Error revalidating");
  }
} `}
          </BoxCode>
          <BoxTranslate title="Using On-Demand Revalidation">Then we need to call this api to update</BoxTranslate>
          <BoxCode>{`https://<your-site.com>/api/revalidate?secret=IS_TOKEN_FOR_REVALIDATE`}</BoxCode>
          <BoxTranslate>
            {`
                Then we need to call this api to update
                
                Based on the need, we can place it in various places such as:
                
                1-Button in backOffice
                
                2- Along with api put which is called to change the desired product
                
                ...
              `}
          </BoxTranslate>
        </div>
      ),
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
