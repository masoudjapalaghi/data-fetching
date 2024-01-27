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
        {
          href: "/appRoutes/Revalidating/TimeBasedRevalidation",
          label: "Time-based Revalidation",
        },
        {
          href: "/appRoutes/Revalidating/OnDemandRevalidation",
          label: "On-demand Revalidation",
        },
      ]}
    >
      {children}
    </Layout>
  );
};

export default MainLayout;
