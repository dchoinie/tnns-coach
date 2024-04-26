import React from "react";
import Image from "next/image";
import WhiteLogo from "public/logo/white_transparent.png";
import DashboardNavItem from "../../components/ui/dashboardNavItem";
import {
  type IconDefinition,
  faHome,
  faUsers,
  faUser,
  faCalendar,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { UserButton } from "@clerk/nextjs";

export interface NavItemType {
  icon: IconDefinition;
  text: string;
  path: string;
  current: boolean;
}

const navItems: NavItemType[] = [
  {
    icon: faHome,
    text: "Dashboard",
    path: "/dashboard",
    current: false,
  },
  {
    icon: faUsers,
    text: "Matches",
    path: "/matches",
    current: false,
  },
  {
    icon: faUser,
    text: "Players",
    path: "/players",
    current: false,
  },
  {
    icon: faCalendar,
    text: "Events",
    path: "/events",
    current: false,
  },
  {
    icon: faEnvelope,
    text: "Email",
    path: "/email",
    current: false,
  },
];

const dashboardNav = () => {
  return (
    <div className="flex justify-between">
      <div className="w-1/6 bg-green-500 p-6">
        <div className="flex flex-col">
          <Image
            src={WhiteLogo}
            alt="TNNS Coach white logo"
            height={45}
            className="mb-12"
          />
          {navItems.map((item: NavItemType, i: number) => (
            <DashboardNavItem
              key={`${i} - ${item.text}`}
              icon={item.icon}
              text={item.text}
              path={item.path}
              current={item.current}
            />
          ))}
        </div>
      </div>
      <div className="flex self-start py-4 pr-10">
        <UserButton />
      </div>
    </div>
  );
};

export default dashboardNav;
