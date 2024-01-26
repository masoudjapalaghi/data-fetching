import Layout from "@/components/Layout";
import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Layout
      navItem={[
        {
          label: "Caching",
          href: "/appRoutes/Caching",
        },
        {
          label: "Revalidating",
          href: "/appRoutes/Revalidating",
        },
      ]}
    >
      {children}
    </Layout>
  );
};

export default MainLayout;
