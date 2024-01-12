import BoxTranslate from "@/components/BoxTranslate";
import GetStaticPropsLayout from "@/components/Layout/GetStaticPropsLayout";

const FetchDetails = () => {
  return (
    <div className="flex flex-col gap-4">
      <BoxTranslate>
        {`
        
The fallback property in Next.js controls how a page is displayed when it cannot retrieve its initial data. It accepts three values: "true", "false", and "blocking".

false: The page is not displayed. This is useful if you only want to display the page if the initial data is available.\n
true: The page is displayed with default content. This content can be a blank page, an error message, or anything else.\n
"blocking": The page is not displayed until the initial data is available. This is useful if you want to ensure that users only see the page when the initial data is available.\n
For example, if you have a page that displays a list of products, you could set the fallback property to true and the default content to a message like "No products have been added yet".`}
      </BoxTranslate>
    </div>
  );
};
export default FetchDetails;

FetchDetails.getLayout = function getLayout(page: any) {
  return <GetStaticPropsLayout>{page}</GetStaticPropsLayout>;
};
