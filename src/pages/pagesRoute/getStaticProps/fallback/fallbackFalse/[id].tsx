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
      label: "Concept",
      content: (
        <div className="flex flex-col gap-4 ">
          <BoxTranslate title="fallBack is false">
            {`
              If fallback is (false), then any paths not returned by getStaticPaths will result in a 404 page.

              When (next build) is run, Next.js will check if getStaticPaths returned (fallback: false), it will then build only the paths returned by getStaticPaths. This option is useful if you have a small number of paths to create, or new page data is not added often. If you find that you need to add more paths, and you have (fallback: false), you will need to run next build again so that the new paths can be generated.
            `}
          </BoxTranslate>
        </div>
      ),
    },
    {
      label: "Components",
      content: <ProductCard data={data} isDetails />,
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
