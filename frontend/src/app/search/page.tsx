import React, { Suspense } from "react";
import SearchBar from "../components/searchBar";
import { Navbar } from "../components/navbar";
import SearchResults from "../components/searchResults";
import Footer from "../components/footer";

export const metadata = {
  title: "Cognito - Search Results",
};

const page = async () => {
  return (
    <Suspense fallback={<></>}>
      <Navbar />
      <div className="mt-40 max-w-5xl max-lg:max-w-3xl max-lg:px-4 max-md:w-[85%] mx-auto">
        <div className="lg:w-4xl max-lg:w-2xl max-sm:w-[85%] mx-auto">
          <SearchBar sticky />
        </div>
        <SearchResults />
      </div>
      <Footer />
    </Suspense>
  );
};

export default page;
