import BoxCode from "@/components/BoxCode";
import BoxTranslate from "@/components/BoxTranslate";
import GetServerSidePropsLayout from "@/components/Layout/GetServerSidePropsLayout";
import ProductCard from "@/components/ProductCard";
import Tabs from "@/components/Tabs";
import { generateRandomPrice } from "@/helpers/Method";
import config from "@/helpers/config";
import type { GetServerSideProps } from "next";

const GetListByCaching = ({ data }: { data: ProductCardType[] }) => {
  const handleChangePrice = (id: String) => {
    fetch(config.apiUrlClient + "lists/" + id, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "put",
      body: JSON.stringify({ price: generateRandomPrice() }),
    });
  };

  const tabsData = [
    {
      label: "Concept",
      content: (
        <div className="flex flex-col gap-4 ">
          <BoxTranslate>
            You can use caching headers (Cache-Control) inside
            getServerSideProps to cache dynamic responses. For example, using
            stale-while-revalidate.
          </BoxTranslate>
          <BoxCode syntax="js">
            context.res.setHeader("Cache-Control", "public, s-maxage=10,
            stale-while-revalidate=59")
          </BoxCode>
          <BoxTranslate>
            {`
            -This value is considered fresh for ten seconds (s-maxage=10).\n
            -If a request is repeated within the next 10 seconds, the previously\n
             -cached value will still be fresh. If the request is repeated before 59 seconds,
             the cached value will be stale but still render (stale-while-revalidate=59).\n
             -In the background, a revalidation request will be made to populate the cache
             with a fresh value. If you refresh the page, you will see the new value.
            `}
          </BoxTranslate>
        </div>
      ),
    },
    {
      label: "Components",
      content: (
        <div className="flex flex-wrap gap-4 ">
          {data.map((item, index) => (
            <ProductCard
              key={index}
              data={item}
              handleChangePrice={handleChangePrice}
            />
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

export default GetListByCaching;

export const getServerSideProps = (async (context) => {
  // Fetch data from external API
  context.res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );
  const res = await fetch(config.apiUrlServer + "lists");
  const data = await res.json();
  // Pass data to the page via props
  return { props: { data: data } };
}) satisfies GetServerSideProps<{ data: ProductCardType[] }>;

GetListByCaching.getLayout = function getLayout(page: any) {
  return <GetServerSidePropsLayout>{page}</GetServerSidePropsLayout>;
};
const codeString = `
import type { GetServerSideProps } from "next";
import { GetServerSideProps } from "next";
import ProductCard from "@/components/ProductCard";
import { generateRandomPrice } from "@/helpers/Method";
import config from "@/helpers/config";

const GetList = ({ data }: { data: ProductCardType[] }) => {

  const handleChangePrice = (id: String) => {
    fetch("/api/list/" + id, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "put",
      body: JSON.stringify({ price: generateRandomPrice() }),
    });
  };

  return(
          <div className="flex flex-wrap gap-4 ">
          {data.map((item, index) => (
          <ProductCard key={index} data={item} handleChangePrice={handleChangePrice}/>
          ))}
          </div>
      )
  }

export const getServerSideProps = (async (context) => {
  // Fetch data from external API
  context.res.setHeader("Cache-Control", "public, s-maxage=10, stale-while-revalidate=59");
  const res = await fetch(config.apiUrl + "lists");
  const data = await res.json();
  // Pass data to the page via props
  return { props: { data: data.data } };
}) satisfies GetServerSideProps<{ data: ProductCardType[] }>;
`;
