import BoxTranslate from "@/components/BoxTranslate";
import BreadCrump from "@/components/BreadCrump";
import Image from "next/image";

export default function pagesRoute() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-40">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <BreadCrump />
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By <Image src="/vercel.svg" alt="Vercel Logo" className="dark:invert" width={100} height={24} priority />
          </a>
        </div>
      </div>

      <div className="relative flex gap-5   place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        <h2 className="text-4xl">pages Route</h2>
        {" - "}
        <h2 className="text-2xl">Data Fetching</h2>
      </div>

      <div className="mb-32 flex justify-evenly gap-4  lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <BoxTranslate href="/pagesRoute/clientSide" title="client Side">
          Client-side data fetching is useful when your page doesnt require SEO indexing, when you dont need to pre-render your data, or when the content of
          your pages needs to update frequently. Unlike the server-side rendering APIs, you can use client-side data fetching at the component level.
        </BoxTranslate>
        <BoxTranslate href="/pagesRoute/getServerSideProps" title="getServerSideProps">
          Function that can be used to fetch data and render the contents of a page at request time .
        </BoxTranslate>
        <BoxTranslate href="/pagesRoute/getStaticProps" title="getStaticProps">
          Next.js preempts this page at build time using the getStaticProps function.
        </BoxTranslate>
        <BoxTranslate href="/pagesRoute/dynamicRoutes" title="dynamic Routes">
          For each of the before sections, we have different ways of data-fetching for dynamic Routes, which we will mention in this section.
        </BoxTranslate>
      </div>
    </main>
  );
}
