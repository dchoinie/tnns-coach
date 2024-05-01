import React from "react";
import Image from "next/image";
import Logo from "public/logo/fulllogo_transparent_nobuffer.png";
import { Button } from "~/components/ui/button";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { LogIn, UserPlus } from "lucide-react";

const MarketingHeader = () => {
  return (
    <div className="fixed top-0 flex w-full justify-between p-8">
      <div className="flex">
        <Image src={Logo} alt="TNNS Coach Logo" width={90} />
      </div>
      <div className="flex"></div>
      <div className="flex gap-6 self-center">
        <SignInButton mode="modal">
          <Button variant="ghost">
            Sign In <LogIn className="ml-2" size={20} />
          </Button>
        </SignInButton>
        <SignUpButton mode="modal">
          <Button variant="default">
            <UserPlus className="mr-2" size={20} /> Sign Up
          </Button>
        </SignUpButton>
      </div>
    </div>
  );
};

export default MarketingHeader;
