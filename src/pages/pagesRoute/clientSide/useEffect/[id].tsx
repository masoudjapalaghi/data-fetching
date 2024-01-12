import BoxCode from "@/components/BoxCode";
import UseEffectLayout from "@/components/Layout/useEffectLayout";
import ProductCard from "@/components/ProductCard";
import Tabs from "@/components/Tabs";
import config from "@/helpers/config";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const DetailsPage = () => {
  const tabsData = [
    {
      label: "Code",
      content: <BoxCode syntax="jsx">{codeString}</BoxCode>,
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

  const fetchData = () => {
    setLoading(true);
    fetch(config.apiUrlClient +"lists/" + query.id)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  };


  useEffect(() => {
    fetchData()
  }, []);


  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No profile data</p>;

  return (
    <div className="flex flex-wrap gap-4 ">
      <ProductCard  data={data} reloadAfterChange refetch={fetchData}  isDetails />
    </div>
  );
};
const codeString = `const FetchByUsEffect = () => {
    const [data, setData] = useState<ProductCardType>();
    const [isLoading, setLoading] = useState(true);
    const { query } = useRouter();

    const fetchData = () => {
    setLoading(true);
    fetch(config.apiUrlClient +"lists/" + query.id)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
    };

    useEffect(() => {
      fetchData()
    }, []);
    
    if (isLoading) return <p>Loading...</p>;
    if (!data) return <p>No profile data</p>;
  
    return (
      <div className="flex flex-wrap gap-4 ">
        <ProductCard data={data} refetch={fetchData} isDetails />
      </div>
    );
  };`;

DetailsPage.getLayout = function getLayout(page: any) {
  return <UseEffectLayout>{page}</UseEffectLayout>;
};
