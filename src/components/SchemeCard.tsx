import React from 'react';
import { Star, Calendar, ExternalLink, IndianRupee } from 'lucide-react';

interface Scheme {
  id: string;
  title: string;
  description: string;
  benefit: string;
  category: string;
  ministry: string;
  complexity: number;
  deadline: string;
  tags: string[];
}

interface SchemeCardProps {
  scheme: Scheme;
}

export const SchemeCard: React.FC<SchemeCardProps> = ({ scheme }) => {
  const getCategoryColor = (category: string) => {
    const colors = {
      'EWS': 'bg-red-100 text-red-800',
      'State': 'bg-blue-100 text-blue-800',
      'Tech': 'bg-purple-100 text-purple-800',
      'Insurance': 'bg-green-100 text-green-800',
      'Credit': 'bg-yellow-100 text-yellow-800',
      'Business': 'bg-indigo-100 text-indigo-800',
      'Education': 'bg-pink-100 text-pink-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const renderComplexity = (complexity: number) => {
    return (
      <div className="flex items-center space-x-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-3 w-3 ${
              i < complexity ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
        <span className="text-xs text-gray-500 ml-1">Complexity</span>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 group">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-orange-600 transition-colors">
            {scheme.title}
          </h3>
          <p className="text-sm text-gray-600 mb-2">{scheme.description}</p>
          <div className="flex items-center space-x-2 text-xs text-gray-500">
            <span>{scheme.ministry}</span>
          </div>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(scheme.category)}`}>
          {scheme.category}
        </div>
      </div>

      {/* Benefit Amount */}
      <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-3 mb-4">
        <div className="flex items-center space-x-2">
          <IndianRupee className="h-4 w-4 text-green-600" />
          <span className="text-lg font-bold text-green-800">{scheme.benefit}</span>
        </div>
      </div>

      {/* Complexity and Deadline */}
      <div className="flex items-center justify-between mb-4">
        {renderComplexity(scheme.complexity)}
        <div className="flex items-center space-x-1 text-sm text-gray-600">
          <Calendar className="h-4 w-4" />
          <span>{scheme.deadline}</span>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1 mb-4">
        {scheme.tags.map((tag, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Apply Button */}
      <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 group">
        <span>Apply Now</span>
        <ExternalLink className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
};