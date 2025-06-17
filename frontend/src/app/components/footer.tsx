import { Space_Mono } from "next/font/google";
import React from "react";
import { cn } from "../lib/utils";

const space_mono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin", "vietnamese"],
});

const Footer = () => {
  return (
    <div className="lg:max-w-5xl max-lg:max-w-2xl mx-auto relative my-10">
      <h2
        className={cn(
          "lg:text-[14rem] max-lg:text-[10rem] max-md:text-[8rem] max-sm:text-7xl max-sm:text-left max-sm:px-4 font-bold text-center leading-44",
          space_mono.className
        )}
      >
        Cognito
      </h2>
      <p className="text-sm text-left absolute top-45 left-[45%] max-sm:top-36 max-sm:left-20 font-normal">
        What research insights are you looking for?
      </p>
    </div>
  );
};

export default Footer;
