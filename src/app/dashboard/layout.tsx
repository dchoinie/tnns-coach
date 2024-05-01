"use client";

import React, { type ReactNode } from "react";
import Image from "next/image";
import { Home, School, Trophy, User } from "lucide-react";
import DashboardHeader from "../_components/dashboardHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPersonChalkboard,
  faPeopleGroup,
} from "@fortawesome/free-solid-svg-icons";
import Logo from "public/logo/fulllogo_transparent_nobuffer.png";
import Link from "next/link";
import Footer from "../_components/footer";
import { usePathname } from "next/navigation";
import clsx from "clsx";

interface AsideMenuItem {
  title: string;
  path: string;
  icon: JSX.Element;
}

const AsideMenuItem = ({ title, icon, path }: AsideMenuItem) => {
  const pathname = usePathname();
  return (
    <Link
      href={path}
      className={clsx(
        "flex cursor-pointer items-center space-x-4 p-4 hover:bg-gray-100",
        pathname === path ? "bg-gray-100" : "",
      )}
    >
      {icon}
      <span>{title}</span>
    </Link>
  );
};

const asideMenu = [
  {
    title: "Home",
    icon: <Home />,
    path: "/dashboard",
  },
  {
    title: "Coaching Staff",
    icon: <FontAwesomeIcon icon={faPersonChalkboard} />,
    path: "/dashboard/coaching-staff",
  },
  {
    title: "Team Management",
    icon: <School />,
    path: "/dashboard/team",
  },
  {
    title: "Player Management",
    icon: <FontAwesomeIcon icon={faPeopleGroup} />,
    path: "/dashboard/players",
  },
  {
    title: "Team Matches",
    icon: <Trophy />,
    path: "/dashboard/team-matches",
  },
  {
    title: "Individual Matches",
    icon: <User />,
    path: "/dashboard/individual-matches",
  },
];

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="flex min-h-screen bg-gray-50">
        <aside className="z-10 hidden w-1/6 flex-col border-r bg-background sm:flex">
          {/* Side Menu */}
          <Image
            src={Logo}
            alt="TNNS Coach Logo"
            width={90}
            className="my-6 ml-4"
          />
          <hr className="border border-gray-100" />
          <div className="mt-8">
            {asideMenu.map((item) => (
              <AsideMenuItem
                key={item.title}
                title={item.title}
                icon={item.icon}
                path={item.path}
              />
            ))}
          </div>
        </aside>
        <div className="flex w-5/6 flex-col p-6">
          <DashboardHeader />
          {children}
        </div>
      </div>
      <Footer dashboard />
    </>
  );
};

export default DashboardLayout;
