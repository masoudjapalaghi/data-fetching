import BoxCode from "@/components/BoxCode";
import BoxTranslate from "@/components/BoxTranslate";
import GetServerSidePropsLayout from "@/components/Layout/GetServerSidePropsLayout";
import ProductCard from "@/components/ProductCard";
import Tabs from "@/components/Tabs";
import config from "@/helpers/config";
import type { GetServerSideProps } from "next";
import { useRouter } from "next/router";

const GetListByCaching = ({ data }: { data: ProductCardType[] }) => {
  const tabsData = [
    {
      label: "Components",
      content: (
        <div className="flex flex-wrap gap-4 ">
          {data.map((item, index) => (
            <ProductCard
              key={index}
              data={item}
              handleChangeName={(id) => {
                console.log(id);
                fetch("/api/list/" + id, {
                  headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                  },
                  method: "put",
                  body: JSON.stringify({title:Math.random()}),
                });
              }}
            />
          ))}
        </div>
      ),
    },
    {
      label: "Concept",
      content: (
        <div className="flex flex-col gap-4 ">
          <BoxTranslate>
            You can use caching headers (Cache-Control) inside getServerSideProps to cache dynamic responses. For example, using stale-while-revalidate.
          </BoxTranslate>
          <BoxCode syntax="js">context.res.setHeader("Cache-Control", "public, s-maxage=10, stale-while-revalidate=59")</BoxCode>
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

export default GetListByCaching;

export const getServerSideProps = (async (context) => {
  // Fetch data from external API
  context.res.setHeader("Cache-Control", "public, s-maxage=10, stale-while-revalidate=59");
  const res = await fetch(config.apiUrl + "/api/list");
  const data = await res.json();
  // Pass data to the page via props
  return { props: { data: data.data } };
}) satisfies GetServerSideProps<{ data: ProductCardType[] }>;

GetListByCaching.getLayout = function getLayout(page: any) {
  return <GetServerSidePropsLayout>{page}</GetServerSidePropsLayout>;
};
const codeString = `
import { GetServerSideProps } from "next";
import ProductCard from "@/components/ProductCard";

const GetList = ({ data }: { data: ProductCardType[] }) => {

return(
        <div className="flex flex-wrap gap-4 ">
        {data.map((item, index) => (
        <ProductCard key={index} data={item}/>
        ))}
        </div>
    )
 }

export const getServerSideProps = (async (context) => {
  // Fetch data from external API
  context.res.setHeader("Cache-Control", "public, s-maxage=10, stale-while-revalidate=59");
  const res = await fetch(config.apiUrl + "/api/list");
  const data = await res.json();
  // Pass data to the page via props
  return { props: { data: data.data } };
}) satisfies GetServerSideProps<{ data: ProductCardType[] }>;
`;
