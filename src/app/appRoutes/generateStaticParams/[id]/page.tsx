import BoxCode from "@/components/BoxCode";
import ProductCard from "@/components/ProductCard";
import Tabs from "@/components/Tabs";
import config from "@/helpers/config";

export async function generateStaticParams() {
  const res = await fetch(config.apiUrlServer + "lists/");
  const posts: ProductCardType[] = await res.json();

  return posts.map((post) => ({
    id: post.id,
  }));
}
async function getData(id: string): Promise<ProductCardType> {
  const res = await fetch(config.apiUrlServer + "lists/" + id);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const Page = async ({ params }: { params: any }) => {
  const data = await getData(params.id);
  const tabsData = [
    {
      label: "Components",
      content: <ProductCard data={data} isDetails />,
    },
    {
      label: "Code",
      content: <BoxCode syntax="jsx">{codeString}</BoxCode>,
    },
  ];

  return <Tabs tabs={tabsData} />;
};
export default Page;
const codeString = `
import ProductCard from "@/components/ProductCard";
import config from "@/helpers/config";

export async function generateStaticParams() {
  const res = await fetch(config.apiUrlServer + "lists/" });
  const posts: ProductCardType[] = await res.json();

  return posts.map((post) => ({
    id: post.id,
  }));
}
async function getData(id: string): Promise<ProductCardType> {
  const res = await fetch(config.apiUrlServer + "lists/" + id);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}


async function getData(id: string): Promise<ProductCardType> {
  const res = await fetch(config.apiUrlServer + "lists/" + id);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
export default async function Page({ params }: { params: { id: string } }) {
  const data = await getData(params.id);
  return <ProductCard data={data} isDetails />;
}

`;
