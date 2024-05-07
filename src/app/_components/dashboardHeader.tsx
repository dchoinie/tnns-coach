"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { Input } from "~/components/ui/input";
import { DotIcon, Search } from "lucide-react";
import BreadcrumbComponent from "./breadcrumb";

const DashboardHeader = () => {
  const pathname = usePathname();

  return (
    <div className="mb-12 flex justify-between">
      <div className="self-center">
        <BreadcrumbComponent pathname={pathname} />
      </div>
      <OrganizationSwitcher>
        <OrganizationSwitcher.OrganizationProfileLink
          label="Homepage"
          url="/"
          labelIcon={<DotIcon />}
        />
      </OrganizationSwitcher>
      <div className="flex gap-6">
        {/* search */}
        <div className="relative ml-auto flex-1 md:grow-0">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
          />
        </div>
        {/* profile */}
        <UserButton showName />
      </div>
    </div>
  );
};

export default DashboardHeader;
