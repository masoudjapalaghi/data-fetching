import BoxCode from "@/components/BoxCode";
import GetStaticPropsLayout from "@/components/Layout/GetStaticPropsLayout";
import ProductCard from "@/components/ProductCard";
import Tabs from "@/components/Tabs";
import config from "@/helpers/config";

import type { GetServerSideProps } from "next";

const GetList = ({ data }: { data: ProductCardType[] }) => {
  const tabsData = [
    {
      label: "Components",
      content: (
        <div className="flex flex-wrap gap-4 ">
          {data.map((item, index) => (
            <ProductCard key={index} data={item} productId={item.id} />
          ))}
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

export default GetList;

export const getStaticProps = (async () => {
  // Fetch data from external API
  const res = await fetch(config.apiUrlServer + "/lists");
  const data = await res.json();
  // Pass data to the page via props
  return { props: { data: data } };
}) satisfies GetServerSideProps<{ data: ProductCardType[] }>;

GetList.getLayout = function getLayout(page: any) {
  return <GetStaticPropsLayout>{page}</GetStaticPropsLayout>;
};
const codeString = `
import { GetServerSideProps } from "next";
import ProductCard from "@/components/ProductCard";
import { useRouter } from "next/router";

const GetList = ({ data }: { data: ProductCardType[] }) => {

const { pathname } = useRouter();

return(
        <div className="flex flex-wrap gap-4 ">
        {data.map((item, index) => (
        <ProductCard key={index} data={item} href={pathname + "/" + item.id} />
        ))}
        </div>
    )
 }
 
 export const getStaticProps = (async () => {
  // Fetch data from external API
  const res = await fetch(config.apiUrlServer + "/lists");
  const data = await res.json();
  // Pass data to the page via props
  return { props: { data: data } };
}) satisfies GetServerSideProps<{ data: ProductCardType[] }>;
 `;
