import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react"; // Bonus: Adding a search icon
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
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
      <Input
        placeholder="Search User by Name or Profession"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="
          w-full 
          bg-transparent 
          text-gray-50 
          placeholder:text-gray-400
          
          border-gray-600
          pl-10 
          transition-colors
          focus:border-gray-400
        "
      />
    </form>
  );
}
