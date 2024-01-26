import BoxCode from "@/components/BoxCode";
import BoxTranslate from "@/components/BoxTranslate";
import React from "react";

const appRoutes = () => {
  return (
    <main className="flex  flex-col items-center">
      <div className="relative flex gap-5 my-10   place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        <h2 className="text-4xl">app Routes</h2>
        {" - "}
        <h2 className="text-2xl">Data Fetching</h2>
      </div>
      <div className="flex justify-between gap-10">
        <BoxCode>{sample}</BoxCode>
        <BoxTranslate title="Good to know:">
            {`
            -Next.js provides helpful functions you may need when fetching data in Server Components such as cookies and headers. These will cause the route to be dynamically rendered as they rely on request time information.
            
            -In Route handlers, fetch requests are not memoized as Route Handlers are not part of the React component tree.
           
            -To use async/await in a Server Component with TypeScript, you'll need to use TypeScript 5.1.3 or higher and @types/react 18.2.8 or higher.
            `}
        </BoxTranslate>
      </div>
    </main>
  );
};

export default appRoutes;

const sample = `
async function getData() {
  const res = await fetch('https://api.example.com/...')
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
 
  if (!res.ok) {
    // This will activate the closest 'error.js' Error Boundary
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}
 
export default async function Page() {
  const data = await getData()
 
  return <main></main>
}
`;
