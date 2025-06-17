"use client";

import { IconArrowRight } from "@tabler/icons-react";
import { categories, cn, pastels } from "../../lib/utils";
import { Space_Grotesk } from "next/font/google";
import { Author, Id, PublishedDate } from "@/app/interfaces";
import { useRouter } from "next/navigation";

const space_gr = Space_Grotesk({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin", "vietnamese"],
});

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-7xl grid-cols-1 gap-4 md:auto-rows-[18rem] md:grid-cols-3",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  index,
  className,
  id,
  title,
  description,
  category,
  authors,
  header,
}: {
  index: number;
  className?: string;
  id: string | Id;
  title?: string | React.ReactNode;
  complete?: boolean;
  description?: string | React.ReactNode;
  category?: string;
  publishedDate?: PublishedDate;
  authors?: Author[];
  header?: React.ReactNode;
}) => {
  const router = useRouter();
  return (
    <div
      className={cn(
        "group/bento transition duration-200 cursor-pointer rounded-xl row-span-1",
        `${className} ${space_gr.className}`
      )}
      onClick={() => router.push(`/papers/${(id as Id).$oid}`)}
    >
      <div
        style={{
          background: pastels[index % pastels.length],
        }}
        className="group-hover/bento:-translate-x-2.5 group-hover/bento:-translate-y-2.5 border-2  p-4 w-full h-full  rounded-xl  shadow-[8px_8px_0px_0px_#33322E] hover:shadow-[12px_12px_0px_0px_#33322E] hover:rounded-2xl"
      >
        {header}
        <div className="h-full transition duration-200 flex flex-col items-start space-y-4">
          <h6 className="text-xs tracking-widest uppercase">
            {category && categories[category as keyof typeof categories]}
          </h6>
          <div
            className={`mb-2 text-2xl font-bold text-[#16092F]  ${
              className === "md:col-span-3" ? "line-clamp-1" : "line-clamp-3"
            }`}
          >
            {title}
          </div>
          <div
            className={`text-md pr-2 text-[#16092F] ${
              className === "md:col-span-2" ? "line-clamp-4" : "line-clamp-3"
            }`}
          >
            {description}
          </div>
          <div className="flex justify-between w-full">
            <button className="font-bold">
              <span> Read More </span>
              <IconArrowRight className="ml-0.5 inline-block scale-x-125 font-bold group-hover/bento:-rotate-12" />
            </button>
            <div>
              {className === "md:col-span-2" ? (
                <span> {authors && authors[0]?.name},</span>
              ) : (
                <span> {authors && authors[0]?.name.slice(0, 14)}...</span>
              )}

              {className === "md:col-span-2" && (
                <span> {authors && authors[1] && authors[1]?.name}</span>
              )}
              {className === "md:col-span-2" && (
                <span> {authors && authors[2] && authors[2]?.name}...</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
