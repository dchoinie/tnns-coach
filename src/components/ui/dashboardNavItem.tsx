import React from "react";
import { Button } from "./button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { type NavItemType } from "~/app/_components/dashboardNav";

const dashboardNavItem = ({ icon, text, path, current }: NavItemType) => (
  <Button
    variant="ghost"
    className="mb-8 flex self-start text-lg text-gray-100 last:mb-0"
  >
    <FontAwesomeIcon icon={icon} className="mr-3 self-center" />
    <span>{text}</span>
  </Button>
);

export default dashboardNavItem;
