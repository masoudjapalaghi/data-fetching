import BoxCode from "@/components/BoxCode";
import BoxTranslate from "@/components/BoxTranslate";
import Slider from "@/components/Slider";
import React from "react";

const Revalidating = () => {
  return (
    <div>
      <main>
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-bold">Revalidating :</h2>
          <BoxTranslate>
            {`
                Revalidation is the process of purging the Data Cache and re-fetching the latest data. This is useful when your data changes and you want to ensure you show the latest information.          `}
          </BoxTranslate>
          <BoxTranslate title="Cached data can be revalidated in two ways:">
            {`
           -Time-based revalidation: Automatically revalidate data after a certain amount of time has passed. This is useful for data that changes infrequently and freshness is not as critical.
           
           -On-demand revalidation: Manually revalidate data based on an event (e.g. form submission). On-demand revalidation can use a tag-based or path-based approach to revalidate groups of data at once. This is useful when you want to ensure the latest data is shown as soon as possible (e.g. when content from your headless CMS is updated).
          `}
          </BoxTranslate>
        </div>
      </main>
    </div>
  );
};

export default Revalidating;
