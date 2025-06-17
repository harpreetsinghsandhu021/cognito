"use client";

import React, { useEffect, useState } from "react";
import { BentoGrid, BentoGridItem } from "./ui/bentogrid";
import { Paper, PublishedDate } from "../interfaces";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import Loader from "./ui/loader";

const SearchResults = () => {
  const searchParams = useSearchParams();
  const [items, setItems] = useState<Paper[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const query = searchParams.get("query");

  async function fetchResults(query: string) {
    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/papers/search/semantic?limit=10&size=20&query=${query}`
      );

      if (res.status == 200) {
        setItems(res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  }
  useEffect(() => {
    if (query) {
      fetchResults(query);
    }
  }, [query]);

  return (
    <>
      {loading && <Loader className="my-20" />}

      <BentoGrid className="max-w-5xl max-lg:max-w-3xl mt-20 mx-auto gap-6 md:auto-rows-[15rem]">
        {items &&
          items.length !== 0 &&
          !loading &&
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
