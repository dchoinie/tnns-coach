import React from "react";
import Footer from "../_components/footer";
import BrandedSimpleHeader from "../_components/brandedSimpleHeader";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const setupProfileLayout = ({ children }: { children: React.ReactNode }) => {
  if (auth().sessionClaims?.metadata.profileComplete === true) {
    redirect("/dashboard");
  }

  return (
    <div>
      <BrandedSimpleHeader />
      {children}
      <Footer />
    </div>
  );
};

export default setupProfileLayout;
