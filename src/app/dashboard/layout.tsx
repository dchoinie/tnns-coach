import React, { type ReactNode } from "react";
import Image from "next/image";
import DashboardHeader from "../_components/dashboardHeader";
import Logo from "public/logo/fulllogo_transparent_nobuffer.png";

const dashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-1/6 flex-col border-r bg-background sm:flex">
        {/* Side Menu */}
        <Image
          src={Logo}
          alt="TNNS Coach Logo"
          width={90}
          className="ml-6 mt-6"
        />
        {/* 
        Home
        Users
        Teams
        Players
        Matches
        Individual Matches 
        */}
      </aside>
      <div className="fixed right-0 w-5/6 p-6">
        <DashboardHeader />
        {children}
      </div>
    </div>
  );
};

export default dashboardLayout;
