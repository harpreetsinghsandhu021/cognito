import { List } from "./components/list";
import { BackgroundLines } from "./components/hero";

import { Space_Grotesk } from "next/font/google";
import { Navbar } from "./components/navbar";
import SearchBar from "./components/searchBar";
import Footer from "./components/footer";
import { Suspense } from "react";

const space_gr = Space_Grotesk({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin", "vietnamese"],
});

export const metadata = {
  title: "Cognito - Home",
};

export default function Home() {
  return (
    <>
      <Navbar />
      <BackgroundLines>
        <div
          className={`md:absolute  md:top-1/2 md:left-1/2 md:-translate-x-[50%] md:-translate-y-[65%] max-md:block max-md:pt-30 ${space_gr.className}`}
        >
          <h1 className="relative z-10 mx-auto max-w-4xl text-center font-bold text-slate-700 text-8xl max-2xl:text-7xl max-md:text-4xl">
            The Engaging Way to Explore Groundbreaking Studies.
          </h1>
          <p className="relative z-10 mx-auto mb-4 max-w-xl py-4 text-center text-xl max-2xl:text-lg max-md:text-sm max-sm:text-xs max-sm:px-2 font-normal text-neutral-600 dark:text-neutral-400">
            Tired of sifting through dense, jargon-filled research papers that
            make your eyes glaze over? Imagine instantly grasping complex
            concepts, discovering hidden connections, and sharing insights that
            truly resonate.
          </p>
          <div className="lg:w-4xl max-lg:w-2xl max-sm:w-[85%] mx-auto">
            <Suspense fallback={<div></div>}>
              <SearchBar />
            </Suspense>
          </div>
        </div>
      </BackgroundLines>
      <List />
      <Footer />
    </>
  );
}
