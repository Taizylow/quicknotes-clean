
import React from 'react';
import { Search, Filter } from 'lucide-react';
import { NoteColor } from '../types/note';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  colorFilter: NoteColor | 'all';
  onColorFilterChange: (color: NoteColor | 'all') => void;
  sortBy: 'date' | 'title';
  onSortChange: (sort: 'date' | 'title') => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  onSearchChange,
  colorFilter,
  onColorFilterChange,
  sortBy,
  onSortChange,
}) => {
  const colors: { value: NoteColor | 'all'; label: string; bgClass: string }[] = [
    { value: 'all', label: 'All', bgClass: 'bg-gray-100' },
    { value: 'blue', label: 'Blue', bgClass: 'bg-blue-100' },
    { value: 'green', label: 'Green', bgClass: 'bg-green-100' },
    { value: 'yellow', label: 'Yellow', bgClass: 'bg-yellow-100' },
    { value: 'pink', label: 'Pink', bgClass: 'bg-pink-100' },
    { value: 'purple', label: 'Purple', bgClass: 'bg-purple-100' },
    { value: 'gray', label: 'Gray', bgClass: 'bg-gray-200' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 items-center">
          <Filter className="text-gray-400 w-4 h-4" />
          
          {/* Color Filter */}
          <select
            value={colorFilter}
            onChange={(e) => onColorFilterChange(e.target.value as NoteColor | 'all')}
            className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          >
            {colors.map((color) => (
              <option key={color.value} value={color.value}>
                {color.label}
              </option>
            ))}
          </select>

          {/* Sort Filter */}
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as 'date' | 'title')}
            className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          >
            <option value="date">Sort by Date</option>
            <option value="title">Sort by Title</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
