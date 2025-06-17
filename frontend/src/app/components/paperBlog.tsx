"use client";
import React, { useEffect, useRef, useState } from "react";
import { Space_Grotesk, Space_Mono } from "next/font/google";
import { categories, cn } from "../lib/utils";
import { Id, Paper } from "../interfaces";
import { BentoGridItem } from "./ui/bentogrid";
import { title } from "process";
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
  async function fetchRelatedPapers() {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/papers/getRelatedPapers/${id}`
    );

    if (res.status === 200) {
      const data = res.data;

      setRelatedPapers(data.data);
    }
  }

  useEffect(() => {
    fetchRelatedPapers();
  }, []);

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
        "max-w-6xl border-r-2 border-l-2  mx-auto pt-40",
        space_gr.className
      )}
    >
      <div className="border-t-2 border-b-2 pb-8">
        <div className="flex items-end px-4 pb-4">
          <h1
            className={cn(
              "text-8xl font-extrabold capitalize max-w-[60%] break-words leading-[6.3rem] ",
              space_mono.className
            )}
          >
            {paper?.title}
          </h1>

          <div className="flex flex-1 gap-2 justify-end ">
            <p className="text-xl font-bold">
              {categories[paper.primaryCategory as keyof typeof categories]}
            </p>
          </div>
        </div>
        <div className="mx-4 flex">
          <div>
            {paper?.authors.map((a, i) => (
              <span key={i} className="text-lg font-bold">
                {a.name} {i === paper.authors.length - 1 ? "" : " | "}
              </span>
            ))}
          </div>
        </div>
        <div className="mx-4 group flex">
          <a
            href={paper.pdfUrl}
            target="_blank"
            className="underline font-bold text-lg"
          >
            Original Pdf
            <IconArrowRight className="ml-0.5 inline-block scale-x-125 font-bold group-hover:-rotate-12" />
          </a>
          <p className="font-bold ml-auto text-lg">
            Published:{" "}
            {dayjs(paper.publishedDate as string).format(
              "MMMM D, YYYY [at] h:mm A"
            )}
          </p>
        </div>

        <p className="mx-4 text-lg mb-2 mt-4">{paper.abstract}</p>

        <div className="marquee bg-yellow-50 z-50 border-t-2 border-b-2 py-2">
          <p className="text-xl">
            <strong className="font-semibold">
              {" "}
              &nbsp; AI-Generated Content:
            </strong>{" "}
            This content was generated and refined by Gemini Flash AI. While
            we've aimed for high fidelity, please note that AI-generated content
            can sometimes contain inaccuracies or formatting discrepancies. We
            recommend reviewing the output.
          </p>
          <p className="text-xl">
            <strong className="font-semibold">
              {" "}
              &nbsp; AI-Generated Content:
            </strong>{" "}
            This content was generated and refined by Gemini Flash AI. While
            we've aimed for high fidelity, please note that AI-generated content
            can sometimes contain inaccuracies or formatting discrepancies. We
            recommend reviewing the output.
          </p>
        </div>

        <div ref={containerRef} className="px-4">
          <div
            className="paper-content text-xl"
            dangerouslySetInnerHTML={{ __html: paper.html }}
          ></div>
        </div>
        <div className="mt-4 px-4">
          <h2 className="text-2xl font-semibold mb-2 "> Related Articles</h2>
          <div className="flex gap-4">
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
      {/* {!paper && <Skeleton title={paper.title} />} */}
    </div>
  );
};

function Skeleton() {
  return (
    <div className="mt-4 px-4">
      <h1
        className={cn(
          "text-8xl font-extrabold text-gray-200 animate-pulse break-words capitalize max-w-[40%] leading-[6.3rem] ",
          space_mono.className
        )}
      >
        {/* {title} */}
      </h1>
      <div role="status" className="space-y-2.5 mt-8 animate-pulse max-w-4xl">
        {[...Array(10).keys()].map((el) => {
          return (
            <div className="flex flex-col gap-3" key={el}>
              <div className="flex gap-4 items-center w-full">
                <div className="h-2.5 bg-gray-200 rounded-full  w-32"></div>
                <div className="h-2.5 ms-2 bg-gray-300 rounded-full  w-24"></div>
                <div className="h-2.5 ms-2 bg-gray-300 rounded-full  w-full"></div>
              </div>
              <div className="flex items-center w-full max-w-[480px]">
                <div className="h-2.5 bg-gray-200 rounded-full  w-full"></div>
                <div className="h-2.5 ms-2 bg-gray-300 rounded-full  w-full"></div>
                <div className="h-2.5 ms-2 bg-gray-300 rounded-full  w-24"></div>
              </div>

              <div role="status" className="animate-pulse">
                <div className="h-2.5 bg-gray-200 rounded-full w-48 mb-4"></div>
                <div className="h-2 bg-gray-200 rounded-full w-full mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full w-1/2 mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full w-3/4 mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full w-full mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full w-80 "></div>
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          );
        })}

        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}

export default PaperBlog;
