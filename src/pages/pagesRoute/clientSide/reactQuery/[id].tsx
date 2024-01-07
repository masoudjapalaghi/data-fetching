import ComingSoon from "@/components/ComingSoon";
import UseEffectLayout from "@/components/Layout/useEffectLayout";
import React from "react";

const Details = () => {
  return <ComingSoon />;
};

export default Details;
Details.getLayout = function getLayout(page: any) {
  return <UseEffectLayout>{page}</UseEffectLayout>;
};
