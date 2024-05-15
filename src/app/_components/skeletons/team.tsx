import React from "react";
import { Skeleton } from "~/components/ui/skeleton";

const TeamSkeleton = () => {
  return (
    <div>
      <Skeleton className="mb-6 h-[25px] w-[250px]" />
      <div className="grid grid-cols-3 gap-12">
        <Skeleton className="h-[200px] w-full" />
        <Skeleton className="h-[200px] w-full" />
        <Skeleton className="h-[200px] w-full" />
        <Skeleton className="h-[200px] w-full" />
        <Skeleton className="h-[200px] w-full" />
        <Skeleton className="h-[200px] w-full" />
      </div>
    </div>
  );
};

export default TeamSkeleton;
