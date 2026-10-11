"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import News from "../components/News";
import LoadingBar from "react-top-loading-bar";

const pageSize = 8;

export default function Page() {
  const [progress, setProgress] = useState(0);

  return (
    <div>
      <Navbar />

      <LoadingBar
        height={3}
        color="#000000"
        progress={progress}
      />

      <News
        pageSize={pageSize}
        country="us"
        category="general"
        setProgress={setProgress}
      />
    </div>
  );
}