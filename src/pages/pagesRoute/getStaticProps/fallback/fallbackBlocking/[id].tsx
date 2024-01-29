import BoxCode from "@/components/BoxCode";
import BoxTranslate from "@/components/BoxTranslate";
import GetStaticPropsLayout from "@/components/Layout/GetStaticPropsLayout";
import ProductCard from "@/components/ProductCard";
import Tabs from "@/components/Tabs";
import config from "@/helpers/config";
import { GetStaticPaths, GetStaticProps } from "next";

const FetchDetails = ({ data }: { data: ProductCardType }) => {

  const tabsData = [
    {
      label: "Components",
      content: <ProductCard data={data} isDetails />,
    },
    {
      label: "Concept",
      content: (
        <div className="flex flex-col gap-4 ">
          <BoxTranslate title="fallBack is blocking">
            {`
            If fallback is 'blocking', new paths not returned by getStaticPaths will wait for the HTML to be generated, identical to SSR (hence why blocking), and then be cached for future requests so it only happens once per path.
            
            getStaticProps will behave as follows:\n

            -The paths returned from getStaticPaths will be rendered to HTML at build time by getStaticProps.\n
            -The paths that have not been generated at build time will not result in a 404 page. Instead, Next.js will SSR on the first request and return the generated HTML.\n
            -When complete, the browser receives the HTML for the generated path. From the user’s perspective, it will transition from "the browser is requesting the page" to "the full page is loaded". There is no flash of loading/fallback state.\n
            -At the same time, Next.js adds this path to the list of pre-rendered pages. Subsequent requests to the same path will serve the generated page, like other pages pre-rendered at build time.
            `}
          </BoxTranslate>
          <BoxTranslate title="Fallback pages">
            {`
            In the “fallback” version of a page:

            -The page’s props will be empty.\n
            -Using the router, you can detect if the fallback is being rendered, router.isFallback will be true.\n
            -When complete, the browser receives the HTML for the generated path. From the user’s perspective, it will transition from "the browser is requesting the page" to "the full page is loaded". There is no flash of loading/fallback state.\n
            -At the same time, Next.js adds this path to the list of pre-rendered pages. Subsequent requests to the same path will serve the generated page, like other pages pre-rendered at build time.
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
    fallback: "blocking", // true or "blocking"
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
import { GetStaticPaths, GetStaticProps } from "next";
import ProductCard from "@/components/ProductCard";

const FetchDetails = ({ data }: { data: ProductCardType }) => {

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
      fallback: "blocking", // true or "blocking"
    };
  }) satisfies GetStaticPaths;
  
  export const getStaticProps = (async (context) => {
    const id = context.params?.id;
    const res = await fetch(config.apiUrlServer + "lists/" + id);
    const data = await res.json();
    return { props: { data }, notFound: data === "Not found" };
  }) satisfies GetStaticProps<{ data: ProductCardType }>;
  `;
