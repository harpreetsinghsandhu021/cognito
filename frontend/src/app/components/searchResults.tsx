"use client";

import React from "react";
import { BentoGrid, BentoGridItem } from "./ui/bentogrid";
import { Paper, PublishedDate } from "../interfaces";

const SearchResults = ({ items }: { items: Paper[] }) => {
  return (
    <>
      <BentoGrid className="max-w-5xl max-lg:max-w-3xl mt-20 mx-auto gap-6 md:auto-rows-[15rem]">
        {items &&
          items.length !== 0 &&
          items.map((item: Paper, i) => (
            <BentoGridItem
              key={i}
              complete={true}
              index={i}
              id={item._id}
              title={item.title}
              description={item.abstract}
              category={item.primaryCategory}
              publishedDate={item.publishedDate as PublishedDate}
              authors={item.authors}
              className={"md:col-span-3"}
            />
          ))}
      </BentoGrid>
    </>
  );
};

export default SearchResults;
