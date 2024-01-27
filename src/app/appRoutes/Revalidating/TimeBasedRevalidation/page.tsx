import BoxCode from "@/components/BoxCode";
import BoxTranslate from "@/components/BoxTranslate";
import ProductCard from "@/components/ProductCard";
import Slider from "@/components/Slider";
import Tabs from "@/components/Tabs";
import config from "@/helpers/config";
import React from "react";

async function getData(): Promise<ProductCardType[]> {
  const res = await fetch(config.apiUrlServer + "lists/", { next: { revalidate: 61 } });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const TimeBasedRevalidation = async () => {
  const data = await getData();

  const tabsData = [
    {
      label: "Components",
      content: (
        <div className="flex flex-wrap gap-4 ">
          {data.map((item, index) => (
            <ProductCard key={index} data={item} productId={item.id} />
          ))}
        </div>
      ),
    },
    {
      label: "Concept",
      content: (
        <div>
          <main>
            <div className="flex flex-col gap-4">
              <h2 className="text-lg font-bold">Time-based Revalidation :</h2>
              <BoxTranslate>
                {`
            To revalidate data at a timed interval, you can use the next.revalidate option of fetch to set the cache lifetime of a resource (in seconds).
            `}
              </BoxTranslate>
              <BoxCode>
                {`
async function getData(): Promise<ProductCardType[]> {
  const res = await fetch(config.apiUrlServer + "lists/", { next: { revalidate: 61 } });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
            `}
              </BoxCode>
              <BoxTranslate>
                {`
              If you have multiple fetch requests in a statically rendered route, and each has a different revalidation frequency. The lowest time will be used for all requests. For dynamically rendered routes, each fetch request will be revalidated independently.
              `}
              </BoxTranslate>
              <BoxTranslate>
                {`
              -The first time a fetch request with revalidate is called, the data will be fetched from the external data source and stored in the Data Cache.
              -Any requests that are called within the specified timeframe (e.g. 60-seconds) will return the cached data.
              -After the timeframe, the next request will still return the cached (now stale) data.
                  ----Next.js will trigger a revalidation of the data in the background.
                  ----Once the data is fetched successfully, Next.js will update the Data Cache with the fresh data.
                  ----If the background revalidation fails, the previous data will be kept unaltered.
              `}
              </BoxTranslate>
              <Slider list={[<img src="/img/time-based-revalidation.avif" alt="time-based-revalidation.avif" key={"time-based-revalidation"} />]} />
            </div>
          </main>
        </div>
      ),
    },
    {
      label: "Code",
      content: <BoxCode syntax="jsx">{codeString}</BoxCode>,
    },
  ];
  return <Tabs tabs={tabsData} />;
};

export default TimeBasedRevalidation;

const codeString = `
import ProductCard from "@/components/ProductCard";
import config from "@/helpers/config";
import React from "react";

async function getData(): Promise<ProductCardType[]> {
  const res = await fetch(config.apiUrlServer + "lists/", { next: { revalidate: 61 } });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();


  const TimeBasedRevalidation = async () => {
    const data = await getData();
    
    return(
      <div className="flex flex-wrap gap-4 ">
      {data.map((item, index) => (
        <ProductCard key={index} data={item} productId={item.id} />
      ))}
      </div>
    )
  }  
}
`;
