"use client";

import SearchPage from "@/component/search/SearchPage";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading search...</div>}>
      <SearchPage />
    </Suspense>
  );
}
