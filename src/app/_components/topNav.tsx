import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import React from "react";

const topNav = () => {
  return (
    <div>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
};

export default topNav;
