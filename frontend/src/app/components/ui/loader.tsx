import { cn } from "@/app/lib/utils";
import React from "react";

const Loader = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex justify-center items-center", className)}>
      <div className="tetrominos">
        <div className="tetromino box1"></div>
        <div className="tetromino box2"></div>
        <div className="tetromino box3"></div>
        <div className="tetromino box4"></div>
      </div>
    </div>
  );
};

export default Loader;
