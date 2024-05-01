import React from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "public/logo/fulllogo_transparent_nobuffer.png";

interface Fitem {
  label: string;
  link: string;
}

const fLegal: Fitem[] = [
  {
    label: "Privacy Policy",
    link: "/privacy-policy",
  },
  {
    label: "Terms of Service",
    link: "/terms-of-service",
  },
  {
    label: "Cookie Policy",
    link: "/cookie-policy",
  },
];

const fCompany: Fitem[] = [
  {
    label: "About Us",
    link: "/about",
  },
  {
    label: "Careers",
    link: "/careers",
  },
  {
    label: "Blog",
    link: "/blog",
  },
  {
    label: "Partners",
    link: "/partners",
  },
  {
    label: "Contact Us",
    link: "/contact",
  },
];

const fSupport = [
  {
    label: "Pricing",
    link: "/pricing",
  },
  {
    label: "Docs",
    link: "/docs",
  },
  {
    label: "Guides",
    link: "/guides",
  },
  {
    label: "API Status",
    link: "/api-status",
  },
];

const footerList = (title: string, items: Fitem[]) => {
  return (
    <div className="flex flex-col p-12">
      <h6 className="mb-4 text-gray-800 underline">{title}</h6>
      {items.map((item, index) => (
        <Link key={index} href={item.link} className="mb-3 text-gray-600">
          {item.label}
        </Link>
      ))}
    </div>
  );
};

const MarketingFooter = () => {
  return (
    <>
      <div className="bg-gray-50 p-8">
        <div className="flex">
          <div className="flex w-1/3 flex-col p-12">
            <Image src={Logo} alt="TNNS Coach Logo" width={90} />
          </div>
          <div className="flex w-2/3 justify-end gap-32">
            <div className="">{footerList("Legal", fLegal)}</div>
            <div className="">{footerList("Company", fCompany)}</div>
            <div className="">{footerList("Support", fSupport)}</div>
          </div>
        </div>
      </div>
      <div className="flex justify-center bg-gray-100 py-6">
        <p className="text-sm text-gray-600">
          &copy; {new Date().getFullYear()} TNNS Coach. All rights reserved.
        </p>
      </div>
    </>
  );
};

export default MarketingFooter;
