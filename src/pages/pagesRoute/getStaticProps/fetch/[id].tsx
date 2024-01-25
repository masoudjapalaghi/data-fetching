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
          <BoxTranslate>
            If a page has Dynamic Routes and uses getStaticProps, it needs to define a list of paths to be statically generated. When you export a function called getStaticPaths (Static Site
            Generation) from a page that uses dynamic routes, Next.js will statically pre-render all the paths specified by getStaticPaths.
          </BoxTranslate>
          <BoxTranslate title="When should I use getStaticProps?">
            {`
            You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes and:

            -The data comes from a headless CMS.\n
            -The data comes from a database.\n
            -The data comes from the filesystem\n
            The data can be publicly cached (not user-specific)\n
            -The data can be publicly cached (not user-specific)\n
            -The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.
            `}
          </BoxTranslate>
          <BoxTranslate title="When does getStaticProps run">
            {`
             getStaticPaths will only run during build in production, it will not be called during runtime .\n
             How does getStaticProps run with regards to getStaticPaths:\n
             -getStaticProps runs during next build for any paths returned during build\n
             -getStaticProps runs in the background when using fallback: true\n
             -getStaticProps is called before initial render when using fallback: blocking\n
            `}
          </BoxTranslate>
          <BoxTranslate title="Where can I use getStaticPaths">
            {`
              -getStaticPaths must be used with getStaticProps\n
              -You cannot use getStaticPaths with getServerSideProps\n
              -You can export getStaticPaths from a Dynamic Route that also uses getStaticProps\n
              -You cannot export getStaticPaths from non-page file (e.g. your components folder)\n
              -You must export getStaticPaths as a standalone function, and not a property of the page component\n
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
    fallback: false, // true or "blocking"
  };
}) satisfies GetStaticPaths;

export const getStaticProps = (async (context) => {
  const id = context.params?.id;
  const res = await fetch(config.apiUrlServer + "lists/" + id);
  const data = await res.json();
  return { props: { data } };
}) satisfies GetStaticProps<{ data: ProductCardType }>;

FetchDetails.getLayout = function getLayout(page: any) {
  return <GetStaticPropsLayout>{page}</GetStaticPropsLayout>;
};
const codeString = `
import { GetServerSideProps } from "next";
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
      fallback: false, // true or "blocking"
    };
  }) satisfies GetStaticPaths;
  
  export const getStaticProps = (async (context) => {
    const id = context.params?.id;
    const res = await fetch(config.apiUrlServer + "lists/" + id);
    const data = await res.json();
    return { props: { data } };
  }) satisfies GetStaticProps<{ data: ProductCardType }>;
  `;
