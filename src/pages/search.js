import CityList from "@/components/CityList";
import { useState } from "react";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [finalSearchTerm, setFinalSearchTerm] = useState("");
  const [searchTrigger, setSearchTrigger] = useState(0);

  const handleSearch = () => {
    setFinalSearchTerm(searchTerm);
    setSearchTrigger((prev) => prev + 1);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Search the cities</h1>
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter search term..."
          className="border p-2 rounded w-full"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-8 py-2 rounded"
        >
          Search
        </button>
      </div>
      <CityList searchTerm={finalSearchTerm} searchTrigger={searchTrigger} />
    </div>
  );
}
