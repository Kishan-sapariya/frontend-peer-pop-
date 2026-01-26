import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function NavbarSearch() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    router.push(`/search?q=${encodeURIComponent(search)}`);
  };

  return (
    <form onSubmit={handleSearch} className="relative flex-1 max-w-[180px] sm:max-w-[240px] md:max-w-[280px] lg:max-w-[320px]">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-black/60 transition-colors group-focus-within:text-black" />
      <Input
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full h-10 text-sm bg-black/10 text-black placeholder:text-black/50 !border-none pl-10 pr-3 rounded-xl transition-all duration-200 !shadow-none focus:bg-black/15 focus:!ring-0 focus-visible:!ring-0 focus-visible:!border-transparent hover:bg-black/15"
      />
    </form>
  );
}
