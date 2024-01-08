import BoxTranslate from "@/components/BoxTranslate";
import GetServerSidePropsLayout from "@/components/Layout/GetServerSidePropsLayout";
import Slider from "@/components/Slider";
import React from "react";

const GetServerSidePropsComponents = () => {
  return (
    <div>
      <main>
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-bold">Sever Side Rendering :</h2>
          <BoxTranslate>
            getServerSideProps is a Next.js function that can be used to fetch data and render the contents of a page at request time.
          </BoxTranslate>
          <BoxTranslate title="When should I use getServerSideProps?">
            You should use getServerSideProps if you need to render a page that relies on personalized user data, or information that can only be known at
            request time. For example, authorization headers or a geolocation.
          </BoxTranslate>
          <BoxTranslate title="Behavior">{`
            -getServerSideProps runs on the server\n
            -getServerSideProps can only be exported from a page.\n
            -getServerSideProps returns JSON.\n
            -When a user visits a page, getServerSideProps will be used to fetch data at request time, and the data is used to render the initial HTML of the page.\n 
            -props passed to the page component can be viewed on the client as part of the initial HTML. This is to allow the page to be hydrated correctly. Make sure that you don't pass any sensitive information that shouldn't be available on the client in props. \n
            -When a user visits the page through next/link or next/router, Next.js sends an API request to the server, which runs getServerSideProps. \n
            -You do not have to call a Next.js API Route to fetch data when using getServerSideProps since the function runs on the server. Instead, you can call a CMS, database, or other third-party APIs directly from inside getServerSideProps.You do not have to call a Next.js API Route to fetch data when using getServerSideProps since the function runs on the server. Instead, you can call a CMS, database, or other third-party APIs directly from inside getServerSideProps. `}</BoxTranslate>
        </div>
        <Slider
          list={[
            <img src="/img/server-side-rendering-with-data.png" alt="ssr" key={"client-side-rendering"} />,
            <img src="/img/ssr.jpeg" alt="csr" key={"ssr"} />,
          ]}
        />
      </main>
    </div>
  );
};

export default GetServerSidePropsComponents;

GetServerSidePropsComponents.getLayout = function getLayout(page: any) {
  return <GetServerSidePropsLayout>{page}</GetServerSidePropsLayout>;
};
