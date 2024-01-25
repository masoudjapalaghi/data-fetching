import GetStaticPropsLayout from "@/components/Layout/GetStaticPropsLayout";
import ProductCard from "@/components/ProductCard";
import config from "@/helpers/config";

import type { GetServerSideProps } from "next";
import { useRouter } from "next/router";

const GetList = ({ data }: { data: ProductCardType[] }) => {
  const { pathname } = useRouter();

  return (
    <div className="flex flex-wrap gap-4 ">
      {data.map((item, index) => (
        <ProductCard key={index} data={item} href={pathname + "/" + item.id} />
      ))}
    </div>
  );
};

export default GetList;

export const getStaticProps = (async () => {
  // Fetch data from external API
  const res = await fetch(config.apiUrlServer + "/lists");
  const data = await res.json();
  // Pass data to the page via props
  return { props: { data: data ,revalidate: 61} };
}) satisfies GetServerSideProps<{ data: ProductCardType[] }>;

GetList.getLayout = function getLayout(page: any) {
  return <GetStaticPropsLayout>{page}</GetStaticPropsLayout>;
};
