import React, { ReactNode } from "react";
import Layout from ".";

const GetServerSidePropsLayout = ({  children }: {  children: ReactNode }) => {
  return (
    <Layout
      navItem={[
        { href: "/pagesRoute/getServerSideProps/fetch", label: "fetch" },
        { href: "/pagesRoute/getServerSideProps/caching", label: "caching" },
        { href: "/pagesRoute/getServerSideProps/caching/caching-sample2", label: "caching-sample2" },
      ]}
    >
      {children}
    </Layout>
  );
};

export default GetServerSidePropsLayout;
