import React from "react";
import clsx from "clsx";

interface Props {
  dashboard?: boolean;
}

const footer = ({ dashboard }: Props) => {
  return (
    <div
      className={clsx(
        dashboard ? "bg-white" : " bg-gray-50",
        "flex w-full justify-center px-10 py-4",
      )}
    >
      <p className="text-sm">
        &copy; {new Date().getFullYear()} TNNS Coach, All Rights Reserved
      </p>
    </div>
  );
};

export default footer;
