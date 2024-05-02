import React from "react";
import Footer from "../_components/footer";
import BrandedSimpleHeader from "../_components/brandedSimpleHeader";

const CreateOrgLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <BrandedSimpleHeader />
      {children}
      <div className="absolute bottom-0 w-full">
        <Footer />
      </div>
    </div>
  );
};

export default CreateOrgLayout;
