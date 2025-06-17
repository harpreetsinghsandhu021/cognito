"use client";
import React, { useEffect, useRef, useState } from "react";
import { Space_Grotesk, Space_Mono } from "next/font/google";
import { categories, cn } from "../lib/utils";
import { Paper } from "../interfaces";
import { BentoGridItem } from "./ui/bentogrid";
import { IconArrowRight } from "@tabler/icons-react";
import dayjs from "dayjs";
import axios from "axios";

const space_gr = Space_Grotesk({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin", "vietnamese"],
});

const space_mono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin", "vietnamese"],
});

const PaperBlog = ({ id, paper }: { id: string; paper: Paper }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  // const [paperContent, setPaperContent] = useState<string>("");
  const [relatedPapers, setRelatedPapers] = useState<Paper[] | null>(null);
  const readerRef = useRef<ReadableStreamDefaultReader<Uint8Array> | undefined>(
    undefined
  );

  useEffect(() => {
    async function fetchRelatedPapers() {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/papers/getRelatedPapers/${id}`
      );

      if (res.status === 200) {
        const data = res.data;

        setRelatedPapers(data.data);
      }
    }
    fetchRelatedPapers();
  }, [id]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (readerRef.current) {
        readerRef.current.cancel();
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <div
      className={cn(
        "lg:max-w-6xl max-lg:max-w-4xl max-sm:max-w-[95%] border-r-2 border-l-2 mx-auto pt-40",
        space_gr.className
      )}
    >
      <div className="border-t-2 border-b-2 pb-8">
        <div className="flex items-end sm:px-4 max-sm:px-1 pb-4">
          <h1
            className={cn(
              "md:text-8xl max-md:text-7xl max-sm:text-6xl font-extrabold capitalize md:max-w-[60%] max-md:max-w-[80%] break-words md:leading-[6.3rem] max-md:leading-[5rem] max-sm:leading-[4rem]",
              space_mono.className
            )}
          >
            {paper?.title}
          </h1>

          <div className="flex flex-1 gap-2 justify-end ">
            <p className="text-xl max-md:text-base max-md:text-right font-bold max-sm:hidden">
              {categories[paper.primaryCategory as keyof typeof categories]}
            </p>
            <p className="text-xl max-md:text-base max-md:text-right font-bold sm:hidden">
              AI
            </p>
          </div>
        </div>
        <div className="sm:mx-4 max-sm:mx-1 flex">
          <div>
            {paper?.authors.map((a, i) => (
              <span key={i} className="md:text-lg max-md:text-md font-bold">
                {a.name} {i === paper.authors.length - 1 ? "" : " | "}
              </span>
            ))}
          </div>
        </div>
        <div className="mx-4 max-sm:mx-1 group flex max-sm:flex-wrap ">
          <a
            href={paper.pdfUrl}
            target="_blank"
            className="underline font-bold md:text-lg max-md:text-md"
          >
            Original Pdf
            <IconArrowRight className="ml-0.5 inline-block scale-x-125 font-bold group-hover:-rotate-12" />
          </a>
          <p className="font-bold sm:ml-auto md:text-lg  max-md:text-md">
            Published:{" "}
            {dayjs(paper.publishedDate as string).format(
              "MMMM D, YYYY [at] h:mm A"
            )}
          </p>
        </div>

        <p className="sm:mx-4 max-sm:mx-1 md:text-lg mb-2 mt-4 max-md:text-md">
          {paper.abstract}
        </p>

        <div className="marquee bg-yellow-50 z-50 border-t-2 border-b-2 py-2">
          <p className="text-xl">
            <strong className="font-semibold">
              {" "}
              &nbsp; AI-Generated Content:
            </strong>{" "}
            This content was generated and refined by Gemini Flash AI. While
            we&apos;ve aimed for high fidelity, please note that AI-generated
            content can sometimes contain inaccuracies or formatting
            discrepancies. We recommend reviewing the output.
          </p>
          <p className="text-xl">
            <strong className="font-semibold">
              {" "}
              &nbsp; AI-Generated Content:
            </strong>{" "}
            This content was generated and refined by Gemini Flash AI. While
            we&apos;ve aimed for high fidelity, please note that AI-generated
            content can sometimes contain inaccuracies or formatting
            discrepancies. We recommend reviewing the output.
          </p>
        </div>

        <div ref={containerRef} className="sm:px-4 max-sm:px-1">
          <div
            className="paper-content md:text-xl max-md:text-md "
            dangerouslySetInnerHTML={{ __html: paper.html }}
          ></div>
        </div>
        <div className="mt-4 sm:px-4 max-sm:px-1">
          <h2 className="text-2xl font-semibold mb-2 "> Related Articles</h2>
          <div className="flex gap-4 flex-wrap max-sm:flex-col">
            {relatedPapers &&
              relatedPapers?.map((item: Paper, i) => (
                <BentoGridItem
                  index={i}
                  key={i}
                  id={item._id}
                  className="md:col-span-4 flex-1"
                  category={item.primaryCategory}
                  title={item.title}
                  description={item.abstract}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaperBlog;
