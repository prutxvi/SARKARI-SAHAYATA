import React, { useState } from 'react';
import { UserSegment } from '../App';
import { SchemeCard } from './SchemeCard';
import { FilterPanel } from './FilterPanel';
import { Search, Filter, Grid, List } from 'lucide-react';

interface SchemeDiscoveryProps {
  activeSegment: UserSegment;
}

export const SchemeDiscovery: React.FC<SchemeDiscoveryProps> = ({ activeSegment }) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState({
    state: 'All India',
    benefitType: 'All',
    eligibility: 'All'
  });

  const allSchemes = [
    {
      id: '1',
      title: 'EWS Scholarship',
      description: 'Financial assistance for economically weaker sections pursuing higher education',
      benefit: '₹20,000/year',
      category: 'EWS',
      ministry: 'Ministry of Education',
      complexity: 3,
      deadline: '2024-03-15',
      tags: ['EWS', 'Annual', 'Education']
    },
    {
      id: '2',
      title: 'TS-Epass Reimbursement',
      description: 'Telangana state educational fee reimbursement for eligible students',
      benefit: '₹35,000/year',
      category: 'State',
      ministry: 'Telangana Government',
      complexity: 4,
      deadline: '2024-02-28',
      tags: ['Telangana', 'Reimbursement', 'State']
    },
    {
      id: '3',
      title: 'Skill India Internships',
      description: 'Technical skill development and paid internship programs',
      benefit: '₹8,000/month',
      category: 'Tech',
      ministry: 'Ministry of Skill Development',
      complexity: 2,
      deadline: '2024-04-10',
      tags: ['Tech', 'Internship', 'Skills']
    },
    {
      id: '4',
      title: 'PM Fasal Bima Yojana',
      description: 'Comprehensive crop insurance scheme for farmers',
      benefit: '₹2,00,000 coverage',
      category: 'Insurance',
      ministry: 'Ministry of Agriculture',
      complexity: 3,
      deadline: '2024-03-31',
      tags: ['Insurance', 'Crops', 'Agriculture']
    },
    {
      id: '5',
      title: 'Kisan Credit Card',
      description: 'Easy credit facility for farming activities and inputs',
      benefit: '₹3,00,000 limit',
      category: 'Credit',
      ministry: 'Ministry of Agriculture',
      complexity: 2,
      deadline: 'Ongoing',
      tags: ['Credit', 'Farming', 'Agriculture']
    },
    {
      id: '6',
      title: 'Mahila Udyam Nidhi',
      description: 'Women entrepreneurship development and business loan scheme',
      benefit: '₹10,00,000 loan',
      category: 'Business',
      ministry: 'Ministry of MSME',
      complexity: 4,
      deadline: '2024-05-15',
      tags: ['Business', 'Loan', 'Women']
    }
  ];

  const filterOptions = {
    state: ['All India', 'Telangana', 'Karnataka', 'Tamil Nadu', 'Maharashtra'],
    benefitType: ['All', 'Cash', 'Subsidy', 'Training', 'Loan', 'Insurance'],
    eligibility: ['All', 'EWS', 'SC/ST', 'OBC', 'General', 'Women']
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Discover Schemes</h2>
          <p className="text-gray-600">Find the best government schemes for {activeSegment}</p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600'}`}
          >
            <Grid className="h-5 w-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600'}`}
          >
            <List className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search schemes..."
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <button className="flex items-center space-x-2 px-4 py-3 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
            <Filter className="h-5 w-5" />
            <span>Advanced Filters</span>
          </button>
        </div>

        <FilterPanel
          filters={filters}
          onFilterChange={setFilters}
          options={filterOptions}
        />
      </div>

      {/* Results */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            {allSchemes.length} schemes found
          </h3>
          <select className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500">
            <option>Sort by Relevance</option>
            <option>Sort by Deadline</option>
            <option>Sort by Benefit Amount</option>
          </select>
        </div>

        <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
          {allSchemes.map((scheme) => (
            <SchemeCard key={scheme.id} scheme={scheme} />
          ))}
        </div>
      </div>
    </div>
  );
};