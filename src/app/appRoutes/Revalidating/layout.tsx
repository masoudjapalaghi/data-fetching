import Layout from "@/components/Layout";
import React from "react";

const CachingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Layout
      disableBreadCrump
      navItem={[
        {
          href: "/appRoutes/Revalidating",
          label: "Revalidating",
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

export default CachingLayout;
