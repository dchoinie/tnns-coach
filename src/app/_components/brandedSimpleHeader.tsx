import React from "react";
import Image from "next/image";
import Logo from "../../../public/logo/fulllogo_transparent_nobuffer.png";

const brandedSimpleHeader = () => {
  return (
    <div className="flex justify-center bg-gray-50 py-3">
      <Image src={Logo} alt="TNNS Logo" width={90} />
    </div>
  );
};

export default brandedSimpleHeader;
