import GetStaticPropsLayout from "@/components/Layout/GetStaticPropsLayout";
import ProductCard from "@/components/ProductCard";
import config from "@/helpers/config";

import type { GetServerSideProps } from "next";

const GetList = ({ data }: { data: ProductCardType[] }) => {

  return (
    <div className="flex flex-wrap gap-4 ">
      {data.map((item, index) => (
        <ProductCard key={index} data={item} productId={item.id} />
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
  return { props: { data },revalidate: 10 };
}) satisfies GetServerSideProps<{ data: ProductCardType[] }>;

GetList.getLayout = function getLayout(page: any) {
  return <GetStaticPropsLayout>{page}</GetStaticPropsLayout>;
};
