import GetRecommendationsbutton from "@/components/shared/GetRecommendationsbutton";
import Interests from "@/components/shared/Interests";
import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";
import { searchBooks } from "@/lib/actions/books.action";

import { auth } from "@clerk/nextjs/server";

import React from "react";

const Page = async () => {
  // get the user interest books
  const { userId } = await auth();

  console.log(userId);

  const interestingBooks = await searchBooks({
    type: "interests",
  });

  console.log(interestingBooks);

  return (
    <>
      <MaxWidthWrapper>
        <main>
          <div className="flex justify-between sm:items-center mt-16 sm:flex-row flex-col-reverse relative">
            <h1 className="text-4xl font-bold  tracking-tighter">Dashboard</h1>
            <GetRecommendationsbutton />
          </div>

          <h2 className="mt-16 text-3xl font-bold tracking-tighter">
            Based on your interests 🤖
          </h2>
          <Interests />
        </main>
      </MaxWidthWrapper>
    </>
  );
};

export default Page;
