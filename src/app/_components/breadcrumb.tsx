import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import Link from "next/link";

const BreadcrumbComponent = ({ pathname }: { pathname: string }) => {
  const paths = pathname.split("/").filter((path) => path !== "");
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {paths.map((path: string, i: number) => (
          <BreadcrumbItem key={`${i}.${path}`}>
            <BreadcrumbLink>
              <Link className="capitalize" href={path}>
                {path}
              </Link>
            </BreadcrumbLink>
            <BreadcrumbSeparator />
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbComponent;
