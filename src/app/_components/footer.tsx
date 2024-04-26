import React from "react";

const footer = () => {
  return (
    <div className="flex w-full justify-center bg-gray-50 px-10 py-4">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} TNNS Coach, All Rights Reserved
      </p>
    </div>
  );
};

export default footer;
