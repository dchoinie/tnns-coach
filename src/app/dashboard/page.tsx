"use client";

import { useOrganizationList, useOrganization, useUser } from "@clerk/nextjs";

const DashboardPage = () => {
  const user = useUser();
  console.log(user);

  return <div></div>;
};

export default DashboardPage;
