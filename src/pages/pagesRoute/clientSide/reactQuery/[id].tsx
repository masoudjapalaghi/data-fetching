import BreadCrump from "@/components/BreadCrump";
import ComingSoon from "@/components/ComingSoon";
import React from "react";

const Details = () => {
  return <ComingSoon />;
};

export default Details;
Details.getLayout = function getLayout(page: any) {
  return (
    <div>
      <BreadCrump />
      <main className="container mx-auto my-10">{page}</main>
    </div>
  );
};
