import React from "react";
import SearchBar from "../components/searchBar";
import { Navbar } from "../components/navbar";
import SearchResults from "../components/searchResults";
import Footer from "../components/footer";
import axios from "axios";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ query: string }>;
}) => {
  const searchParam = await searchParams;
  let searchResults = null;

  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/papers/search/semantic?limit=10&size=20&query=${searchParam.query}`
    );

    if (res.status == 200) {
      searchResults = res.data.data;
    }
  } catch (err) {
    console.log(err);
  }

  return (
    <>
      <Navbar />
      <div className="mt-40 max-w-5xl mx-auto">
        <SearchBar sticky />
        {searchResults && <SearchResults items={searchResults} />}
      </div>
      <Footer />
    </>
  );
};

export default page;
