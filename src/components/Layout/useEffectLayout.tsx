import React, { ReactNode } from "react";
import Layout from ".";

const UseEffectLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Layout
      navItem={[
        { href: "/pagesRoute/clientSide/useEffect", label: "UseEffect" },
        { href: "/pagesRoute/clientSide/swr", label: "Swr" },
        { href: "/pagesRoute/clientSide/reactQuery", label: "React Query" },
      ]}
    >
      {children}
    </Layout>
  );
};

export default UseEffectLayout;
