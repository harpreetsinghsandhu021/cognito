import { cn } from "../lib/utils";
import React from "react";
import { BentoGrid, BentoGridItem } from "./ui/bentogrid";
import {
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";
import axios from "axios";
import { Paper } from "../interfaces";

export async function List() {
  const data = await axios.get(
    `http://localhost:8000/api/v1/papers/getHomeData`
  );

  const items = data.data.data.recentPapers;

  console.log(items);

  return (
    <div className="max-w-5xl mb-8 -mt-44 mx-auto">
      <h2 className="text-2xl font-semibold mb-2 ">Recent Papers</h2>
      <BentoGrid className="gap-6 md:auto-rows-[18rem]">
        {items &&
          items?.map((item: Paper & { className: string }, i: number) => (
            <BentoGridItem
              key={i}
              index={i}
              id={item._id}
              title={item.title}
              complete={false}
              authors={item.authors}
              description={item.abstract}
              className={item.className}
            />
          ))}
      </BentoGrid>
    </div>
  );
}
