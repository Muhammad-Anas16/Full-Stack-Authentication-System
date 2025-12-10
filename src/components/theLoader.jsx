import React from "react";
import { Spinner } from "./ui/spinner";

const TheLoader = () => {
  return (
    <div className="w-full h-[100vh] flex items-center justify-center bg-[#0d0d0d] overflow-hidden text-white">
      <Spinner className={"mx-auto"} />
    </div>
  );
};

export default TheLoader;
