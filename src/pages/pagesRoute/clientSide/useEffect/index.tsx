import BlogCode from "@/components/BlogCode";
import BreadCrump from "@/components/BreadCrump";
import ProductCard from "@/components/ProductCard";
import Tabs from "@/components/Tabs";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const UseEffectComponent = () => {
  const tabsData = [
    { label: "Components", content: <FetchByUsEffect /> },
    {
      label: "Code",
      content: <BlogCode syntax="jsx"  >{codeString}</BlogCode>,
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
    fetch("/api/list")
      .then((res) => res.json())
      .then((data) => {
        setData(data.data);
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
    fetch("/api/list")
      .then((res) => res.json())
      .then((data) => {
        setData(data.data);
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
  return (
    <div>
      <BreadCrump />
      <main className="container mx-auto my-10">{page}</main>
    </div>
  );
};
