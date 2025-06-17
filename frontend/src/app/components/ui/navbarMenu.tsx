"use client";
import React, { ReactNode } from "react";

export const Menu = ({ children }: { children: React.ReactNode }) => {
  return (
    <nav className="relative rounded-full border-2 bg-white shadow-input flex justify-center space-x-4 px-8 py-2">
      {children}
    </nav>
  );
};

interface HoveredLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
}
export const HoveredLink = ({ children, ...rest }: HoveredLinkProps) => {
  return (
    <a {...rest} className="text-gray-500 hover:text-black ">
      {children}
    </a>
  );
};
