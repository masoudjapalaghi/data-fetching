import React, { ReactNode } from "react";
import Layout from ".";

const GetStaticPropsLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Layout
      navItem={[
        { href: "/pagesRoute/getStaticProps/fetch", label: "fetch" },
        { href: "/pagesRoute/getStaticProps/fallback", label: "fallback" },
        { href: "/pagesRoute/getStaticProps/fallback/fallbackFalse", label: "fallback-false" },
        { href: "/pagesRoute/getStaticProps/fallback/fallbackTrue", label: "fallback-true" },
        { href: "/pagesRoute/getStaticProps/fallback/fallbackBlocking", label: "fallback-blocking" },
        { href: "/pagesRoute/getStaticProps/isr", label: "isr" },
        { href: "/pagesRoute/getStaticProps/onDemandRevalidation", label: "On-Demand Revalidation" },
      ]}
    >
      {children}
    </Layout>
  );
};

export default GetStaticPropsLayout;
