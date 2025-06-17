"use client";
import { IconSearch } from "@tabler/icons-react";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import { cn } from "../lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

const SearchBar = ({ sticky }: { sticky?: boolean }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("query");

  const [scrollHeight, setScrollHeight] = useState<number>(0);

  async function handleSearch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (inputRef.current) {
      const query = inputRef.current.value;
      router.push(`/search?query=${query}`);
    }
  }

  useEffect(() => {
    window.onscroll = () => {
      setScrollHeight(window.scrollY);
    };
  }, []);

  return (
    <form
      className={cn(
        "relative w-full transition delay-150",
        `${sticky && "sticky top-32 z-50"} ${
          scrollHeight > 200 && "scale-x-95"
        }`
      )}
      onSubmit={handleSearch}
    >
      <input
        name="search_bar"
        ref={inputRef}
        placeholder={"What research insights are you looking for?"}
        defaultValue={query ? query : ""}
        className={cn(
          "w-full bg-white shadow-2xl font-bold focus:outline-none border-2 rounded-3xl py-4 px-2  md:text-xl max-md:text-sm max-sm:py-2"
        )}
      />
      <button type="submit" className="absolute top-5 right-5">
        <IconSearch className="scale-125 text-slate-700 max-sm:scale-0" />
      </button>
    </form>
  );
};

export default SearchBar;
