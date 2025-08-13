"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { FilterIcon, SearchIcon } from "lucide-react";
import FilterModal from "@/components/FilterModal";

export default function HomePage() {
  const [allParkingData, setAllParkingData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState(0);

  useEffect(() => {
    async function fetchParking() {
      const res = await fetch("/api/parking");
      const data = await res.json();
      setAllParkingData(data);
      setFilteredData(data);
    }
    fetchParking();
  }, []);

  const searchFilteredData = useMemo(() => {
    const q = searchTerm.toLowerCase();
    return filteredData.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.type.toLowerCase().includes(q) ||
        p.availability.toLowerCase().includes(q)
    );
  }, [filteredData, searchTerm]);

  const handleResetAll = () => {
    setSearchTerm("");
    setFilteredData(allParkingData);
    setActiveFilters(0);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-bold font-mono text-3xl text-gray-600">Parking Spots</h1>
        </div>
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search parking..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-80 bg-gray-50 border-gray-200"
          />
        </div>

        <div className="flex items-center gap-3">
          {searchTerm || activeFilters > 0 ? (
            <Button
              variant="outline"
              onClick={handleResetAll}
              className="border-gray-300"
            >
              Reset
            </Button>
          ) : null}
          <Button
            variant="outline"
            onClick={() => setShowFilters(true)}
            className="flex items-center space-x-2 border-gray-300"
          >
            <FilterIcon className="h-4 w-4" />
            <span>Filter</span>
            {activeFilters > 0 && (
              <Badge className="bg-green-500 hover:bg-green-600 text-white rounded-full h-5 w-5 p-0 flex items-center justify-center text-xs">
                {activeFilters}
              </Badge>
            )}
          </Button>
        </div>
      </div>

      {searchFilteredData.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {searchFilteredData.map((p) => (
            <div key={p.id} className="border rounded p-4 shadow hover:shadow-lg">
              <h2 className="font-semibold">{p.name}</h2>
              <p className="text-sm text-gray-600">Location: {p.location}</p>
              <p className="text-sm">Type: {p.type}</p>
              <p className="text-sm">Price/hr: ₹{p.pricePerHour}</p>
              <p
                className={`text-sm font-medium ${
                  p.availability === "Available" ? "text-green-600" : "text-red-600"
                }`}
              >
                {p.availability}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No parking spots found</p>
      )}

      <FilterModal
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        activeFilters={activeFilters}
        setActiveFilters={setActiveFilters}
        parkingData={allParkingData}
        setFilteredData={setFilteredData}
        onResetAll={handleResetAll}
        searchTerm={searchTerm}
        onChangeSearchTerm={setSearchTerm}
      />
    </div>
  );
}