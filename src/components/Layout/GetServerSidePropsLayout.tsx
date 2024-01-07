import React, { ReactNode } from "react";
import Layout from ".";

const GetServerSidePropsLayout = ({ children }: { children: ReactNode }) => {
  return <Layout navItem={[{ href: "/pagesRoute/getServerSideProps/get_list", label: "get_list" }]}>{children}</Layout>;
};

export default GetServerSidePropsLayout;
