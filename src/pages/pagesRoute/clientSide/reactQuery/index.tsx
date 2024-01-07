import ComingSoon from "@/components/ComingSoon";
import UseEffectLayout from "@/components/Layout/useEffectLayout";

const ReactQueryComponent = () => {
  return <ComingSoon />;
};

export default ReactQueryComponent;

ReactQueryComponent.getLayout = function getLayout(page: any) {
  return <UseEffectLayout>{page}</UseEffectLayout>;
};
