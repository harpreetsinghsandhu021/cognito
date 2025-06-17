import Footer from "@/app/components/footer";
import { Navbar } from "@/app/components/navbar";
import PaperBlog from "@/app/components/paperBlog";
import { Paper } from "@/app/interfaces";
import axios from "axios";
import React from "react";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  let paper: null | Paper = null;

  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/papers/${id}`
    );
    if (res.status == 200) {
      paper = res.data.data;
    }
  } catch (err) {
    console.log(err);
  }

  return (
    <main>
      <Navbar />
      {paper && <PaperBlog id={id} paper={paper} />}
      <Footer />
    </main>
  );
};

export default page;
