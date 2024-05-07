import React from "react";
import Footer from "../_components/footer";
import BrandedSimpleHeader from "../_components/brandedSimpleHeader";

const CreateOrgLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex min-h-screen flex-col justify-between">
        <BrandedSimpleHeader />
        {children}
        <div className="w-full"></div>
        <Footer />
      </div>
    </div>
  );
};

export default CreateOrgLayout;
