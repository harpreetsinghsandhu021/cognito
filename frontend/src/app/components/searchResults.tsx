"use client";
import React, { useEffect, useState } from "react";
import { BentoGrid, BentoGridItem } from "./ui/bentogrid";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import Loader from "./ui/loader";
import { Paper } from "../interfaces";

const SearchResults = () => {
  const searchParams = useSearchParams();
  const [items, setItems] = useState<Paper[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const query = searchParams.get("query");

  async function fetchResults(query: string) {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:8000/api/v1/papers/search/semantic?limit=10&size=20&query=${query}`
      );

      console.log(res);

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
      <BentoGrid className="max-w-5xl my-20 mx-auto gap-6 md:auto-rows-[15rem]">
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
              publishedDate={item.publishedDate}
              authors={item.authors}
              className={"md:col-span-3"}
            />
          ))}
      </BentoGrid>
    </>
  );
};

export default SearchResults;
