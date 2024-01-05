import BlogCode from "@/components/BlogCode";
import BreadCrump from "@/components/BreadCrump";
import ProductCard from "@/components/ProductCard";
import Tabs from "@/components/Tabs";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const DetailsPage = () => {
  const tabsData = [
    {
      label: "Code",
      content: <BlogCode syntax="jsx"  >{codeString}</BlogCode>,
    },
    { label: "Components", content: <FetchByUsEffect /> },
  ];

  return <Tabs tabs={tabsData} />;
};

export default DetailsPage;

const FetchByUsEffect = () => {
  const [data, setData] = useState<ProductCardType>();
  const [isLoading, setLoading] = useState(true);
  const { query } = useRouter();
  useEffect(() => {
    fetch("/api/list/" + query.id)
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
      <ProductCard data={data} isDetails />
    </div>
  );
};
const codeString = `const FetchByUsEffect = () => {
    const [data, setData] = useState<ProductCardType>();
    const [isLoading, setLoading] = useState(true);
    const { query } = useRouter();
    useEffect(() => {
      fetch("/api/list/" + query.id)
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
        <ProductCard data={data} isDetails />
      </div>
    );
  };`;

DetailsPage.getLayout = function getLayout(page: any) {
  return (
    <div>
      <BreadCrump />
      <main className="container mx-auto my-10">{page}</main>
    </div>
  );
};
