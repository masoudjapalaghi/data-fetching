import BoxCode from "@/components/BoxCode";
import ProductCard from "@/components/ProductCard";
import Tabs from "@/components/Tabs";
import config from "@/helpers/config";
import React from "react";
import ButtonRevalidate from "../../ButtonRevalidate";
async function getData(): Promise<ProductCardType[]> {
  const res = await fetch(config.apiUrlServer + "lists/");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
const RevalidatePath = async () => {
  const data = await getData();

  const tabsData = [
    {
      label: "Components",
      content: (
        <div className="flex flex-col gap-10">
          <ButtonRevalidate />
          <div className="flex flex-wrap gap-4 ">
            {data.map((item, index) => (
              <ProductCard key={index} data={item} productId={item.id} />
            ))}
          </div>
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

export default RevalidatePath;

const codeString = `
import ProductCard from "@/components/ProductCard";
import config from "@/helpers/config";
import React from "react";

async function getData(): Promise<ProductCardType[]> {
    const res = await fetch(config.apiUrlServer + "lists/" });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();


  const RevalidatePath = async () => {
    const data = await getData();
    
    return(
    <div className="flex flex-col gap-10">
      <ButtonRevalidate/>
      <div className="flex flex-wrap gap-4 ">
      {data.map((item, index) => (
        <ProductCard key={index} data={item} productId={item.id} />
      ))}
      </div>
    </div>  
    )
  }  
}

export default RevalidatePath;


// ButtonRevalidate.tsx
"use client";

import { useRouter } from "next/navigation";

const ButtonRevalidate = () => {
  const { refresh } = useRouter();
  const handleRevalidate = () => {
    fetch("/api/revalidatePath?path=/appRoutes/Revalidating/OnDemandRevalidation/RevalidatePath', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => (res.revalidated ? refresh() : null));
  };
  return (
    <button onClick={handleRevalidate} className="cursor-pointer text-teal-200 border-2 border-teal-200 p-2 rounded-md mr-4 transition-all hover:scale-110" >
      revalidate
    </button>
  );
};

export default ButtonRevalidate;

// api/revalidatePath/route.ts

import { revalidatePath } from 'next/cache'
import { NextRequest } from 'next/server'
 
export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get('path')
 
  if (path) {
    revalidatePath(path)
    return Response.json({ revalidated: true, now: Date.now() })
  }
 
  return Response.json({
    revalidated: false,
    now: Date.now(),
    message: 'Missing path to revalidate',
  })
}
`;
