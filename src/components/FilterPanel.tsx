import React from 'react';
import { X } from 'lucide-react';

interface FilterPanelProps {
  filters: {
    state: string;
    benefitType: string;
    eligibility: string;
  };
  onFilterChange: (filters: any) => void;
  options: {
    state: string[];
    benefitType: string[];
    eligibility: string[];
  };
}

export const FilterPanel: React.FC<FilterPanelProps> = ({ filters, onFilterChange, options }) => {
  const handleFilterChange = (key: string, value: string) => {
    onFilterChange({
      ...filters,
      [key]: value
    });
  };

  const clearFilters = () => {
    onFilterChange({
      state: 'All India',
      benefitType: 'All',
      eligibility: 'All'
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-gray-900">Filters</h4>
        <button
          onClick={clearFilters}
          className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900"
        >
          <X className="h-4 w-4" />
          <span>Clear All</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
          <select
            value={filters.state}
            onChange={(e) => handleFilterChange('state', e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            {options.state.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Benefit Type</label>
          <select
            value={filters.benefitType}
            onChange={(e) => handleFilterChange('benefitType', e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            {options.benefitType.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Eligibility</label>
          <select
            value={filters.eligibility}
            onChange={(e) => handleFilterChange('eligibility', e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            {options.eligibility.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Active Filters */}
      <div className="flex flex-wrap gap-2 mt-4">
        {Object.entries(filters).map(([key, value]) => 
          value !== 'All' && value !== 'All India' ? (
            <span
              key={key}
              className="inline-flex items-center px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm"
            >
              {value}
              <button
                onClick={() => handleFilterChange(key, key === 'state' ? 'All India' : 'All')}
                className="ml-2 hover:text-orange-600"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ) : null
        )}
      </div>
    </div>
  );
};