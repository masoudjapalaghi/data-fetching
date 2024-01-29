import BoxCode from "@/components/BoxCode";
import BoxTranslate from "@/components/BoxTranslate";
import GetStaticPropsLayout from "@/components/Layout/GetStaticPropsLayout";
import ProductCard from "@/components/ProductCard";
import Tabs from "@/components/Tabs";
import config from "@/helpers/config";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";

const FetchDetails = ({ data }: { data: ProductCardType }) => {
  const router = useRouter();
  console.log(router.isFallback);
  if (router.isFallback) {
    return <div className="w-dvw h-dvh bg-red-950">Loading...</div>;
  }
  const tabsData = [
    {
      label: "Components",
      content: <ProductCard data={data} isDetails />,
    },
    {
      label: "Concept",
      content: (
        <div className="flex flex-col gap-4 ">
          <BoxTranslate title="fallBack is true">
            {`
               If "fallback is true", then the behavior of getStaticProps changes in the following ways:\n
              -The paths returned from getStaticPaths will be rendered to HTML at build time by getStaticProps.\n
              -The paths that have not been generated at build time will not result in a 404 page. Instead, Next.js will serve a “fallback” version of the page on the first request to such a path. Web crawlers, such as Google, won't be served a "fallback and instead" the path will behave as in "fallback: 'blocking"'.\n
              -When a page with "fallback: true" is navigated to through next/link or next/router (client-side) Next.js will not serve a "fallback and instead" the page will behave as "fallback: 'blocking"'.\n
              -In the background, Next.js will statically generate the requested path HTML and JSON. This includes running getStaticProps.\n
              -When complete, the browser receives the JSON for the generated path. This will be used to automatically render the page with the required props. From the user’s perspective, the page will be swapped from the "fallback page to" the full page.\n
              -At the same time, Next.js adds this path to the list of pre-rendered pages. Subsequent requests to the same path will serve the generated page, like other pages pre-rendered at build time.9\n
            `}
          </BoxTranslate>
          <BoxTranslate title="When is 'fallback: true' useful?">
            {`
              "fallback: true" is useful if your app has a very large number of static pages that depend on data (such as a very large e-commerce site). If you want to pre-render all product pages, the builds would take a very long time.

              Instead, you may statically generate a small subset of pages and use "fallback: true" for the rest. When someone requests a page that is not generated yet, the user will see the page with a loading indicator or skeleton component.
              
              Shortly after, getStaticProps finishes and the page will be rendered with the requested data. From now on, everyone who requests the same page will get the statically pre-rendered page.
              
              This ensures that users always have a fast experience while preserving fast builds and the benefits of Static Generation.
              `}
          </BoxTranslate>
        </div>
      ),
    },
    {
      label: "Code",
      content: <BoxCode syntax="jsx">{codeString}</BoxCode>,
    },
  ];

  return <Tabs tabs={tabsData} />;
};
export default FetchDetails;

export const getStaticPaths = (async () => {
  const res = await fetch(config.apiUrlServer + "/lists");
  const data = await res.json();

  const paths = data.map((item: ProductCardType) => ({
    params: {
      id: item.id,
    },
  }));
  return {
    paths, // See the "paths" section below
    fallback: true, // true or "blocking"
  };
}) satisfies GetStaticPaths;

export const getStaticProps = (async (context) => {
  const id = context.params?.id;
  const res = await fetch(config.apiUrlServer + "lists/" + id);
  const data = await res.json();
  return { props: { data }, notFound: data === "Not found" };
}) satisfies GetStaticProps<{ data: ProductCardType }>;

FetchDetails.getLayout = function getLayout(page: any) {
  return <GetStaticPropsLayout>{page}</GetStaticPropsLayout>;
};
const codeString = `
import { GetServerSideProps } from "next";
import ProductCard from "@/components/ProductCard";
import { useRouter } from "next/router";

const FetchDetails = ({ data }: { data: ProductCardType }) => {

  const router = useRouter();

  if (router.isFallback) {
    return <div className="w-dvw h-dvh bg-red-950">Loading...</div>;
  }

    return <ProductCard data={data} isDetails />;
  };

  export const getStaticPaths = (async () => {
    const res = await fetch(config.apiUrlServer + "/lists");
    const data = await res.json();
  
    const paths = data.map((item: ProductCardType) => ({
      params: {
        id: item.id,
      },
    }));
    return {
      paths, // See the "paths" section below
      fallback: true, // true or "blocking"
    };
  }) satisfies GetStaticPaths;
  
  export const getStaticProps = (async (context) => {
    const id = context.params?.id;
    const res = await fetch(config.apiUrlServer + "lists/" + id);
    const data = await res.json();
    return { props: { data }, notFound: data === "Not found" };
  }) satisfies GetStaticProps<{ data: ProductCardType }>;
  `;
