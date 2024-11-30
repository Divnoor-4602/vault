import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Image from "next/image";
import logo from "../../assets/images/vault-logo.svg";
import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";

const Navbar = () => {
  return (
    <MaxWidthWrapper className="">
      <nav className="flex flex-row justify-between items-center z-50 sticky py-4 border-b  border-gray-100">
        {/* logo header */}
        <Link className="flex items-center gap-1" href={"/"}>
          <Image alt="logo" src={logo} height={40} width={40} />
          <p className="font-bold">Vault</p>
        </Link>

        {/* menu items */}
        <SignedIn></SignedIn>
        <SignedOut>
          <div className="flex items-center gap-2">
            <SignInButton>
              <Button variant={"ghost"} className="font-medium">
                Sign In
              </Button>
            </SignInButton>
            <SignUpButton>
              <Button variant="ghost" className="font-medium">
                Sign Up
              </Button>
            </SignUpButton>
            {/* get started button */}
            <Link
              href={"/dashboard"}
              className={`${buttonVariants({})} items-center flex gap-1`}
            >
              📚 Get started
            </Link>
          </div>
        </SignedOut>
      </nav>
    </MaxWidthWrapper>
  );
};

export default Navbar;
