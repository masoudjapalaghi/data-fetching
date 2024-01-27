import ProductCard from "@/components/ProductCard";
import config from "@/helpers/config";
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
