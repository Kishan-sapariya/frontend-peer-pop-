import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const GroupSearch = ({ search, setSearch }) => {
  return (
    <div className="relative max-w-xl mx-auto">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500" />
      <Input
        placeholder="Search for groups or communities..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="pl-11 py-3"
      />
    </div>
  );
};

export default GroupSearch;
