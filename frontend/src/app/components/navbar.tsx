"use client";
import React, { useState } from "react";
import { HoveredLink, Menu } from "./ui/navbarMenu";
import { cn } from "../lib/utils";

export function Navbar({ className }: { className?: string }) {
  return (
    <div className={cn("fixed top-10 inset-x-0 w-min mx-auto z-50", className)}>
      <Menu>
        <HoveredLink href={"/"}>Home</HoveredLink>
        <HoveredLink href={"/search?query=Aritificial Intelligence"}>
          AI
        </HoveredLink>
        <HoveredLink href={"/search?query=Algorithmns"}>
          Algorithmns
        </HoveredLink>
        <HoveredLink href={"/search?query=Databases"}>Databases</HoveredLink>
      </Menu>
    </div>
  );
}
