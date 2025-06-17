import { Space_Mono } from "next/font/google";
import React from "react";
import { cn } from "../lib/utils";

const space_mono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin", "vietnamese"],
});

const Footer = () => {
  return (
    <div className="max-w-5xl mx-auto relative my-10">
      <h2
        className={cn(
          "text-[14rem] font-bold text-center leading-44",
          space_mono.className
        )}
      >
        Cognito
      </h2>
      <p className="text-sm text-left absolute top-45 left-[45%] font-normal">
        What research insights are you looking for?
      </p>
    </div>
  );
};

export default Footer;
