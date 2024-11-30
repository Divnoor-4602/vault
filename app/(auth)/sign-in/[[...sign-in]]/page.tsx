import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex mt-40 items-center justify-center ">
      <SignIn path="/sign-in" />
    </div>
  );
}
