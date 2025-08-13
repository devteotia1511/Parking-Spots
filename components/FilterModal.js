'use client';

import { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { XIcon, SearchIcon } from 'lucide-react';
import { FilterIcon } from 'lucide-react';

export default function FilterModal({ isOpen, onClose, activeFilters, setActiveFilters, parkingData = [], setFilteredData, onResetAll, searchTerm, onChangeSearchTerm }) {
  const [selectedTypes, setSelectedTypes] = useState([]); // 'Open' | 'Covered'
  const [selectedAvailability, setSelectedAvailability] = useState([]); // 'Available' | 'Full'
  const [priceRange, setPriceRange] = useState([0, 0]);

  const minPrice = useMemo(() => (Array.isArray(parkingData) && parkingData.length > 0 ? Math.min(...parkingData.map(p => p.pricePerHour)) : 0), [parkingData]);
  const maxPrice = useMemo(() => (Array.isArray(parkingData) && parkingData.length > 0 ? Math.max(...parkingData.map(p => p.pricePerHour)) : 0), [parkingData]);

  useEffect(() => {
    if (isOpen) {
      setPriceRange([minPrice, maxPrice]);
    }
  }, [isOpen, minPrice, maxPrice]);

  if (!isOpen) return null;

  const applyFiltersToData = () => {
    let filtered = Array.isArray(parkingData) ? [...parkingData] : [];

    if (selectedTypes.length === 1) {
      filtered = filtered.filter((item) => selectedTypes.includes(item.type));
    } else if (selectedTypes.length > 1) {
      // if both selected, it's effectively no filter; do nothing
    }

    if (selectedAvailability.length === 1) {
      filtered = filtered.filter((item) => selectedAvailability.includes(item.availability));
    } else if (selectedAvailability.length > 1) {
      // both selected -> no filter
    }

    if (priceRange[0] !== minPrice || priceRange[1] !== maxPrice) {
      filtered = filtered.filter((item) => item.pricePerHour >= priceRange[0] && item.pricePerHour <= priceRange[1]);
    }

    setFilteredData(filtered);
  };

  const computeActiveFilters = () => {
    let count = 0;
    if (selectedTypes.length === 1) count += 1;
    if (selectedAvailability.length === 1) count += 1;
    if (priceRange[0] !== minPrice || priceRange[1] !== maxPrice) count += 1;
    return count;
  };

  const toggleSelection = (list, value) => {
    const exists = list.includes(value);
    if (exists) {
      return list.filter((v) => v !== value);
    }
    return [...list, value];
  };

  const handleReset = () => {
    setSelectedTypes([]);
    setSelectedAvailability([]);
    setPriceRange([minPrice, maxPrice]);
    setActiveFilters(0);
    setFilteredData(Array.isArray(parkingData) ? parkingData : []);
    if (typeof onResetAll === 'function') {
      onResetAll(); // also reset search in parent
    }
  };

  const handleConfirm = () => {
    const count = computeActiveFilters();
    setActiveFilters(count);
    applyFiltersToData();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />

      <Card className="relative w-full max-w-2xl h-[60vh] mx-4 bg-white shadow-xl flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 gap-4">
          <div className="flex items-center space-x-3">
            <FilterIcon className="h-4 w-4" />
            <span>Filter By</span>
            {activeFilters > 0 && (
              <Badge className="bg-green-500 hover:bg-green-600 text-white rounded-full h-5 w-5 p-0 flex items-center justify-center text-xs">
                {activeFilters}
              </Badge>
            )}
          </div>
          <div className="relative flex-1 max-w-sm">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search parking..."
              value={searchTerm ?? ''}
              onChange={(e) => onChangeSearchTerm && onChangeSearchTerm(e.target.value)}
              className="pl-10 bg-gray-50 border-gray-200"
            />
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <XIcon className="h-4 w-4" />
          </Button>
        </div>

        <CardContent className="flex-1 overflow-y-auto p-4 space-y-6">
          <section>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Type</h3>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedTypes.includes('Open')}
                  onChange={() => setSelectedTypes((prev) => toggleSelection(prev, 'Open'))}
                  className="w-4 h-4 text-green-500 border-gray-300 focus:ring-green-500"
                />
                Open
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedTypes.includes('Covered')}
                  onChange={() => setSelectedTypes((prev) => toggleSelection(prev, 'Covered'))}
                  className="w-4 h-4 text-green-500 border-gray-300 focus:ring-green-500"
                />
                Covered
              </label>
            </div>
          </section>

          <section>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Availability</h3>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedAvailability.includes('Available')}
                  onChange={() => setSelectedAvailability((prev) => toggleSelection(prev, 'Available'))}
                  className="w-4 h-4 text-green-500 border-gray-300 focus:ring-green-500"
                />
                Available
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedAvailability.includes('Full')}
                  onChange={() => setSelectedAvailability((prev) => toggleSelection(prev, 'Full'))}
                  className="w-4 h-4 text-green-500 border-gray-300 focus:ring-green-500"
                />
                Full
              </label>
            </div>
          </section>

          <section>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Price Range (₹/hr)</h3>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min={minPrice}
                max={maxPrice}
                value={priceRange[0]}
                onChange={(e) => setPriceRange((prev) => [Number(e.target.value), prev[1]])}
                className="w-full"
              />
              <input
                type="range"
                min={minPrice}
                max={maxPrice}
                value={priceRange[1]}
                onChange={(e) => setPriceRange((prev) => [prev[0], Number(e.target.value)])}
                className="w-full"
              />
            </div>
            <div className="text-xs text-gray-600 mt-2">₹{priceRange[0]} - ₹{priceRange[1]}</div>
          </section>
        </CardContent>

        <div className="flex items-center justify-between p-4 border-t border-gray-200 bg-gray-50">
          <Button
            variant="outline"
            onClick={handleReset}
            className="border-gray-300"
          >
            Reset search & filters
          </Button>
          <div className="flex items-center space-x-3">
            <Button
              onClick={handleConfirm}
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              Apply
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}