import React from "react";
import SearchBar from "../components/searchBar";
import { Navbar } from "../components/navbar";
import SearchResults from "../components/searchResults";

const page = () => {
  return (
    <>
      <Navbar />
      <div className="mt-40 max-w-5xl mx-auto">
        <SearchBar sticky />
        <SearchResults />
      </div>
    </>
  );
};

export default page;
