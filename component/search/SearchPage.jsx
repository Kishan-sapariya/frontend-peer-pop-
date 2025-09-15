import SearchPage from "@/app/search/page";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading search...</div>}>
      <SearchPage />
    </Suspense>
  );
}
