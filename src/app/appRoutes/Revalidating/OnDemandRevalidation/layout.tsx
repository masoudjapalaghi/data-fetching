import Layout from "@/components/Layout";
import React from "react";

const OnDemandRevalidationLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Layout
      disableBreadCrump
      navItem={[
        {
          href: "/appRoutes/Revalidating/OnDemandRevalidation/RevalidateTag",
          label: "RevalidateTag",
        },
        {
          href: "/appRoutes/Revalidating/OnDemandRevalidation/RevalidatePath",
          label: "RevalidatePath",
        },
      ]}
    >
      {children}
    </Layout>
  );
};

export default OnDemandRevalidationLayout;
