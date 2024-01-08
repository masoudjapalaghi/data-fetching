import BoxCode from "@/components/BoxCode";
import GetServerSidePropsLayout from "@/components/Layout/GetServerSidePropsLayout";
import Tabs from "@/components/Tabs";
import type { GetServerSideProps, NextPage } from "next";
type Props = {
  date: string;
};
const Sample = ({ date }: Props) => {
  const tabsData = [
    {
      label: "Components",
      content: <div>This page is generated on {date}</div>,
    },
    {
      label: "Code",
      content: <BoxCode syntax="jsx">{codeString}</BoxCode>,
    },
  ];
  return <Tabs tabs={tabsData} />;
};
export default Sample;
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // add Cache-Control HTTP Header to response
  ctx.res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );
  return {
    props: {
      date: new Date().toISOString(),
    },
  };
};

Sample.getLayout = function getLayout(page: any) {
  return <GetServerSidePropsLayout>{page}</GetServerSidePropsLayout>;
};
const codeString = `
  const Sample2: NextPage<Props> = ({ date }) => {
    return <div>This page is generated on {date}</div>;
  };
  export default Sample2;
  export const getServerSideProps: GetServerSideProps = async (ctx) => {
    // add Cache-Control HTTP Header to response
    ctx.res.setHeader(
      "Cache-Control",
      "public, s-maxage=10, stale-while-revalidate=59"
    );
    return {
      props: {
        date: new Date().toISOString(),
      },
    };
  `;
