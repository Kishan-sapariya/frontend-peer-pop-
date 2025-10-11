import { useState } from "react";
import { useRouter } from "next/navigation"; 
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
    <form onSubmit={handleSearch} className="flex gap-2">
      <Input
        placeholder="Search User by Name or Profession"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-50 sm:w-65 bg-accent text-gray-800"
      />
    </form>
  );
}
