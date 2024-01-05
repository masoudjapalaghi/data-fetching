import BreadCrump from "@/components/BreadCrump";
import ComingSoon from "@/components/ComingSoon";

const ReactQueryComponent = () => {
  return <ComingSoon/>;
};

export default ReactQueryComponent;

ReactQueryComponent.getLayout = function getLayout(page: any) {
  return (
    <div>
      <BreadCrump />
      <main className="container mx-auto my-10">{page}</main>
    </div>
  );
};
