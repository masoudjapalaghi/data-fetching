import BoxTranslate from "@/components/BoxTranslate";
import BreadCrump from "@/components/BreadCrump";
import Image from "next/image";

export default function pagesRoute() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-40">
      <div className="relative flex gap-5 my-24   place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        <h2 className="text-4xl">pages Route</h2>
        {" - "}
        <h2 className="text-2xl">Data Fetching</h2>
      </div>

      <div className="mb-32 flex justify-evenly gap-4  lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <BoxTranslate href="/pagesRoute/clientSide" title="client Side">
          Client-side data fetching is useful when your page doesnt require SEO indexing, when you dont need to pre-render your data, or when the content of
          your pages needs to update frequently. Unlike the server-side rendering APIs, you can use client-side data fetching at the component level.
        </BoxTranslate>
        <BoxTranslate href="/pagesRoute/getStaticProps" title="getStaticProps">
          Next.js preempts this page at build time using the getStaticProps function.
        </BoxTranslate>
        <BoxTranslate href="/pagesRoute/getServerSideProps" title="getServerSideProps">
          Function that can be used to fetch data and render the contents of a page at request time .
        </BoxTranslate>
      </div>
    </main>
  );
}
