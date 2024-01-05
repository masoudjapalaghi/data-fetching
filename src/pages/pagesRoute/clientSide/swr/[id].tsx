import BlogCode from "@/components/BlogCode";
import BreadCrump from "@/components/BreadCrump";
import ProductCard from "@/components/ProductCard";
import Tabs from "@/components/Tabs";
import { useRouter } from "next/router";
import useSWR from "swr";

const SwrComponent = () => {
  const tabsData = [
    { label: "Components", content: <FetchBySwr /> },
    {
      label: "Code",
      content: <BlogCode syntax="jsx"  >{codeString}</BlogCode>,
    },
  ];

  return <Tabs tabs={tabsData} />;
};

export default SwrComponent;

const fetcher = async (...args: Parameters<typeof fetch>) => {
  const res = await fetch(...args);
  return res.json();
};

function FetchBySwr() {
  const { query } = useRouter();
  const { data, error } = useSWR<ProductCardType>(
    "/api/list/" + query.id,
    fetcher
  );

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className="flex flex-wrap gap-4 ">
      <ProductCard data={data} isDetails />
    </div>
  );
}
const codeString = `
import useSWR from 'swr'

const fetcher = async (...args: Parameters<typeof fetch>) => {
  const res = await fetch(...args);
  return res.json();
};

function FetchBySwr() {
  const { query } = useRouter();
  const { data, error } = useSWR<ProductCardType>(
    "/api/list/" + query.id,
    fetcher
  );

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className="flex flex-wrap gap-4 ">
      <ProductCard data={data} isDetails />
    </div>
  );
}`;

SwrComponent.getLayout = function getLayout(page: any) {
  return (
    <div>
      <BreadCrump />
      <main className="container mx-auto my-10">{page}</main>
    </div>
  );
};
