import BoxCode from "@/components/BoxCode";
import UseEffectLayout from "@/components/Layout/useEffectLayout";
import ProductCard from "@/components/ProductCard";
import Tabs from "@/components/Tabs";
import config from "@/helpers/config";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";

const SwrComponent = () => {
  const tabsData = [
    { label: "Components", content: <FetchBySwr /> },
    {
      label: "Code",
      content: <BoxCode syntax="jsx">{codeString}</BoxCode>,
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
  const { pathname } = useRouter();
  const { data, error,mutate } = useSWR< ProductCardType[] >(config.apiUrlClient +"lists", fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className="flex flex-wrap gap-4 ">
      {data?.map((item, index) => (
        <Link prefetch={false} href={item.id} key={index}>
          <ProductCard  data={item}  reloadAfterChange refetch={mutate}/>
        </Link>
      ))}
    </div>
  );
}
const codeString = `
import useSWR from 'swr'
import config from "@/helpers/config";

const fetcher = async (...args: Parameters<typeof fetch>) => {
  const res = await fetch(...args);
  return res.json();
};

function FetchBySwr() {
  const { pathname } = useRouter();
  const { data, error,mutate } = useSWR< ProductCardType[] >(
    config.apiUrlClient +"lists",
    fetcher
  );

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className="flex flex-wrap gap-4 ">
      {data?.map((item, index) => (
        <Link prefetch={false} href={pathname + "/" + item.id} key={index}>
          <ProductCard  data={item} reloadAfterChange refetch={mutate} />
        </Link>
      ))}
    </div>
  );
}`;

SwrComponent.getLayout = function getLayout(page: any) {
  return <UseEffectLayout>{page}</UseEffectLayout>;
};
