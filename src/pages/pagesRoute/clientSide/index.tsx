import BreadCrump from "@/components/BreadCrump";
import Link from "next/link";
import React from "react";

const ClientSide = () => {
  return (
    <div>
      <main>
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-bold">client Side :</h2>
          <div className="box">
            If done at the page level, the data is fetched at runtime, and the
            content of the page is updated as the data changes. When used at the
            component level, the data is fetched at the time of the component
            mount, and the content of the component is updated as the data
            changes.
          </div>
          <div className="box">
            Its important to note that using client-side data fetching can
            affect the performance of your application and the load speed of
            your pages. This is because the data fetching is done at the time of
            the component or pages mount, and the data is not cached.
            Client-side data fetching with useEffect
          </div>
        </div>
      </main>
    </div>
  );
};

export default ClientSide;

ClientSide.getLayout = function getLayout(page: any) {
  return (
    <div>
      <header className="border-b-2 p-4 flex gap-4">
        <Link href="/pagesRoute/clientSide/useEffect">UseEffect</Link>
        {` | `}
        <Link href="/pagesRoute/clientSide/swr">Swr</Link>
        {` | `}
        <Link href="/pagesRoute/clientSide/reactQuery">React Query</Link>
      </header>
      <BreadCrump />
      <main className="container mx-auto my-20">{page}</main>
    </div>
  );
};
