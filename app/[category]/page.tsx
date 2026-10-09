"use client";

import { use, useState } from "react";
import Navbar from "../../components/Navbar";
import News from "../../components/News";
import LoadingBar from "react-top-loading-bar";

export default function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = use(params);

  const [progress, setProgress] = useState(0);
  

  return (
    <>
      <Navbar />

      <LoadingBar
        height={3}
        color="#000000"
        progress={progress}
      />

      <News
        pageSize={9}
        country="us"
        category={category}
        setProgress={setProgress}
      />
    </>
  );
}