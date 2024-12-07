import GetRecommendationsbutton from "@/components/shared/GetRecommendationsbutton";
import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";

import React from "react";

const Page = () => {
  return (
    <>
      <MaxWidthWrapper>
        <main>
          <div className="flex justify-between sm:items-center mt-16 sm:flex-row flex-col-reverse relative">
            <h1 className="text-4xl font-bold  tracking-tighter">Dashboard</h1>
            <GetRecommendationsbutton />
          </div>
        </main>
      </MaxWidthWrapper>
    </>
  );
};

export default Page;
