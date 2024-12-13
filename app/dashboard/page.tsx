import GetRecommendationsbutton from "@/components/shared/GetRecommendationsbutton";
import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";
import { auth, clerkClient } from "@clerk/nextjs/server";
import React from "react";

const Page = async () => {
  const { userId } = await auth();
  console.log("current logged in user", userId);

  const client = await clerkClient();

  const user = await client.users.getUser(userId!);

  console.log("user metadata", user.publicMetadata);

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
        </main>
      </MaxWidthWrapper>
    </>
  );
};

export default Page;
