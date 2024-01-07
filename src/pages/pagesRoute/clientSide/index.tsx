import BoxTranslate from "@/components/BoxTranslate";
import UseEffectLayout from "@/components/Layout/useEffectLayout";
import Slider from "@/components/Slider";
import React from "react";

const ClientSide = () => {
  return (
    <div>
      <main>
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-bold">client Side :</h2>
          <BoxTranslate>
            If done at the page level, the data is fetched at runtime, and the content of the page is updated as the data changes. When used at the component
            level, the data is fetched at the time of the component mount, and the content of the component is updated as the data changes.
          </BoxTranslate>
          <BoxTranslate>
            Its important to note that using client-side data fetching can affect the performance of your application and the load speed of your pages. This is
            because the data fetching is done at the time of the component or pages mount, and the data is not cached. Client-side data fetching with useEffect
          </BoxTranslate>
        </div>
        <Slider
          list={[<img src="/img/client-side-rendering.png" alt="csr" key={"client-side-rendering"} />, <img src="/img/csr.jpeg" alt="csr" key={"csr"} />]}
        />
      </main>
    </div>
  );
};

export default ClientSide;

ClientSide.getLayout = function getLayout(page: any) {
  return <UseEffectLayout>{page}</UseEffectLayout>;
};
