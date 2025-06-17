import React from "react";
import SearchBar from "../components/searchBar";
import { Navbar } from "../components/navbar";
import SearchResults from "../components/searchResults";
import Footer from "../components/footer";
import axios from "axios";

export const metadata = {
  title: "Cognito - Search Results",
};

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
      <div className="mt-40 max-w-5xl max-lg:max-w-3xl max-lg:px-4 max-md:w-[85%] mx-auto">
        <div className="lg:w-4xl max-lg:w-2xl max-sm:w-[85%] mx-auto">
          <SearchBar sticky />
        </div>
        {searchResults && <SearchResults items={searchResults} />}
      </div>
      <Footer />
    </>
  );
};

export default page;
