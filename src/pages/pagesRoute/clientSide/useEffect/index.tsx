import BoxCode from "@/components/BoxCode";
import UseEffectLayout from "@/components/Layout/useEffectLayout";
import ProductCard from "@/components/ProductCard";
import Tabs from "@/components/Tabs";
import config from "@/helpers/config";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const UseEffectComponent = () => {
  const tabsData = [
    { label: "Components", content: <FetchByUsEffect /> },
    {
      label: "Code",
      content: <BoxCode syntax="jsx">{codeString}</BoxCode>,
    },
  ];

  return <Tabs tabs={tabsData} />;
};

export default UseEffectComponent;

const FetchByUsEffect = () => {
  const [data, setData] = useState<ProductCardType[]>([]);
  const [isLoading, setLoading] = useState(true);
  const { pathname } = useRouter();
  useEffect(() => {
    fetch(config.apiUrlClient + "lists")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No profile data</p>;

  return (
    <div className="flex flex-wrap gap-4 ">
      {data.map((item, index) => (
        <Link href={pathname + "/" + item.id} key={index}>
          <ProductCard data={item} />
        </Link>
      ))}
    </div>
  );
};
const codeString = `const FetchByUsEffect = () => {
  const [data, setData] = useState<ProductCardType[]>([]);
  const [isLoading, setLoading] = useState(true);
  const { pathname } = useRouter();
  useEffect(() => {
    fetch(config.apiUrlClient + "lists")
      .then((res) => res.json())
      .then((data) => {
          setData(data);
          setLoading(false);
        });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No profile data</p>;

  return (
    <div className="flex flex-wrap gap-4 ">
      {data.map((item, index) => (
        <Link href={pathname + "/" + item.id} key={index}>
          <ProductCard data={item} />
        </Link>
      ))}
    </div>
  );
};`;

UseEffectComponent.getLayout = function getLayout(page: any) {
  return <UseEffectLayout>{page}</UseEffectLayout>;
};
