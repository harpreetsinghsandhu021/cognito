import { List } from "./components/list";
import { BackgroundLines } from "./components/hero";
import { motion } from "motion/react";

import { Space_Grotesk, Space_Mono } from "next/font/google";
import { Navbar } from "./components/navbar";
import { IconSearch } from "@tabler/icons-react";
import SearchBar from "./components/searchBar";

const space_gr = Space_Grotesk({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin", "vietnamese"],
});

const space_mono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin", "vietnamese"],
});

export default function Home() {
  return (
    <>
      <Navbar />
      <BackgroundLines>
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[65%] ${space_gr.className}`}
        >
          <h1 className="relative z-10 mx-auto max-w-4xl text-center font-bold text-slate-700 text-8xl max-2xl:text-7xl ">
            The Engaging Way to Explore Groundbreaking Studies.
          </h1>
          <p className="relative z-10 mx-auto mb-4 max-w-xl py-4 text-center text-xl max-2xl:text-lg font-normal text-neutral-600 dark:text-neutral-400">
            Tired of sifting through dense, jargon-filled research papers that
            make your eyes glaze over? Imagine instantly grasping complex
            concepts, discovering hidden connections, and sharing insights that
            truly resonate.
          </p>
          <div className="w-4xl">
            <SearchBar />
          </div>
        </div>
      </BackgroundLines>
      <List />
    </>
  );
}
