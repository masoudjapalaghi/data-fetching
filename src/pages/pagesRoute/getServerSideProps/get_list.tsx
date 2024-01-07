import BoxCode from "@/components/BoxCode";
import UseEffectLayout from "@/components/Layout/useEffectLayout";
import ProductCard from "@/components/ProductCard";
import Tabs from "@/components/Tabs";
import Link from "next/link";

import type { InferGetServerSidePropsType, GetServerSideProps } from "next";

const GetList = () => {
  const tabsData = [
    { label: "Components", content: <></> },
    {
      label: "Code",
      content: <BoxCode syntax="jsx">{codeString}</BoxCode>,
    },
  ];

  return <Tabs tabs={tabsData} />;
};

export default GetList;

const FetchByUsEffect = ({ data }) => {
  console.log(data);

  return (
    <div className="flex flex-wrap gap-4 ">
      {/* {data.map((item, index) => (
        <Link href={pathname + "/" + item.id} key={index}>
          <ProductCard data={item} />
        </Link>
      ))} */}
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

GetList.getLayout = function getLayout(page: any) {
  return <UseEffectLayout>{page}</UseEffectLayout>;
};
export const getServerSideProps = (async () => {
  // Fetch data from external API
  const res = await fetch("http://localhost:3000/api/list");
  const data = await res.json();
  console.log(data);
  // Pass data to the page via props
  return { props: { data } };
}) satisfies GetServerSideProps<{ data: ProductCardType[] }>;
