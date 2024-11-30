import React from "react";
import { Badge } from "../ui/badge";
import Image from "next/image";
import logo from "../../assets/images/vault-logo.svg";
import dashboardImage from "../../assets/images/twill-dashboard-preview.jpg";
import { Button } from "../ui/button";
import MaxWidthWrapper from "../shared/MaxWidthWrapper";

const Hero = () => {
  return (
    <MaxWidthWrapper className="mt-44 relative">
      <div className="max-w-7xl items-center justify-center flex flex-col ">
        {/* badge */}
        <Badge
          variant={"outline"}
          className="mb-6 flex gap-1 items-center py-2 animate-pulse w-fit"
        >
          <Image src={logo} alt="image logo" height={20} width={20} />
          Vault is now public!
        </Badge>
        <h1 className="text-4xl sm:text-7xl text-center font-extrabold max-w-5xl -tracking-[0.075em]">
          Stop{" "}
          <span className="bg-gradient-to-r from-black via-blue-500 to-blue-800 bg-clip-text text-transparent">
            scrolling.
          </span>{" "}
          Start{" "}
          <span className="bg-gradient-to-r from-black via-cyan-700 to-cyan-800 bg-clip-text text-transparent">
            reading.
          </span>
        </h1>
        {/* subtext */}
        <h2 className="mt-7 text-center text-base sm:text-xl text-gray-700">
          Your library, your rules. Organize your reads, track your progress,
          and discover titles that resonate—all in one powerful platform.
        </h2>

        {/* CTA */}
        <Button className="text-sm mt-6">Start Curating Now 📚</Button>
        <svg
          className="w-16 h-16 text-blue-600  rotate-180 z-50 mt-3"
          viewBox="0 0 77 85"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.33755 84.3973C0.297616 62.7119 2.93494 39.8181 19.4192 23.8736C28.2211 15.3599 42.4944 12.5723 47.6281 26.2359C51.1245 35.5419 51.542 51.9945 41.0605 57.0865C29.486 62.7095 40.2945 35.2221 41.9942 32.4952C49.9497 19.7313 59.7772 11.6122 72.2699 3.78281C76.9496 0.849879 73.7108 0.477284 70.0947 1.13476C66.9572 1.7052 63.4035 2.43717 60.5291 3.81975C59.6524 4.24143 65.7349 2.73236 66.6827 2.44768C70.7471 1.22705 75.4874 -0.0219285 75.9527 5.60812C76.0274 6.5127 75.9956 14.9844 74.7481 15.2963C74.099 15.4586 71.0438 10.27 70.4642 9.65288C66.6996 5.64506 63.5835 4.42393 58.2726 5.11792"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>

        {/* dashboard image */}
        <div className="mt-10 z-20">
          <Image
            src={dashboardImage}
            alt="dashboard"
            width={1200}
            height={800}
            className=" border  rounded-2xl  "
          />
        </div>
        <div className="w-full h-[300px] blur-[80px] bg-gradient-to-r from-blue-400 to-cyan-400 absolute bottom-0 transform-gpu" />
      </div>
    </MaxWidthWrapper>
  );
};

export default Hero;
