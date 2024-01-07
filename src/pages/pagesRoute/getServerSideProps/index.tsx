import BoxTranslate from "@/components/BoxTranslate";
import GetServerSidePropsLayout from "@/components/Layout/GetServerSidePropsLayout";
import Slider from "@/components/Slider";
import React from "react";

const GetServerSidePropsComponents = () => {
  return (
    <div>
      <main>
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-bold">client Side :</h2>
          <BoxTranslate>
            getServerSideProps is a Next.js function that can be used to fetch data and render the contents of a page at request time.
          </BoxTranslate>
        </div>
        <Slider
          list={[<img src="/img/client-side-rendering.png" alt="csr" key={"client-side-rendering"} />, <img src="/img/csr.jpeg" alt="csr" key={"csr"} />]}
        />
      </main>
    </div>
  );
};

export default GetServerSidePropsComponents;

GetServerSidePropsComponents.getLayout = function getLayout(page: any) {
  return <GetServerSidePropsLayout>{page}</GetServerSidePropsLayout>;
};
