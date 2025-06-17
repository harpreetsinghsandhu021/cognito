import React from "react";
import { BentoGrid, BentoGridItem } from "./ui/bentogrid";
import axios from "axios";
import { Paper } from "../interfaces";

export async function List() {
  const data = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/papers/getHomeData`
  );

  const items = data.data.data.recentPapers;

  return (
    <div className="lg:max-w-5xl max-lg:max-w-4xl max-lg:px-4 lg:-mt-44 md:-mt-56 max-md:mt-30 mx-auto">
      <h2 className="text-2xl font-semibold mb-2 ">Recent Papers</h2>
      <BentoGrid className="gap-6 lg:auto-rows-[18rem]">
        {items &&
          items?.map((item: Paper & { className: string }, i: number) => (
            <BentoGridItem
              key={i}
              index={i}
              id={item._id}
              title={item.title}
              complete={false}
              category={item.primaryCategory}
              authors={item.authors}
              description={item.abstract}
              className={item.className}
            />
          ))}
      </BentoGrid>
    </div>
  );
}
