import BoxCode from "@/components/BoxCode";
import GetServerSidePropsLayout from "@/components/Layout/GetServerSidePropsLayout";
import ProductCard from "@/components/ProductCard";
import Tabs from "@/components/Tabs";
import config from "@/helpers/config";

import type { GetServerSideProps } from "next";
import { useRouter } from "next/router";

const GetList = ({ data }: { data: ProductCardType[] }) => {
  const { pathname } = useRouter();
  const tabsData = [
    {
      label: "Components",
      content: (
        <div className="flex flex-wrap gap-4 ">
          {data.map((item, index) => (
            <ProductCard key={index} data={item} href={pathname + "/" + item.id} />
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


export const getServerSideProps = (async () => {
  // Fetch data from external API
  const res = await fetch(config.apiUrlServer + "/lists");
  const data = await res.json();
  // Pass data to the page via props
  return { props: { data: data } };
}) satisfies GetServerSideProps<{ data: ProductCardType[] }>;

GetList.getLayout = function getLayout(page: any) {
  return <GetServerSidePropsLayout>{page}</GetServerSidePropsLayout>;
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
 
 export const getServerSideProps = (async () => {
  // Fetch data from external API
  const res = await fetch(config.apiUrlServer + "/lists");
  const data = await res.json();
  // Pass data to the page via props
  return { props: { data: data } };
}) satisfies GetServerSideProps<{ data: ProductCardType[] }>;
 `;