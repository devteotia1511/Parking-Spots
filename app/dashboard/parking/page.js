"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { FilterIcon, SearchIcon } from "lucide-react";
import FilterModal from "@/components/FilterModal";

export default function DashboardParkingPage() {
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
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-800">Parking Spots</h1>
          <p className="text-sm text-gray-600 mt-1">Search, filter and explore available parking</p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:flex-none md:w-80">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search parking..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-50 border-gray-200"
            />
          </div>
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
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {searchFilteredData.map((p) => (
            <div key={p.id} className="border border-gray-200 bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition">
              <div className="flex items-start justify-between">
                <h2 className="font-semibold text-gray-800">{p.name}</h2>
                <span className={`text-xs px-2 py-0.5 rounded-full ${p.type === 'Covered' ? 'bg-gray-100 text-gray-700' : 'bg-amber-100 text-amber-700'}`}>{p.type}</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">{p.location}</p>
              <div className="mt-3 flex items-center justify-between">
                <div className="text-sm">
                  <span className="text-gray-500">Price/hr</span>{" "}
                  <span className="font-medium">₹{p.pricePerHour}</span>
                </div>
                <span
                  className={`text-sm font-medium ${
                    p.availability === "Available" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {p.availability}
                </span>
              </div>
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


