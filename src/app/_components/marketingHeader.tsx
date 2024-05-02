"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "public/logo/fulllogo_transparent_nobuffer.png";
import { Button } from "~/components/ui/button";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { ChevronDown, LogIn, UserPlus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

const MarketingHeader = () => {
  return (
    <div className="absolute top-0 flex w-full p-8">
      <div className="flex w-1/6">
        <Image src={Logo} alt="TNNS Coach Logo" width={90} />
      </div>
      <div className="flex w-2/3 justify-center gap-20">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex self-center">
            Features <ChevronDown size={16} className="ml-2 self-center" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Link href="/pricing" className="self-center">
          Pricing
        </Link>
        <Link href="/integrations" className="self-center">
          Integrations
        </Link>
        <Link href="/company" className="self-center">
          Company
        </Link>
      </div>
      <div className="flex w-1/6 gap-6 self-center">
        <SignInButton mode="modal">
          <Button variant="ghost">
            Sign In <LogIn className="ml-2" size={18} />
          </Button>
        </SignInButton>
        <SignUpButton mode="modal">
          <Button variant="brand">
            <UserPlus className="mr-2" size={18} /> Sign Up
          </Button>
        </SignUpButton>
      </div>
    </div>
  );
};

export default MarketingHeader;
