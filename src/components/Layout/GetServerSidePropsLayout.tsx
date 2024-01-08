import React, { ReactNode } from "react";
import Layout from ".";

const GetServerSidePropsLayout = ({  children }: {  children: ReactNode }) => {
  return (
    <Layout
      navItem={[
        { href: "/pagesRoute/getServerSideProps/fetch", label: "fetch" },
        { href: "/pagesRoute/getServerSideProps/caching", label: "caching" },
      ]}
    >
      {children}
    </Layout>
  );
};

export default GetServerSidePropsLayout;
