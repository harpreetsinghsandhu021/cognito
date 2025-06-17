import React from "react";
import SearchBar from "../components/searchBar";
import { Navbar } from "../components/navbar";
import SearchResults from "../components/searchResults";
import Footer from "../components/footer";

const page = () => {
  return (
    <>
      <Navbar />
      <div className="mt-40 max-w-5xl mx-auto">
        <SearchBar sticky />
        <SearchResults />
      </div>
      <Footer />
    </>
  );
};

export default page;
