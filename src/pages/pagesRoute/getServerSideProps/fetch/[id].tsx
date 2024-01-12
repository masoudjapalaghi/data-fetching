import BoxCode from "@/components/BoxCode";
import GetServerSidePropsLayout from "@/components/Layout/GetServerSidePropsLayout";
import ProductCard from "@/components/ProductCard";
import Tabs from "@/components/Tabs";
import config from "@/helpers/config";
import { GetServerSideProps } from "next";

const FetchDetails = ({ data }: { data: ProductCardType }) => {
  const tabsData = [
    {
      label: "Components",
      content: <ProductCard reloadAfterChange data={data} isDetails />,
    },
    {
      label: "Code",
      content: <BoxCode syntax="jsx">{codeString}</BoxCode>,
    },
  ];

  return <Tabs tabs={tabsData} />;
};
export default FetchDetails;

export const getServerSideProps = (async (context) => {
  // Fetch data from external API
  const id = context.params?.id;
  const res = await fetch(config.apiUrlServer + "lists/" + id);
  const data = await res.json();
  // Pass data to the page via props
  return { props: { data } };
}) satisfies GetServerSideProps<{ data: ProductCardType }>;

FetchDetails.getLayout = function getLayout(page: any) {
  return <GetServerSidePropsLayout>{page}</GetServerSidePropsLayout>;
};
const codeString = `
import { GetServerSideProps } from "next";
import ProductCard from "@/components/ProductCard";

const FetchDetails = ({ data }: { data: ProductCardType }) => {
    return <ProductCard reloadAfterChange data={data} isDetails />;
  };

export const getServerSideProps = (async (context) => {
   // Fetch data from external API
   const id = context.params?.id;
   const res = await fetch(config.apiUrlServer + "lists/" + id);
   const data = await res.json();
   // Pass data to the page via props
   return { props: { data } };
 }) satisfies GetServerSideProps<{ data: ProductCardType }>;
  `;
