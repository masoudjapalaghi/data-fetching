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
      label: "Concept",
      content: (
        <div className="flex flex-col gap-4">
          <BoxTranslate size={24}>Incremental Static Regeneration</BoxTranslate>
          <BoxTranslate>
            Next.js allows you to create or update static pages after you’ve built your site. Incremental Static Regeneration (ISR) enables you to use static-generation on a per-page basis, without
            needing to rebuild the entire site. With ISR, you can retain the benefits of static while scaling to millions of pages.
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
        </div>
      ),
    },
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
  ];
  return <Tabs tabs={tabsData} />;
};

export default GetList;

export const getStaticProps = (async () => {
  // Fetch data from external API
  const res = await fetch(config.apiUrlServer + "/lists");
  const data = await res.json();
  // Pass data to the page via props
  return { props: { data: data  },revalidate: 61 };
}) satisfies GetServerSideProps<{ data: ProductCardType[] }>;

GetList.getLayout = function getLayout(page: any) {
  return <GetStaticPropsLayout>{page}</GetStaticPropsLayout>;
};
