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
    <form onSubmit={handleSearch} className="relative w-50 sm:w-70">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-black" />
      <Input
        placeholder="Search User by Name or Profession"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="
          w-full 
          bg-transparent 
          text-neutral-800 
          placeholder:text-neutral-700
          border-neutral-800
          pl-10 
          transition-colors
          focus:border-neutral-900
        "
      />
    </form>
  );
}
