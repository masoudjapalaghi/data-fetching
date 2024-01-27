import BoxCode from "@/components/BoxCode";
import GetStaticPropsLayout from "@/components/Layout/GetStaticPropsLayout";
import ProductCard from "@/components/ProductCard";
import Tabs from "@/components/Tabs";
import config from "@/helpers/config";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";

const FetchDetails = ({ data }: { data: ProductCardType }) => {
  const { reload } = useRouter();
  const handleRevalidate = () => {
    fetch(`/api/revalidate?secret=ja0824u5tr34h234rt9074er`)
      .then((res) => res.json())
      .then((res) => (res.revalidated ? reload() : null));
  };

  const tabsData = [
    {
      label: "component",
      content: (
        <div className="flex flex-col gap-8">
          <button className="cursor-pointer text-teal-200 border-2 border-teal-200 p-2 rounded-md mr-4 transition-all hover:scale-110" onClick={handleRevalidate}>
            revalidate
          </button>
          <ProductCard data={data} isDetails />
        </div>
      ),
    },
    {
      label: "Code",
      content: <BoxCode>{codeString}</BoxCode>,
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
    fallback: true, // false or "blocking"
  };
}) satisfies GetStaticPaths;

export const getStaticProps = (async (context) => {
  const id = context.params?.id;
  const res = await fetch(config.apiUrlServer + "lists/" + id);
  const data = await res.json();
  return { props: { data }, revalidate: 3600 };
}) satisfies GetStaticProps<{ data: ProductCardType }>;

FetchDetails.getLayout = function getLayout(page: any) {
  return <GetStaticPropsLayout>{page}</GetStaticPropsLayout>;
};
const codeString = `const FetchDetails = ({ data }: { data: ProductCardType }) => {
  const { reload } = useRouter();
  const handleRevalidate = () => {
    fetch("/api/revalidate?secret=ja0824u5tr34h234rt9074er")
      .then((res) => res.json())
      .then((res) => (res.revalidated ? reload() : null));
  };

  return (
    <div className="flex flex-col gap-8">
      <button className="cursor-pointer text-teal-200 border-2 border-teal-200 p-2 rounded-md mr-4 transition-all hover:scale-110" onClick={handleRevalidate}>
        revalidate
      </button>
      <ProductCard data={data} isDetails />
    </div>
  );
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
    fallback: true, // false or "blocking"
  };
}) satisfies GetStaticPaths;

export const getStaticProps = (async (context) => {
  const id = context.params?.id;
  const res = await fetch(config.apiUrlServer + "lists/" + id);
  const data = await res.json();
  return { props: { data } };
}) satisfies GetStaticProps<{ data: ProductCardType }>;
`;
